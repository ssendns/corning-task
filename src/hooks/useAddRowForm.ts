import { useState } from 'react'
import type { UseAddRowFormParams } from '../types/props'
import type { RowType } from '../types/row'
import {
  hasAddRowErrors,
  validateAddRow,
  type AddRowFormErrors,
  type AddRowFormValues,
} from '../utils/rowValidation'

const initialFormValues: AddRowFormValues = {
  name: '',
  parentId: '',
  radius: '',
  type: 'bubble',
}

function useAddRowForm({ onClose, onConfirm }: UseAddRowFormParams) {
  const [values, setValues] = useState<AddRowFormValues>(initialFormValues)
  const [errors, setErrors] = useState<AddRowFormErrors>({})

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

  return {
    values,
    setValues,
    errors,
    handleSubmit,
    handleCancel,
  }
}

export default useAddRowForm
