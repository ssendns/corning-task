import { tableColumns } from '../constants/tableColumns'

function TableHeader() {
  return (
    <thead className="text-xs uppercase tracking-wide text-slate-700">
      <tr>
        {tableColumns.map((column) => (
          <th
            key={column.key}
            className="border-b-2 border-app-border px-3 py-2.5 text-left font-semibold"
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
