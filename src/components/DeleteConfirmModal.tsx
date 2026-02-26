interface DeleteConfirmModalProps {
  isOpen: boolean
  selectedCount: number
  onClose: () => void
  onConfirm: () => void
}

function DeleteConfirmModal({
  isOpen,
  selectedCount,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-app-border bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold text-app-text">Confirm Deletion</h2>
        <p className="mt-2 text-sm text-app-subtle">
          Are you sure you want to delete {selectedCount} selected row
          {selectedCount > 1 ? 's' : ''}?
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-app-border bg-white px-4 py-2 text-sm font-medium text-app-text hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl border border-rose-600 bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
