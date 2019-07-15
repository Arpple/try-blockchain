import { Block } from "./block"

export namespace Chain {

  export type T = Block.T[]

  export const getLastestBlock = (chain: Block.T[]): Block.T => {
    return chain[chain.length - 1]
  }

  export const addBlock = (block: Block.T) => (chain: T): T => {
    const lastBlock = getLastestBlock(chain)
    Block.mine(2)(block)
    const newBlock: Block.T = { ...block, previousHash: lastBlock.hash }
    return [...chain, Block.hash(newBlock)]
  }

  export const isValid = (chain: T) => chain.reduce((prev, curr, index) => {
    return index === 0
      || (
        prev
        && curr.hash === Block.hash(curr).hash
        && curr.previousHash === chain[index - 1].hash
      )
  }, true)
}
