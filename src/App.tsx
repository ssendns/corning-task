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
import {
  validateEditRow,
  type EditRowFormErrors,
  type EditRowFormValues,
} from './utils/rowValidation'

const initialRows = mockData as Row[]
const TABLE_ROWS_STORAGE_KEY = 'table-rows'
const ACTIVE_ROWS_STORAGE_KEY = 'active-row-ids'
const ACTIVE_COLUMNS_STORAGE_KEY = 'active-column-keys'
const COLUMN_WIDTHS_STORAGE_KEY = 'table-column-widths'
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))
const validRowIds = new Set<string>(initialRows.map((row) => row.id))
const validTypes = new Set(['bubble', 'crack', 'scratch'])
const defaultColumnWidths: Record<ColumnKey, number> = {
  id: 260,
  name: 190,
  type: 140,
  radius: 130,
  parent_id: 260,
}

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

const getInitialColumnWidths = () => {
  if (typeof window === 'undefined') return defaultColumnWidths

  const savedWidths = localStorage.getItem(COLUMN_WIDTHS_STORAGE_KEY)
  if (!savedWidths) return defaultColumnWidths

  try {
    const parsed = JSON.parse(savedWidths) as Partial<Record<ColumnKey, number>>

    return tableColumns.reduce(
      (acc, column) => {
        const value = parsed[column.key]
        acc[column.key] = typeof value === 'number' && value >= 96 ? value : defaultColumnWidths[column.key]
        return acc
      },
      {} as Record<ColumnKey, number>,
    )
  } catch {
    return defaultColumnWidths
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
  const [columnWidths, setColumnWidths] = useState<Record<ColumnKey, number>>(getInitialColumnWidths)
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<EditRowFormValues>({
    name: '',
    parent_id: '',
    radius: '',
    type: 'bubble',
  })
  const [editErrors, setEditErrors] = useState<EditRowFormErrors>({})
  const { selected: selectedColumns, toggleSelected: toggleColumn } =
    usePersistentMultiSelect<ColumnKey>({
      storageKey: ACTIVE_COLUMNS_STORAGE_KEY,
      validValues: validColumnKeys,
    })
  const {
    selected: selectedRows,
    toggleSelected: toggleRow,
    setSelected: setSelectedRows,
  } = usePersistentMultiSelect<string>({
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
    if (!editingRowId) return
    if (rows.some((row) => row.id === editingRowId)) return
    setEditingRowId(null)
    setEditErrors({})
  }, [editingRowId, rows])

  useEffect(() => {
    localStorage.setItem(TABLE_ROWS_STORAGE_KEY, JSON.stringify(rows))
  }, [rows])

  useEffect(() => {
    localStorage.setItem(COLUMN_WIDTHS_STORAGE_KEY, JSON.stringify(columnWidths))
  }, [columnWidths])

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

  const handleResizeColumn = (key: ColumnKey, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [key]: width }))
  }

  const handleStartEdit = (row: Row) => {
    setEditingRowId(row.id)
    setEditValues({
      name: row.name,
      parent_id: row.parent_id,
      radius: String(row.radius),
      type: row.type,
    })
    setEditErrors({})
  }

  const handleCancelEdit = () => {
    setEditingRowId(null)
    setEditErrors({})
  }

  const handleEditValueChange = (field: keyof EditRowFormValues, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }))
    setEditErrors((prev) => {
      if (!prev[field as keyof EditRowFormErrors]) return prev
      const next = { ...prev }
      delete next[field as keyof EditRowFormErrors]
      return next
    })
  }

  const handleSaveEdit = () => {
    if (!editingRowId) return

    const validationErrors = validateEditRow(editValues)
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors)
      return
    }

    setRows((prev) => {
      const nextRows = prev.map((row) =>
        row.id === editingRowId
          ? {
              ...row,
              name: editValues.name.trim(),
              parent_id: editValues.parent_id.trim(),
              radius: Number(editValues.radius),
              type: editValues.type as Row['type'],
            }
          : row,
      )

      setPastRows((history) => [...history, prev])
      setFutureRows([])
      return nextRows
    })

    setEditingRowId(null)
    setEditErrors({})
  }

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumns={selectedColumns}
        selectedRowCount={selectedRows.length}
        isEditing={editingRowId !== null}
        onDeleteClick={handleOpenDeleteModal}
        onAddClick={handleOpenAddModal}
        onSaveEditClick={handleSaveEdit}
        onCancelEditClick={handleCancelEdit}
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
          columnWidths={columnWidths}
          onResizeColumn={handleResizeColumn}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
          editingRowId={editingRowId}
          editValues={editValues}
          editErrors={editErrors}
          onStartEdit={handleStartEdit}
          onEditValueChange={handleEditValueChange}
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
