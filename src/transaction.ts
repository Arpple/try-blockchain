export namespace Transaction {
  export interface T {
    readonly from: string
    readonly to: string
    readonly amount: number
  }

  export const create = (from: string, to: string, amount: number): T => ({
    from,
    to,
    amount
  })
}
