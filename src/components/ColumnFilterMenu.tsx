import { useEffect, useRef } from 'react'
import type { ColumnFilterMenuProps } from '../types/props'

function ColumnFilterMenu({
  isOpen,
  onClose,
  onSortAsc,
  onSortDesc,
  onClearSort,
}: ColumnFilterMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="absolute right-1 top-[calc(100%+4px)] z-20 min-w-44 rounded-lg border border-app-border bg-white p-1 shadow-lg"
    >
      <button
        type="button"
        onClick={onSortAsc}
        className="block w-full rounded-md px-2 py-1.5 text-left text-[11px] font-medium text-app-text hover:bg-slate-100"
      >
        Sort Ascending
      </button>
      <button
        type="button"
        onClick={onSortDesc}
        className="block w-full rounded-md px-2 py-1.5 text-left text-[11px] font-medium text-app-text hover:bg-slate-100"
      >
        Sort Descending
      </button>
      <button
        type="button"
        onClick={onClearSort}
        className="block w-full rounded-md px-2 py-1.5 text-left text-[11px] font-medium text-app-text hover:bg-slate-100"
      >
        Clear Sorting
      </button>
    </div>
  )
}

export default ColumnFilterMenu
