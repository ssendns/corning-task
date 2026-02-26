import { useMemo, useState } from 'react'
import type { UseRowEditingParams } from '../types/props'
import type { Row } from '../types/row'
import {
  validateEditRow,
  type EditRowFormErrors,
  type EditRowFormValues,
} from '../utils/rowValidation'

function useRowEditing({ rows, onCommit }: UseRowEditingParams) {
  const [editingRowIdState, setEditingRowId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<EditRowFormValues>({
    name: '',
    parent_id: '',
    radius: '',
    type: 'bubble',
  })
  const [editErrors, setEditErrors] = useState<EditRowFormErrors>({})

  const editingRowId = useMemo(() => {
    if (!editingRowIdState) return null
    return rows.some((row) => row.id === editingRowIdState) ? editingRowIdState : null
  }, [editingRowIdState, rows])

  const startEdit = (row: Row) => {
    setEditingRowId(row.id)
    setEditValues({
      name: row.name,
      parent_id: row.parent_id,
      radius: String(row.radius),
      type: row.type,
    })
    setEditErrors({})
  }

  const cancelEdit = () => {
    setEditingRowId(null)
    setEditErrors({})
  }

  const changeEditValue = (field: keyof EditRowFormValues, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }))
    setEditErrors((prev) => {
      if (!prev[field as keyof EditRowFormErrors]) return prev
      const next = { ...prev }
      delete next[field as keyof EditRowFormErrors]
      return next
    })
  }

  const saveEdit = () => {
    if (!editingRowId) return

    const validationErrors = validateEditRow(editValues)
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors)
      return
    }

    onCommit(editingRowId, {
      name: editValues.name.trim(),
      parent_id: editValues.parent_id.trim(),
      radius: Number(editValues.radius),
      type: editValues.type as Row['type'],
    })

    setEditingRowId(null)
    setEditErrors({})
  }

  return {
    editingRowId,
    editValues,
    editErrors,
    startEdit,
    cancelEdit,
    changeEditValue,
    saveEdit,
  }
}

export default useRowEditing
