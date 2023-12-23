import http from '../hooks/http.common'

interface Ticket {
  id: number
  number: number
  status: string
  expirationDate: string | null
  createdAt: string
  updatedAt: string | null
  raffleId: number
  buyerId: number
}

export interface Buyer {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string | null
  Ticket: Ticket[]
}

export class TicketService {
  static async getBuyersFromRaffle(id: number) {
    return await http.get<Buyer[]>('ticket/raffle/' + id)
  }
}
