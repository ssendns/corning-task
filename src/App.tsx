import { useEffect, useMemo, useState } from 'react'
import AddRowModal from './components/AddRowModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import Header from './components/Header'
import Table from './components/Table'
import {
  ACTIVE_COLUMNS_STORAGE_KEY,
  ACTIVE_ROWS_STORAGE_KEY,
  COLUMN_WIDTHS_STORAGE_KEY,
  TABLE_ROWS_STORAGE_KEY,
  defaultColumnWidths,
} from './constants/tableConfig'
import { tableColumns, type ColumnKey } from './constants/tableColumns'
import mockData from './constants/mockData.json'
import useColumnWidths from './hooks/useColumnWidths'
import useFilteredSortedRows from './hooks/useFilteredSortedRows'
import usePersistentMultiSelect from './hooks/usePersistentMultiSelect'
import useRowEditing from './hooks/useRowEditing'
import useTableRowsHistory from './hooks/useTableRowsHistory'
import type { SortConfig } from './types/props'
import type { Row } from './types/row'

const initialRows = mockData as Row[]
const validColumnKeys = new Set<ColumnKey>(tableColumns.map((column) => column.key))
const validRowIds = new Set<string>(initialRows.map((row) => row.id))

function App() {
  const { rows, addRow, deleteRows, updateRow, undo, redo, canUndo, canRedo } = useTableRowsHistory({
    storageKey: TABLE_ROWS_STORAGE_KEY,
    initialRows,
  })
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { columnWidths, resizeColumn } = useColumnWidths<ColumnKey>({
    storageKey: COLUMN_WIDTHS_STORAGE_KEY,
    keys: tableColumns.map((column) => column.key),
    defaultWidths: defaultColumnWidths,
  })
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
  const { editingRowId, editValues, editErrors, startEdit, cancelEdit, changeEditValue, saveEdit } =
    useRowEditing({
      rows,
      onCommit: updateRow,
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
    deleteRows(selectedRows)
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
    addRow(newRowData)
    setIsAddModalOpen(false)
  }

  const handleUndo = () => {
    undo()
  }

  const handleRedo = () => {
    redo()
  }

  const handleResizeColumn = (key: ColumnKey, width: number) => {
    resizeColumn(key, width)
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
        onSaveEditClick={saveEdit}
        onCancelEditClick={cancelEdit}
        canUndo={canUndo}
        canRedo={canRedo}
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
          onStartEdit={startEdit}
          onEditValueChange={changeEditValue}
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
