import SHA256 from "crypto-js/sha256"

export namespace Block {

  export interface T {
    readonly timestamp: number
    readonly data: any
    readonly previousHash: string
    readonly hash: string
    readonly nonce: number
  }

  export const hash = (block: T): T => ({
    ...block,
    hash: SHA256(block.previousHash
      + block.timestamp
      + JSON.stringify(block.data)
      + block.nonce
    ).toString()
  })

  export const create = (data: any): T => hash({
    timestamp: new Date().getTime(),
    data,
    previousHash: "",
    hash: "",
    nonce: 0
  })

  export const mine = (difficulty: number) => (block: T) => {
    let miningBlock = block
    while (miningBlock.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      miningBlock = Block.hash({ ...miningBlock, nonce: miningBlock.nonce + 1 })
    }

    console.log("mined: " + miningBlock.hash)
  }
}
