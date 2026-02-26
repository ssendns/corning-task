import type { Row } from '../types/row'

export const tableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'radius', label: 'Radius' },
  { key: 'parent_id', label: 'Parent ID' },
] as const

export type ColumnKey = (typeof tableColumns)[number]['key']

export const getCellClassName = (key: ColumnKey) => {
  const base = 'border-b border-app-border px-3 py-2'

  if (key === 'id' || key === 'parent_id') {
    return `${base} font-mono text-xs text-app-subtle`
  }

  if (key === 'name') {
    return `${base} font-medium text-app-text`
  }

  return `${base} text-app-text`
}

export const getCellValue = (row: Row, key: ColumnKey) => String(row[key])
