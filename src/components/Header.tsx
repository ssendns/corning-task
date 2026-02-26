import { tableColumns, type ColumnKey } from '../constants/tableColumns'

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
  const selectedLabel =
    tableColumns.find((column) => column.key === selectedColumn)?.label ?? 'Name'

  return (
    <header className="w-full border-b-2 border-app-border bg-white px-4 py-4 shadow-sm">
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
    </header>
  )
}

export default Header
