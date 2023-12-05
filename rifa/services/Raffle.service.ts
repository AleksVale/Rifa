import http from '../hooks/http.common'

export interface Raffle {
  id: number
  name: string
  tickets: string
  createdAt: string
}
export interface GameResponse {
  history: Raffle[]
}

export class RaffleService {
  static async list() {
    return await http.get<GameResponse>('/raffles')
  }
}
