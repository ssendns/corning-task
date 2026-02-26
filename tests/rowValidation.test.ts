import { describe, expect, it } from 'vitest'
import { validateAddRow } from '../src/utils/rowValidation'

describe('validateAddRow', () => {
  it('returns error when name is empty', () => {
    const errors = validateAddRow({
      name: '   ',
      parentId: '',
      radius: '1.2',
      type: 'bubble',
    })

    expect(errors.name).toBeDefined()
  })

  it('returns error when radius is not greater than zero', () => {
    const errors = validateAddRow({
      name: 'Row X',
      parentId: '',
      radius: '0',
      type: 'bubble',
    })

    expect(errors.radius).toBeDefined()
  })

  it('returns error when type is invalid', () => {
    const errors = validateAddRow({
      name: 'Row X',
      parentId: '',
      radius: '1.5',
      type: 'other',
    })

    expect(errors.type).toBeDefined()
  })

  it('returns no errors for valid data', () => {
    const errors = validateAddRow({
      name: 'Row X',
      parentId: '',
      radius: '2.75',
      type: 'crack',
    })

    expect(errors).toEqual({})
  })
})
