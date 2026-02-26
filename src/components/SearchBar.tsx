import { tableColumns, type ColumnKey } from '../constants/tableColumns'
import type { SearchBarProps } from '../types/props'

function SearchBar({
  search,
  onSearchChange,
  selectedColumn,
  onSelectedColumnChange,
}: SearchBarProps) {
  const selectedLabel =
    tableColumns.find((column) => column.key === selectedColumn)?.label ?? 'Name'

  return (
    <div className="flex w-full gap-2">
      <select
        value={selectedColumn}
        onChange={(event) => onSelectedColumnChange(event.target.value as ColumnKey)}
        className="w-40 rounded-xl border border-app-border bg-white px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
      >
        {tableColumns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={`Search by ${selectedLabel.toLowerCase()}...`}
        className="w-full rounded-xl border border-app-border bg-white px-3 py-2 text-sm text-app-text outline-none placeholder:text-app-subtle focus:border-app-accent"
      />
    </div>
  )
}

export default SearchBar
