export interface ServiceMessage {
  type: string
  variant?: string
  toggle: boolean
  data: unknown
}
