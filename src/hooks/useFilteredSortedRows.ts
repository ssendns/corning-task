import { useMemo } from 'react'
import type { UseFilteredSortedRowsParams } from '../types/props'

function useFilteredSortedRows({
  rows,
  search,
  selectedColumns,
  sortConfig,
}: UseFilteredSortedRowsParams) {
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return rows

    if (selectedColumns.length === 0) {
      return rows.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
      )
    }

    return rows.filter((row) =>
      selectedColumns.some((column) => String(row[column]).toLowerCase().includes(query)),
    )
  }, [rows, search, selectedColumns])

  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows

    const sorted = [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue
      }

      return String(aValue).localeCompare(String(bValue), undefined, { numeric: true })
    })

    return sortConfig.direction === 'asc' ? sorted : sorted.reverse()
  }, [filteredRows, sortConfig])

  return sortedRows
}

export default useFilteredSortedRows
