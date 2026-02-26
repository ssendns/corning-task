import type { ColumnKey } from '../constants/tableColumns'
import SearchBar from './SearchBar'

interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
  selectedColumn: ColumnKey
  onSelectedColumnChange: (value: ColumnKey) => void
}

function Header({
  search,
  onSearchChange,
  selectedColumn,
  onSelectedColumnChange,
}: HeaderProps) {
  return (
    <header className="w-full border-b-2 border-app-border bg-white px-4 py-4 shadow-sm">
      <SearchBar
        search={search}
        onSearchChange={onSearchChange}
        selectedColumn={selectedColumn}
        onSelectedColumnChange={onSelectedColumnChange}
      />
    </header>
  )
}

export default Header
