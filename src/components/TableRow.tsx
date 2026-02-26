import { getCellClassName, getCellValue, tableColumns } from '../constants/tableColumns'
import { rowTypeOptions } from '../utils/rowValidation'
import type { TableRowProps } from '../types/props'

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
      {tableColumns.map((column) => {
        if (!isEditing) {
          return (
            <td key={column.key} className={getCellClassName(column.key)}>
              {getCellValue(row, column.key)}
            </td>
          )
        }

        if (column.key === 'id') {
          return (
            <td key={column.key} className={getCellClassName(column.key)}>
              {row.id}
            </td>
          )
        }

        if (column.key === 'type') {
          return (
            <td key={column.key} className={getCellClassName(column.key)}>
              <select
                value={editValues.type}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => onEditValueChange('type', event.target.value)}
                className="w-full rounded border border-app-border bg-white px-2 py-1 text-xs outline-none focus:border-app-accent"
              >
                {rowTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {editErrors.type && <p className="mt-1 text-[10px] text-rose-600">{editErrors.type}</p>}
            </td>
          )
        }

        if (column.key === 'radius') {
          return (
            <td key={column.key} className={getCellClassName(column.key)}>
              <input
                type="number"
                min="0.000001"
                step="any"
                value={editValues.radius}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => onEditValueChange('radius', event.target.value)}
                className="w-full rounded border border-app-border bg-white px-2 py-1 text-xs outline-none focus:border-app-accent"
              />
              {editErrors.radius && (
                <p className="mt-1 text-[10px] text-rose-600">{editErrors.radius}</p>
              )}
            </td>
          )
        }

        if (column.key === 'name') {
          return (
            <td key={column.key} className={getCellClassName(column.key)}>
              <input
                type="text"
                value={editValues.name}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => onEditValueChange('name', event.target.value)}
                className="w-full rounded border border-app-border bg-white px-2 py-1 text-xs outline-none focus:border-app-accent"
              />
              {editErrors.name && <p className="mt-1 text-[10px] text-rose-600">{editErrors.name}</p>}
            </td>
          )
        }

        return (
          <td key={column.key} className={getCellClassName(column.key)}>
            <input
              type="text"
              value={editValues.parent_id}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => onEditValueChange('parent_id', event.target.value)}
              className="w-full rounded border border-app-border bg-white px-2 py-1 text-xs outline-none focus:border-app-accent"
            />
          </td>
        )
      })}
    </tr>
  )
}

export default TableRow
