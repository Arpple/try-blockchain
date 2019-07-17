import SHA256 from "crypto-js/sha256"
import { Transaction } from "./transaction"

export namespace Block {

  export interface T {
    readonly timestamp: number
    readonly transactions: Transaction.T[]
    readonly previousHash: string
    readonly hash: string
    readonly nonce: number
  }

  export const hash = (block: T): T => ({
    ...block,
    hash: SHA256(block.previousHash
      + block.timestamp
      + JSON.stringify(block.transactions)
      + block.nonce
    ).toString()
  })

  export const create = (transactions: Transaction.T[]): T => hash({
    timestamp: new Date().getTime(),
    transactions,
    previousHash: "",
    hash: "",
    nonce: 0
  })

  export const mine = (difficulty: number) => (block: T): T => {
    let miningBlock = block
    while (miningBlock.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      miningBlock = Block.hash({ ...miningBlock, nonce: miningBlock.nonce + 1 })
    }

    return block
  }
}
