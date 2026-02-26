import type { Row } from '../types/row'
import { getCellClassName, getCellValue, tableColumns } from '../constants/tableColumns'

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
      {tableColumns.map((column) => (
        <td key={column.key} className={getCellClassName(column.key)}>
          {getCellValue(row, column.key)}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
