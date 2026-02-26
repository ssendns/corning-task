import type { TableRowProps } from '../types/props'
import TableRowEditCells from './TableRowEditCells'
import TableRowViewCells from './TableRowViewCells'

function TableRow({
  row,
  isSelected,
  onToggleRow,
  isEditing,
  editValues,
  editErrors,
  onStartEdit,
  onEditValueChange,
}: TableRowProps) {
  return (
    <tr
      className={`select-none cursor-pointer divide-x divide-slate-100 text-sm transition ${
        isSelected ? 'bg-blue-100' : 'odd:bg-white even:bg-slate-50/60 hover:bg-slate-100/80'
      }`}
      onMouseDown={(event) => {
        if (!isEditing) event.preventDefault()
      }}
      onClick={(event) => {
        if (isEditing) return
        onToggleRow(row.id, event.shiftKey)
      }}
      onDoubleClick={() => onStartEdit(row)}
    >
      {isEditing ? (
        <TableRowEditCells
          row={row}
          editValues={editValues}
          editErrors={editErrors}
          onEditValueChange={onEditValueChange}
        />
      ) : (
        <TableRowViewCells row={row} />
      )}
    </tr>
  )
}

export default TableRow
