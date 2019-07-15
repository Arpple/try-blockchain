import S from "sanctuary"
import { Block } from "./block"
import { Chain } from "./chain"

const genesisBlock = Block.create("Genesis Block")
const myChain = S.pipe([
  Chain.addBlock(Block.create({ amount: 10 })),
  Chain.addBlock(Block.create({ amount: 20 }))
])([genesisBlock])

Chain.isValid(myChain) // ?
