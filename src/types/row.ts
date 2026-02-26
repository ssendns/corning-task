export type RowType = 'bubble' | 'crack' | 'scratch'

export interface Row {
  id: string
  parent_id: string
  name: string
  radius: number
  type: RowType
}
