import http from '../hooks/http.common'
import { Ticket } from './Raffle.service'
import { Buyer } from './ticket.service'

export interface Transaction {
  id: number
  ammount: number
  paid: boolean
  expirationDate: string | null
  buyerId: number
  Ticket?: Ticket[]
  buyer: Buyer
}

export class TransactionService {
  static async getTransactionFromRaffle(id: string) {
    return await http.get<Transaction[]>('transaction/raffle/' + id)
  }
}
