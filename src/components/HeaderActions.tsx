import { Redo2, Undo2 } from 'lucide-react'
import type { HeaderActionsProps } from '../types/props'

function HeaderActions({
  selectedRowCount,
  isEditing,
  onDeleteClick,
  onAddClick,
  onSaveEditClick,
  onCancelEditClick,
  canUndo,
  canRedo,
  onUndoClick,
  onRedoClick,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={!canUndo}
        onClick={onUndoClick}
        aria-label="Undo"
        className={`min-w-10 rounded-lg px-2 py-1.5 text-sm font-medium transition ${
          canUndo
            ? 'border border-app-border bg-white text-app-text hover:bg-slate-50'
            : 'cursor-not-allowed border border-app-border bg-slate-100 text-app-subtle opacity-70'
        }`}
      >
        <Undo2 className="mx-auto h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={onRedoClick}
        aria-label="Redo"
        className={`min-w-10 rounded-lg px-2 py-1.5 text-sm font-medium transition ${
          canRedo
            ? 'border border-app-border bg-white text-app-text hover:bg-slate-50'
            : 'cursor-not-allowed border border-app-border bg-slate-100 text-app-subtle opacity-70'
        }`}
      >
        <Redo2 className="mx-auto h-3.5 w-3.5" />
      </button>
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={onCancelEditClick}
            className="min-w-24 rounded-xl border border-app-border bg-white px-3 py-2 text-sm font-medium text-app-text transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSaveEditClick}
            className="min-w-24 rounded-xl border border-emerald-600 bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            disabled={selectedRowCount === 0}
            onClick={onDeleteClick}
            className={`min-w-24 rounded-xl px-3 py-2 text-sm font-medium transition ${
              selectedRowCount === 0
                ? 'cursor-not-allowed border border-rose-300 bg-rose-50 text-rose-700 opacity-70'
                : 'border border-rose-600 bg-rose-600 text-white hover:bg-rose-700'
            }`}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onAddClick}
            className="min-w-24 rounded-xl border border-app-accent bg-app-accent px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Add new
          </button>
        </>
      )}
    </div>
  )
}

export default HeaderActions
