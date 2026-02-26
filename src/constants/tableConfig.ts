import type { ColumnKey } from './tableColumns'

export const TABLE_ROWS_STORAGE_KEY = 'table-rows'
export const ACTIVE_ROWS_STORAGE_KEY = 'active-row-ids'
export const ACTIVE_COLUMNS_STORAGE_KEY = 'active-column-keys'
export const COLUMN_WIDTHS_STORAGE_KEY = 'table-column-widths'

export const defaultColumnWidths: Record<ColumnKey, number> = {
  id: 260,
  name: 190,
  type: 140,
  radius: 130,
  parent_id: 260,
}

export const MIN_COLUMN_WIDTH = 96
