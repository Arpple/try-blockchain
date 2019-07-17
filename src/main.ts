import S from "sanctuary"
import { Chain } from "./chain"
import { Transaction } from "./transaction"

S.pipe([
  Chain.addTransaction(Transaction.create("a", "b", 10)),
  Chain.addTransaction(Transaction.create("b", "a", 5)),
  Chain.mine("arpple"),
  Chain.getBalance("b")
])(Chain.create(2, 10)) // ?
