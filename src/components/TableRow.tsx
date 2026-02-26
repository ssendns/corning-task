import type { Row } from '../types/row'

interface TableRowProps {
  row: Row
  isActive: boolean
  onSelect: (id: string) => void
}

function TableRow({ row, isActive, onSelect }: TableRowProps) {
  return (
    <tr
      className={`cursor-pointer text-sm transition ${
        isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
      onClick={() => onSelect(row.id)}
    >
      <td className="border-b border-app-border px-3 py-2 font-mono text-xs text-app-subtle">{row.id}</td>
      <td className="border-b border-app-border px-3 py-2 font-medium text-app-text">{row.name}</td>
      <td className="border-b border-app-border px-3 py-2 text-app-text">{row.type}</td>
      <td className="border-b border-app-border px-3 py-2 text-app-text">{row.radius}</td>
      <td className="border-b border-app-border px-3 py-2 font-mono text-xs text-app-subtle">
        {row.parent_id}
      </td>
    </tr>
  )
}

export default TableRow
