import type { ColumnKey } from '../constants/tableColumns'
import type { Row } from './row'

export interface TableProps {
  data: Row[]
  selectedRows: string[]
  onToggleRow: (id: string, withShift: boolean) => void
  selectedColumns: ColumnKey[]
  onToggleColumn: (key: ColumnKey, withShift: boolean) => void
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
}

export interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder: string
}
