import S from "sanctuary"
import { Block } from "./block"
import { Transaction } from "./transaction"

export namespace Chain {

  export interface T {
    readonly pendingTransactions: Transaction.T[]
    readonly blocks: Block.T[]
    readonly difficulty: number
    readonly miningReward: number
  }

  export const create = (difficulty: number, miningReward: number): T => ({
    blocks: [Block.create([])],
    pendingTransactions: [],
    difficulty,
    miningReward
  })

  export const getLastestBlock = (chain: T): Block.T => {
    return chain.blocks[chain.blocks.length - 1]
  }

  export const mine = (rewardAddress: string) => (chain: T): T => {
    const block = S.pipe([
      Block.create,
      Block.mine(chain.difficulty)
    ])(chain.pendingTransactions)

    return {
      ...chain,
      blocks: [...chain.blocks, block],
      pendingTransactions: [Transaction.create("", rewardAddress, chain.miningReward)]
    }
  }

  export const addTransaction = (transaction: Transaction.T) => (chain: T): T => {
    return {
      ...chain,
      pendingTransactions: [...chain.pendingTransactions, transaction]
    }
  }

  const sumBlockBalance = (address: string) => (block: Block.T): number => {
    return block.transactions.reduce((acc, curr) => {
      if (address === curr.from) {
        return acc - curr.amount
      }

      if (address === curr.to) {
        return acc + curr.amount
      }

      return acc
    }, 0)
  }

  export const getBalance = (address: string) => (chain: T): number => {
    return chain.blocks.reduce((acc, curr) => {
      return acc + sumBlockBalance(address)(curr)
    }, 0)
  }

  export const isValid = (chain: T) => chain.blocks
    .reduce(
      (prev, curr, index) =>
        index === 0
        || (
          prev
          && curr.hash === Block.hash(curr).hash
          && curr.previousHash === chain[index - 1].hash
        ),
      true)
}
