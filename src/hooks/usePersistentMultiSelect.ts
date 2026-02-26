import { useCallback, useEffect, useState } from 'react'
import type { UsePersistentMultiSelectParams } from '../types/props'

function usePersistentMultiSelect<T extends string>({
  storageKey,
  validValues,
}: UsePersistentMultiSelectParams<T>) {
  const [selected, setSelected] = useState<T[]>(() => {
    if (typeof window === 'undefined') return []

    const saved = localStorage.getItem(storageKey)
    if (!saved) return []

    try {
      const parsed = JSON.parse(saved)
      if (!Array.isArray(parsed)) return []
      return parsed.filter((value): value is T => validValues.has(value))
    } catch {
      return []
    }
  })

  const toggleSelected = useCallback((value: T, withShift: boolean) => {
    setSelected((prev) => {
      const exists = prev.includes(value)

      if (withShift) {
        return exists ? prev.filter((item) => item !== value) : [...prev, value]
      }

      if (prev.length === 1 && exists) {
        return []
      }

      return [value]
    })
  }, [])

  useEffect(() => {
    if (selected.length === 0) {
      localStorage.removeItem(storageKey)
      return
    }

    localStorage.setItem(storageKey, JSON.stringify(selected))
  }, [selected, storageKey])

  return { selected, setSelected, toggleSelected }
}

export default usePersistentMultiSelect
