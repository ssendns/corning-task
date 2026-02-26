import { getCellClassName, getCellValue, tableColumns } from '../constants/tableColumns'
import type { TableRowProps } from '../types/props'

function TableRow({ row, isSelected, onToggleRow }: TableRowProps) {
  return (
    <tr
      className={`cursor-pointer divide-x divide-slate-100 text-sm transition ${
        isSelected ? 'bg-blue-100' : 'odd:bg-white even:bg-slate-50/60 hover:bg-slate-100/80'
      }`}
      onClick={(event) => onToggleRow(row.id, event.shiftKey)}
    >
      {tableColumns.map((column) => (
        <td key={column.key} className={getCellClassName(column.key)}>
          {getCellValue(row, column.key)}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
