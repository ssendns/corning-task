import { useEffect, useState } from 'react'
import type { UseTableRowsHistoryParams } from '../types/props'
import type { Row } from '../types/row'

const validTypes = new Set(['bubble', 'crack', 'scratch'])

const isRow = (value: unknown): value is Row => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.parent_id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.radius === 'number' &&
    typeof candidate.type === 'string' &&
    validTypes.has(candidate.type)
  )
}

const generateUniqueRowId = (existingRows: Row[]) => {
  const existingIds = new Set(existingRows.map((row) => row.id))

  while (true) {
    const candidate =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `row-${Date.now()}-${Math.random().toString(16).slice(2)}`

    if (!existingIds.has(candidate)) return candidate
  }
}

function useTableRowsHistory({ storageKey, initialRows }: UseTableRowsHistoryParams) {
  const [rows, setRows] = useState<Row[]>(() => {
    if (typeof window === 'undefined') return initialRows

    const savedRows = localStorage.getItem(storageKey)
    if (!savedRows) return initialRows

    try {
      const parsed = JSON.parse(savedRows)
      if (!Array.isArray(parsed)) return initialRows
      const validRows = parsed.filter(isRow)
      return validRows.length > 0 || parsed.length === 0 ? validRows : initialRows
    } catch {
      return initialRows
    }
  })

  const [pastRows, setPastRows] = useState<Row[][]>([])
  const [futureRows, setFutureRows] = useState<Row[][]>([])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(rows))
  }, [rows, storageKey])

  const deleteRows = (selectedRowIds: string[]) => {
    if (selectedRowIds.length === 0) return

    setRows((prev) => {
      const nextRows = prev.filter((row) => !selectedRowIds.includes(row.id))
      if (nextRows.length === prev.length) return prev

      setPastRows((history) => [...history, prev])
      setFutureRows([])
      return nextRows
    })
  }

  const addRow = (newRowData: Omit<Row, 'id'>) => {
    setRows((prev) => {
      const nextRows = [
        ...prev,
        {
          id: generateUniqueRowId(prev),
          ...newRowData,
          parent_id: newRowData.parent_id.trim(),
        },
      ]

      setPastRows((history) => [...history, prev])
      setFutureRows([])
      return nextRows
    })
  }

  const updateRow = (rowId: string, data: Pick<Row, 'name' | 'parent_id' | 'radius' | 'type'>) => {
    setRows((prev) => {
      const nextRows = prev.map((row) => (row.id === rowId ? { ...row, ...data } : row))

      setPastRows((history) => [...history, prev])
      setFutureRows([])
      return nextRows
    })
  }

  const undo = () => {
    if (pastRows.length === 0) return

    const previousRows = pastRows[pastRows.length - 1]
    setPastRows((history) => history.slice(0, -1))
    setFutureRows((history) => [rows, ...history])
    setRows(previousRows)
  }

  const redo = () => {
    if (futureRows.length === 0) return

    const [nextRows, ...rest] = futureRows
    setFutureRows(rest)
    setPastRows((history) => [...history, rows])
    setRows(nextRows)
  }

  return {
    rows,
    deleteRows,
    addRow,
    updateRow,
    undo,
    redo,
    canUndo: pastRows.length > 0,
    canRedo: futureRows.length > 0,
  }
}

export default useTableRowsHistory
