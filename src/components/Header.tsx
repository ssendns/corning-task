import type { HeaderProps } from '../types/props'
import { tableColumns } from '../constants/tableColumns'
import SearchBar from './SearchBar'

function Header({ search, onSearchChange, selectedColumns }: HeaderProps) {
  const selectedLabel =
    selectedColumns.length === 0
      ? 'all columns'
      : selectedColumns.length === 1
        ? (tableColumns.find((column) => column.key === selectedColumns[0])?.label ?? 'all columns')
        : `${selectedColumns.length} columns`

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
