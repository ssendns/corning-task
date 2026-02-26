import { useEffect, useMemo, useState } from 'react'
import AddRowModal from './components/AddRowModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import Header from './components/Header'
import Table from './components/Table'
import { tableColumns, type ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import useFilteredSortedRows from './hooks/useFilteredSortedRows'
import usePersistentMultiSelect from './hooks/usePersistentMultiSelect'
import type { SortConfig } from './types/props'
import type { Row } from './types/row'

const initialRows = mockData as Row[]
const TABLE_ROWS_STORAGE_KEY = 'table-rows'
const ACTIVE_ROWS_STORAGE_KEY = 'active-row-ids'
const ACTIVE_COLUMNS_STORAGE_KEY = 'active-column-keys'
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))
const validRowIds = new Set<string>(initialRows.map((row) => row.id))
const validTypes = new Set(['bubble', 'crack', 'scratch'])

const isRow = (value: unknown): value is Row => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.parent_id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.radius === 'number' &&
    typeof candidate.type === 'string' &&
    validTypes.has(candidate.type)
  )
}

const getInitialRows = () => {
  if (typeof window === 'undefined') return initialRows

  const savedRows = localStorage.getItem(TABLE_ROWS_STORAGE_KEY)
  if (!savedRows) return initialRows

  try {
    const parsed = JSON.parse(savedRows)
    if (!Array.isArray(parsed)) return initialRows

    const validRows = parsed.filter(isRow)
    return validRows.length > 0 || parsed.length === 0 ? validRows : initialRows
  } catch {
    return initialRows
  }
}

const generateUniqueRowId = (existingRows: Row[]) => {
  const existingIds = new Set(existingRows.map((row) => row.id))

  while (true) {
    const candidate =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `row-${Date.now()}-${Math.random().toString(16).slice(2)}`

    if (!existingIds.has(candidate)) return candidate
  }
}

function App() {
  const [rows, setRows] = useState<Row[]>(getInitialRows)
  const [pastRows, setPastRows] = useState<Row[][]>([])
  const [futureRows, setFutureRows] = useState<Row[][]>([])
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { selected: selectedColumns, toggleSelected: toggleColumn } =
    usePersistentMultiSelect<ColumnKey>({
      storageKey: ACTIVE_COLUMNS_STORAGE_KEY,
      validValues: validColumnKeys,
    })
  const { selected: selectedRows, toggleSelected: toggleRow, setSelected: setSelectedRows } =
    usePersistentMultiSelect<string>({
      storageKey: ACTIVE_ROWS_STORAGE_KEY,
      validValues: validRowIds,
    })

  const sortedRows = useFilteredSortedRows({
    rows,
    search,
    selectedColumns,
    sortConfig,
  })

  const visibleRowIds = useMemo(() => new Set(sortedRows.map((row) => row.id)), [sortedRows])

  useEffect(() => {
    if (selectedRows.every((id) => visibleRowIds.has(id))) return
    setSelectedRows((prev) => prev.filter((id) => visibleRowIds.has(id)))
  }, [selectedRows, setSelectedRows, visibleRowIds])

  useEffect(() => {
    localStorage.setItem(TABLE_ROWS_STORAGE_KEY, JSON.stringify(rows))
  }, [rows])

  const handleOpenDeleteModal = () => {
    if (selectedRows.length === 0) return
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleConfirmDelete = () => {
    setRows((prev) => {
      const nextRows = prev.filter((row) => !selectedRows.includes(row.id))
      if (nextRows.length === prev.length) return prev

      setPastRows((history) => [...history, prev])
      setFutureRows([])
      return nextRows
    })
    setSelectedRows([])
    setIsDeleteModalOpen(false)
  }

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  const handleConfirmAdd = (newRowData: Omit<Row, 'id'>) => {
    setRows((prev) => {
      const nextRow: Row = {
        id: generateUniqueRowId(prev),
        ...newRowData,
        parent_id: newRowData.parent_id.trim(),
      }

      const nextRows = [...prev, nextRow]
      setPastRows((history) => [...history, prev])
      setFutureRows([])
      return nextRows
    })

    setIsAddModalOpen(false)
  }

  const handleUndo = () => {
    if (pastRows.length === 0) return

    const previousRows = pastRows[pastRows.length - 1]
    setPastRows((history) => history.slice(0, -1))
    setFutureRows((history) => [rows, ...history])
    setRows(previousRows)
  }

  const handleRedo = () => {
    if (futureRows.length === 0) return

    const [nextRows, ...rest] = futureRows
    setFutureRows(rest)
    setPastRows((history) => [...history, rows])
    setRows(nextRows)
  }

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumns={selectedColumns}
        selectedRowCount={selectedRows.length}
        onDeleteClick={handleOpenDeleteModal}
        onAddClick={handleOpenAddModal}
        canUndo={pastRows.length > 0}
        canRedo={futureRows.length > 0}
        onUndoClick={handleUndo}
        onRedoClick={handleRedo}
      />

      <section>
        <Table
          data={sortedRows}
          selectedRows={selectedRows}
          onToggleRow={toggleRow}
          selectedColumns={selectedColumns}
          onToggleColumn={toggleColumn}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
        />
      </section>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        selectedCount={selectedRows.length}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
      <AddRowModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onConfirm={handleConfirmAdd}
      />
    </main>
  )
}

export default App
