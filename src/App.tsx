import { useEffect, useMemo, useState } from 'react'
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
const ACTIVE_ROWS_STORAGE_KEY = 'active-row-ids'
const ACTIVE_COLUMNS_STORAGE_KEY = 'active-column-keys'
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))
const validRowIds = new Set<string>(initialRows.map((row) => row.id))

function App() {
  const [rows, setRows] = useState<Row[]>(initialRows)
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
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

  const handleOpenDeleteModal = () => {
    if (selectedRows.length === 0) return
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleConfirmDelete = () => {
    setRows((prev) => prev.filter((row) => !selectedRows.includes(row.id)))
    setSelectedRows([])
    setIsDeleteModalOpen(false)
  }

  return (
    <main className="min-h-screen">
      <Header
        search={search}
        onSearchChange={setSearch}
        selectedColumns={selectedColumns}
        selectedRowCount={selectedRows.length}
        onDeleteClick={handleOpenDeleteModal}
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
    </main>
  )
}

export default App
