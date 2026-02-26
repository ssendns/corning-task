import { getCellClassName, getCellValue, tableColumns } from '../constants/tableColumns'
import type { Row } from '../types/row'

interface TableRowViewCellsProps {
  row: Row
}

function TableRowViewCells({ row }: TableRowViewCellsProps) {
  return (
    <>
      {tableColumns.map((column) => (
        <td key={column.key} className={getCellClassName(column.key)}>
          {getCellValue(row, column.key)}
        </td>
      ))}
    </>
  )
}

export default TableRowViewCells
