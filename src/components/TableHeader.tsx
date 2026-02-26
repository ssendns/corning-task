import { tableColumns } from '../constants/tableColumns'
import type { ColumnKey } from '../constants/tableColumns'

interface TableHeaderProps {
  selectedColumn: ColumnKey | null
  onToggleColumn: (key: ColumnKey) => void
}

function TableHeader({ selectedColumn, onToggleColumn }: TableHeaderProps) {
  return (
    <thead className="text-xs uppercase tracking-wide text-slate-700">
      <tr className="border-b-2 divide-x divide-slate-100">
        {tableColumns.map((column) => (
          <th
            key={column.key}
            onClick={() => onToggleColumn(column.key)}
            className={`cursor-pointer px-3 py-2.5 text-left font-semibold transition ${
              selectedColumn === column.key ? 'bg-blue-100' : 'hover:bg-slate-100/70'
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
