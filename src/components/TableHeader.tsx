import { tableColumns } from '../constants/tableColumns'
import type { ColumnKey } from '../constants/tableColumns'

interface TableHeaderProps {
  selectedColumns: ColumnKey[]
  onToggleColumn: (key: ColumnKey, withShift: boolean) => void
}

function TableHeader({ selectedColumns, onToggleColumn }: TableHeaderProps) {
  return (
    <thead className="text-xs uppercase tracking-wide text-slate-700">
      <tr className="border-b-2 divide-x divide-slate-100">
        {tableColumns.map((column) => (
          <th
            key={column.key}
            onClick={(event) => onToggleColumn(column.key, event.shiftKey)}
            className={`cursor-pointer px-3 py-2.5 text-left font-semibold transition ${
              selectedColumns.includes(column.key) ? 'bg-blue-100' : 'hover:bg-slate-100/70'
            }`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
