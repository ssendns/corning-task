import type { ColumnKey } from '../constants/tableColumns'
import type { Row } from './row'

export interface TableProps {
  data: Row[]
  activeId: string
  onSelect: (id: string) => void
  selectedColumns: ColumnKey[]
  onToggleColumn: (key: ColumnKey, withShift: boolean) => void
}

export interface TableRowProps {
  row: Row
  isActive: boolean
  onSelect: (id: string) => void
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
