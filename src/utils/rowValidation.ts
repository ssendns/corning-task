import type { RowType } from '../types/row'

export interface AddRowFormValues {
  name: string
  parentId: string
  radius: string
  type: string
}

export interface AddRowFormErrors {
  name?: string
  radius?: string
  type?: string
}

export const rowTypeOptions: RowType[] = ['bubble', 'crack', 'scratch']

export const validateAddRow = (values: AddRowFormValues): AddRowFormErrors => {
  const errors: AddRowFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  const radiusValue = Number(values.radius)
  if (!values.radius.trim() || Number.isNaN(radiusValue) || radiusValue <= 0) {
    errors.radius = 'Radius must be a number greater than 0.'
  }

  if (!rowTypeOptions.includes(values.type as RowType)) {
    errors.type = 'Type must be bubble, crack, or scratch.'
  }

  return errors
}

export const hasAddRowErrors = (errors: AddRowFormErrors) => Object.keys(errors).length > 0
