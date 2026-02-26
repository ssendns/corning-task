import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { tableColumns } from '../constants/tableColumns'
import type { TableProps } from '../types/props'

function Table({
  data,
  selectedRows,
  onToggleRow,
  selectedColumns,
  onToggleColumn,
  columnWidths,
  onResizeColumn,
  sortConfig,
  onSortChange,
  editingRowId,
  editValues,
  editErrors,
  onStartEdit,
  onEditValueChange,
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-app-border bg-white">
      <table className="w-full border-collapse">
        <colgroup>
          {tableColumns.map((column) => (
            <col key={column.key} style={{ width: `${columnWidths[column.key]}px` }} />
          ))}
        </colgroup>
        <TableHeader
          selectedColumns={selectedColumns}
          onToggleColumn={onToggleColumn}
          columnWidths={columnWidths}
          onResizeColumn={onResizeColumn}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
        />
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                isSelected={selectedRows.includes(row.id)}
                onToggleRow={onToggleRow}
                isEditing={editingRowId === row.id}
                editValues={editValues}
                editErrors={editErrors}
                onStartEdit={onStartEdit}
                onEditValueChange={onEditValueChange}
              />
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
