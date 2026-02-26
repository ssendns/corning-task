import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { tableColumns } from '../constants/tableColumns'
import type { TableProps } from '../types/props'

function Table({ data, activeId, onSelect, selectedColumn, onToggleColumn }: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-app-border bg-white">
      <table className="w-full border-collapse">
        <TableHeader selectedColumn={selectedColumn} onToggleColumn={onToggleColumn} />
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id} row={row} isActive={row.id === activeId} onSelect={onSelect} />
            ))
          ) : (
            <tr>
              <td
                colSpan={tableColumns.length}
                className="px-3 py-8 text-center text-sm text-app-subtle"
              >
                Nothing found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
