import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { tableColumns } from '../constants/tableColumns'
import type { Row } from '../types/row'

interface TableProps {
  data: Row[]
  activeId: string
  onSelect: (id: string) => void
}

function Table({ data, activeId, onSelect }: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-app-border bg-white">
      <table className="w-full border-collapse">
        <TableHeader />
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id} row={row} isActive={row.id === activeId} onSelect={onSelect} />
            ))
          ) : (
            <tr>
              <td
                colSpan={tableColumns.length}
                className="border-b border-app-border px-3 py-8 text-center text-sm text-app-subtle"
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
