import { Block } from "./block"

export namespace Chain {

  export interface T {
    readonly blocks: Block.T[]
    readonly difficulty: number
  }

  export const create = (difficulty: number): T => ({
    blocks: [Block.create("Genesis Block")],
    difficulty
  })

  export const getLastestBlock = (chain: T): Block.T => {
    return chain.blocks[chain.blocks.length - 1]
  }

  export const addBlock = (block: Block.T) => (chain: T): T => {
    Block.mine(chain.difficulty)(block)

    const newBlock: Block.T = {
      ...block,
      previousHash: getLastestBlock(chain).hash
    }

    return {
      ...chain,
      blocks: [...chain.blocks, Block.hash(newBlock)]
    }
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
