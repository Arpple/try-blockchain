import SHA256 from "crypto-js/sha256"
import S from "sanctuary"

interface Block {
  readonly index: number
  readonly timestamp: number
  readonly data: any
  readonly previousHash: string
  readonly hash: string
}

type Chain = Block[]

const hashBlock = (block: Block): Block => {
  return {
    ...block,
    hash: SHA256(block.index
      + block.previousHash
      + block.timestamp
      + JSON.stringify(block.data)
    ).toString()
  }
}

const createBlock = (index: number, timestamp: number, data: any): Block => {
  return hashBlock({ index, timestamp, data, previousHash: "", hash: "" })
}


const getLastestBlock = (chain: Block[]): Block => {
  return chain[chain.length - 1]
}

const addBlock = (block: Block) => (chain: Chain): Chain => {
  const lastBlock = getLastestBlock(chain)
  const newBlock: Block = { ...block, previousHash: lastBlock.hash }
  return [...chain, hashBlock(newBlock)]
}

const isChainValid = (chain: Chain) => chain.reduce((prev, curr, index) => {
  return index === 0
    || (
      prev
      && curr.hash === hashBlock(curr).hash
      && curr.previousHash === chain[index - 1].hash
    )
}, true)


const genesisBlock = createBlock(0, new Date("1990-01-01").getTime(), "Genesis Block")
const myChain = S.pipe([
  addBlock(createBlock(1, new Date().getTime(), { amount: 10 })),
  addBlock(createBlock(2, new Date().getTime(), { amount: 20 }))
])([genesisBlock])

isChainValid(myChain) // ?

myChain[1].data = { amount: 10000 }
myChain[1] = hashBlock(myChain[1])

isChainValid(myChain) // ?
