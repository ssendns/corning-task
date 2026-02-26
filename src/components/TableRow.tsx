import { getCellClassName, getCellValue, tableColumns } from '../constants/tableColumns'
import type { TableRowProps } from '../types/props'

function TableRow({ row, isActive, onSelect }: TableRowProps) {
  return (
    <tr
      className={`cursor-pointer text-sm transition ${
        isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
      onClick={() => onSelect(row.id)}
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
