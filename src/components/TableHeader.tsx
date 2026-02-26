import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { tableColumns } from '../constants/tableColumns'
import { MIN_COLUMN_WIDTH } from '../constants/tableConfig'
import type { ColumnKey } from '../constants/tableColumns'
import type { TableHeaderProps } from '../types/props'
import ColumnResizeHandle from './ColumnResizeHandle'
import ColumnFilterMenu from './ColumnFilterMenu'

function TableHeader({
  selectedColumns,
  onToggleColumn,
  columnWidths,
  onResizeColumn,
  sortConfig,
  onSortChange,
}: TableHeaderProps) {
  const [openMenuKey, setOpenMenuKey] = useState<ColumnKey | null>(null)
  const isResizingRef = useRef(false)

  return (
    <thead className="select-none text-xs uppercase tracking-wide text-slate-700">
      <tr className="border-b-2 divide-x divide-slate-100">
        {tableColumns.map((column) => (
          <th
            key={column.key}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              if (isResizingRef.current) {
                event.preventDefault()
                return
              }
              onToggleColumn(column.key, event.shiftKey)
            }}
            className={`cursor-pointer px-3 py-2.5 text-left font-semibold transition ${
              selectedColumns.includes(column.key) ? 'bg-blue-100' : 'hover:bg-slate-100/70'
            }`}
          >
            <div className="relative flex items-center justify-between gap-2">
              <span>
                {column.label}
                {sortConfig?.key === column.key && (
                  <span className="ml-1 text-[10px] text-app-subtle">
                    ({sortConfig.direction === 'asc' ? 'asc' : 'desc'})
                  </span>
                )}
              </span>
              <button
                type="button"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  setOpenMenuKey((prev: ColumnKey | null) =>
                    prev === column.key ? null : column.key,
                  )
                }}
                className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                aria-label={`Open ${column.label} filter menu`}
              >
                <ChevronDown className="h-3 w-3" />
              </button>
              <ColumnFilterMenu
                isOpen={openMenuKey === column.key}
                onClose={() => setOpenMenuKey(null)}
                onSortAsc={() => {
                  onSortChange({ key: column.key, direction: 'asc' })
                  setOpenMenuKey(null)
                }}
                onSortDesc={() => {
                  onSortChange({ key: column.key, direction: 'desc' })
                  setOpenMenuKey(null)
                }}
                onClearSort={() => {
                  onSortChange(null)
                  setOpenMenuKey(null)
                }}
              />
              <ColumnResizeHandle
                startWidth={columnWidths[column.key]}
                minWidth={MIN_COLUMN_WIDTH}
                onResize={(nextWidth) => onResizeColumn(column.key, nextWidth)}
                onResizeStateChange={(isResizing) => {
                  isResizingRef.current = isResizing
                }}
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
