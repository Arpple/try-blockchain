import S from "sanctuary"
import { Block } from "./block"
import { Chain } from "./chain"

const myChain = S.pipe([
  Chain.addBlock(Block.create({ amount: 10 })),
  Chain.addBlock(Block.create({ amount: 20 }))
])(Chain.create(2))

Chain.isValid(myChain) // ?
