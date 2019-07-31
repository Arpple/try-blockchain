import S from "sanctuary"
import { Block } from "./block"
import { Transaction } from "./transaction"
import { Arr } from "./util/array"
import { Obj } from "./util/object"

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

    const rewardTransaction = Transaction.create("", rewardAddress, chain.miningReward)

    return Obj.patch<T>({
      blocks: Arr.append(block)(chain.blocks),
      pendingTransactions: [rewardTransaction]
    })(chain)
  }

  export const addTransaction = (transaction: Transaction.T) => (chain: T): T => {
    return Obj.patch<T>({
      pendingTransactions: Arr.append(transaction)(chain.pendingTransactions)
    })(chain)
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

  const isGenesisBlock = (index: number) => index === 0

  const isValidBlock = (block: Block.T, previousBlock: Block.T) => {
    return block.hash === Block.hash(block).hash
      && block.previousHash === previousBlock.hash
  }

  export const isValid = (chain: T) => chain.blocks
    .reduce(
      (acc, curr, index) => isGenesisBlock(index)
        || (acc && isValidBlock(curr, chain[index - 1])),
      true
    )
}
