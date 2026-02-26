import TableHeader from './TableHeader'
import TableRow from './TableRow'
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
          {data.map((row) => (
            <TableRow key={row.id} row={row} isActive={row.id === activeId} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
