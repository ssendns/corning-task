import type { HeaderProps } from '../types/props'
import { tableColumns } from '../constants/tableColumns'
import SearchBar from './SearchBar'

function Header({ search, onSearchChange, selectedColumn }: HeaderProps) {
  const selectedLabel =
    tableColumns.find((column) => column.key === selectedColumn)?.label ?? 'all columns'

  return (
    <header className="w-full border-b-2 border-app-border bg-white px-4 py-4 shadow-sm">
      <SearchBar
        search={search}
        onSearchChange={onSearchChange}
        placeholder={`Search by ${selectedLabel.toLowerCase()}...`}
      />
    </header>
  )
}

export default Header
