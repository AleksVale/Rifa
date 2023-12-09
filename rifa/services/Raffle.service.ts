import http from '../hooks/http.common'

export interface Raffle {
  id: number
  name: string
  tickets: string
  createdAt: string
}

export class RaffleService {
  static async list() {
    return await http.get<Raffle[]>('raffles')
  }
}
