import S from "sanctuary"
import { Block } from "./block"
import { Chain } from "./chain"

const genesisBlock = Block.create(0, new Date("1990-01-01").getTime(), "Genesis Block")
const myChain = S.pipe([
  Chain.addBlock(Block.create(1, new Date().getTime(), { amount: 10 })),
  Chain.addBlock(Block.create(2, new Date().getTime(), { amount: 20 }))
])([genesisBlock])

Chain.isValid(myChain) // ?
