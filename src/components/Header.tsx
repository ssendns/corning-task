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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <SearchBar
            search={search}
            onSearchChange={onSearchChange}
            placeholder={`Search by ${selectedLabel.toLowerCase()}...`}
          />
        </div>
        <div className="h-px w-full bg-slate-200 sm:h-8 sm:w-px" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="min-w-24 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            Delete
          </button>
          <button
            type="button"
            className="min-w-24 rounded-xl border border-app-accent bg-app-accent px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Add new
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
