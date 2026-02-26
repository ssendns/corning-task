import type { ColumnKey } from '../constants/tableColumns'
import type { EditRowFormErrors, EditRowFormValues } from '../utils/rowValidation'
import type { Row } from './row'

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
