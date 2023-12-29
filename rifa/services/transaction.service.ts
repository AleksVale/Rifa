import http from '../hooks/http.common'
import { Ticket } from './Raffle.service'
import { Buyer } from './ticket.service'

export interface Transaction {
  id: number
  amount: number
  value: number
  paid: boolean
  status: 'PAID' | 'CANCELLED' | 'PENDING' | 'EXPIRED'
  expirationDate: string | null
  buyerId: number
  createdAt: string
  updatedAt: string
  Ticket?: Ticket[]
  buyer: Buyer
}

export class TransactionService {
  static async getTransactionFromRaffle(id: string) {
    return await http.get<Transaction[]>(
      'transaction/raffle/' + id + window.location.search,
    )
  }
}
