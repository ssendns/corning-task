import useAddRowForm from '../hooks/useAddRowForm'
import Input from './Input'
import type { AddRowModalProps } from '../types/props'
import { rowTypeOptions } from '../utils/rowValidation'

function AddRowModal({ isOpen, onClose, onConfirm }: AddRowModalProps) {
  const { values, setValues, errors, handleSubmit, handleCancel } = useAddRowForm({
    onClose,
    onConfirm,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-app-border bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold text-app-text">Add new row</h2>
        <div className="mt-4 grid gap-3">
          <Input
            label="Name"
            value={values.name}
            onChange={(value) => setValues((prev) => ({ ...prev, name: value }))}
            error={errors.name}
          />

          <Input
            label="Parent ID (optional)"
            value={values.parentId}
            onChange={(value) => setValues((prev) => ({ ...prev, parentId: value }))}
          />

          <Input
            label="Radius"
            type="number"
            min="0.01"
            step="any"
            value={values.radius}
            onChange={(value) => setValues((prev) => ({ ...prev, radius: value }))}
            error={errors.radius}
          />

          <Input
            label="Type"
            type="select"
            value={values.type}
            onChange={(value) => setValues((prev) => ({ ...prev, type: value }))}
            options={rowTypeOptions.map((type) => ({ label: type, value: type }))}
            error={errors.type}
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-app-border bg-white px-4 py-2 text-sm font-medium text-app-text hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl border border-app-accent bg-app-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddRowModal
