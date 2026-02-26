import { tableColumns } from '../constants/tableColumns'

function TableHeader() {
  return (
    <thead className="bg-slate-100/90 text-xs uppercase tracking-wide text-slate-700">
      <tr>
        {tableColumns.map((column) => (
          <th key={column} className="border-b border-app-border px-3 py-2.5 text-left font-semibold">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
