import { useEffect, useState } from 'react'
import type { UseColumnWidthsParams } from '../types/props'

function useColumnWidths<T extends string>({
  storageKey,
  keys,
  defaultWidths,
  minWidth = 96,
}: UseColumnWidthsParams<T>) {
  const [columnWidths, setColumnWidths] = useState<Record<T, number>>(() => {
    if (typeof window === 'undefined') return defaultWidths

    const savedWidths = localStorage.getItem(storageKey)
    if (!savedWidths) return defaultWidths

    try {
      const parsed = JSON.parse(savedWidths) as Partial<Record<T, number>>

      return keys.reduce(
        (acc, key) => {
          const value = parsed[key]
          acc[key] = typeof value === 'number' && value >= minWidth ? value : defaultWidths[key]
          return acc
        },
        {} as Record<T, number>,
      )
    } catch {
      return defaultWidths
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(columnWidths))
  }, [columnWidths, storageKey])

  const resizeColumn = (key: T, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [key]: Math.max(minWidth, width) }))
  }

  return { columnWidths, resizeColumn }
}

export default useColumnWidths
