import type { ColumnKey } from '../constants/tableColumns'
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
  sortConfig: SortConfig | null
  onSortChange: (config: SortConfig | null) => void
}

export interface TableRowProps {
  row: Row
  isSelected: boolean
  onToggleRow: (id: string, withShift: boolean) => void
}

export interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
  selectedColumns: ColumnKey[]
  selectedRowCount: number
  onDeleteClick: () => void
}

export interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder: string
}
