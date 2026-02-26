import { getCellClassName, tableColumns } from '../constants/tableColumns'
import type { TableRowProps } from '../types/props'
import { rowTypeOptions } from '../utils/rowValidation'

type TableRowEditCellsProps = Pick<TableRowProps, 'row' | 'editValues' | 'editErrors' | 'onEditValueChange'>

const inputClassName =
  'w-full rounded border border-app-border bg-white px-2 py-1 text-xs outline-none focus:border-app-accent'

function TableRowEditCells({ row, editValues, editErrors, onEditValueChange }: TableRowEditCellsProps) {
  return (
    <>
      {tableColumns.map((column) => {
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
                className={inputClassName}
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
                min="0.001"
                step="any"
                value={editValues.radius}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => onEditValueChange('radius', event.target.value)}
                className={inputClassName}
              />
              {editErrors.radius && <p className="mt-1 text-[10px] text-rose-600">{editErrors.radius}</p>}
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
                className={inputClassName}
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
              className={inputClassName}
            />
          </td>
        )
      })}
    </>
  )
}

export default TableRowEditCells
