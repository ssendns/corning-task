import type { ColumnKey } from '../constants/tableColumns'
import type { Row } from './row'

export interface TableProps {
  data: Row[]
  activeId: string
  onSelect: (id: string) => void
  selectedColumn: ColumnKey | null
  onToggleColumn: (key: ColumnKey) => void
}

export interface TableRowProps {
  row: Row
  isActive: boolean
  onSelect: (id: string) => void
}

export interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
  selectedColumn: ColumnKey | null
}

export interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder: string
}
