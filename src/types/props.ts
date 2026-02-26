import type { ColumnKey } from '../constants/tableColumns'
import type { EditRowFormErrors, EditRowFormValues } from '../utils/rowValidation'
import type { Row } from './row'
import type { RowType } from './row'

export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  key: ColumnKey
  direction: SortDirection
}

export interface TableProps {
  data: Row[]
  selectedRows: string[]
  onToggleRow: (id: string, withShift: boolean) => void
  selectedColumns: ColumnKey[]
  onToggleColumn: (key: ColumnKey, withShift: boolean) => void
  columnWidths: Record<ColumnKey, number>
  onResizeColumn: (key: ColumnKey, width: number) => void
  sortConfig: SortConfig | null
  onSortChange: (config: SortConfig | null) => void
  editingRowId: string | null
  editValues: EditRowFormValues
  editErrors: EditRowFormErrors
  onStartEdit: (row: Row) => void
  onEditValueChange: (field: keyof EditRowFormValues, value: string) => void
}

export interface TableHeaderProps {
  selectedColumns: ColumnKey[]
  onToggleColumn: (key: ColumnKey, withShift: boolean) => void
  columnWidths: Record<ColumnKey, number>
  onResizeColumn: (key: ColumnKey, width: number) => void
  sortConfig: SortConfig | null
  onSortChange: (config: SortConfig | null) => void
}

export interface TableRowProps {
  row: Row
  isSelected: boolean
  onToggleRow: (id: string, withShift: boolean) => void
  isEditing: boolean
  editValues: EditRowFormValues
  editErrors: EditRowFormErrors
  onStartEdit: (row: Row) => void
  onEditValueChange: (field: keyof EditRowFormValues, value: string) => void
}

export interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
  selectedColumns: ColumnKey[]
  selectedRowCount: number
  isEditing: boolean
  onDeleteClick: () => void
  onAddClick: () => void
  onSaveEditClick: () => void
  onCancelEditClick: () => void
  canUndo: boolean
  canRedo: boolean
  onUndoClick: () => void
  onRedoClick: () => void
}

export interface HeaderActionsProps {
  selectedRowCount: number
  isEditing: boolean
  onDeleteClick: () => void
  onAddClick: () => void
  onSaveEditClick: () => void
  onCancelEditClick: () => void
  canUndo: boolean
  canRedo: boolean
  onUndoClick: () => void
  onRedoClick: () => void
}

export interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder: string
}

export interface AddRowModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (row: Omit<Row, 'id'>) => void
}

export interface ColumnFilterMenuProps {
  isOpen: boolean
  onClose: () => void
  onSortAsc: () => void
  onSortDesc: () => void
  onClearSort: () => void
}

export interface DeleteConfirmModalProps {
  isOpen: boolean
  selectedCount: number
  onClose: () => void
  onConfirm: () => void
}

export interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: 'text' | 'number' | 'select'
  min?: string
  step?: string
  options?: Array<{ label: string; value: string }>
}

export interface UseAddRowFormParams {
  onClose: () => void
  onConfirm: (row: {
    name: string
    parent_id: string
    radius: number
    type: RowType
  }) => void
}

export interface UseColumnWidthsParams<T extends string> {
  storageKey: string
  keys: T[]
  defaultWidths: Record<T, number>
  minWidth?: number
}

export interface UseFilteredSortedRowsParams {
  rows: Row[]
  search: string
  selectedColumns: ColumnKey[]
  sortConfig: SortConfig | null
}

export interface UsePersistentMultiSelectParams<T extends string> {
  storageKey: string
  validValues: Set<T>
}

export interface UseRowEditingParams {
  rows: Row[]
  onCommit: (rowId: string, data: Pick<Row, 'name' | 'parent_id' | 'radius' | 'type'>) => void
}

export interface UseTableRowsHistoryParams {
  storageKey: string
  initialRows: Row[]
}
