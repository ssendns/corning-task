import { useState } from 'react'
import type { Row, RowType } from '../types/row'
import {
  hasAddRowErrors,
  rowTypeOptions,
  validateAddRow,
  type AddRowFormErrors,
  type AddRowFormValues,
} from '../utils/rowValidation'

interface AddRowModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (row: Omit<Row, 'id'>) => void
}

const initialFormValues: AddRowFormValues = {
  name: '',
  parentId: '',
  radius: '',
  type: 'bubble',
}

function AddRowModal({ isOpen, onClose, onConfirm }: AddRowModalProps) {
  const [values, setValues] = useState<AddRowFormValues>(initialFormValues)
  const [errors, setErrors] = useState<AddRowFormErrors>({})

  if (!isOpen) return null

  const resetForm = () => {
    setValues(initialFormValues)
    setErrors({})
  }

  const handleSubmit = () => {
    const validationErrors = validateAddRow(values)
    setErrors(validationErrors)

    if (hasAddRowErrors(validationErrors)) return

    onConfirm({
      name: values.name.trim(),
      parent_id: values.parentId.trim(),
      radius: Number(values.radius),
      type: values.type as RowType,
    })
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-app-border bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold text-app-text">Add new row</h2>
        <div className="mt-4 grid gap-3">
          <label className="block">
            <span className="text-sm font-medium text-app-text">Name</span>
            <input
              type="text"
              value={values.name}
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-app-border px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-app-text">Parent ID (optional)</span>
            <input
              type="text"
              value={values.parentId}
              onChange={(event) => setValues((prev) => ({ ...prev, parentId: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-app-border px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-app-text">Radius</span>
            <input
              type="number"
              min="0.000001"
              step="any"
              value={values.radius}
              onChange={(event) => setValues((prev) => ({ ...prev, radius: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-app-border px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
            />
            {errors.radius && <p className="mt-1 text-xs text-rose-600">{errors.radius}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-app-text">Type</span>
            <select
              value={values.type}
              onChange={(event) => setValues((prev) => ({ ...prev, type: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-app-border px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
            >
              {rowTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-xs text-rose-600">{errors.type}</p>}
          </label>
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
