import { CreateRaffleInput } from '@/app/admin/raffles/create/page'
import http from '../hooks/http.common'

export interface Raffle {
  id: number
  name: string
  ticketLimit: number
  price: number
  description: string
  tickets: string
  createdAt: string
}

interface CreateRaffleDTO {
  name: string
  ticketLimit: number
  price: number
}

export class RaffleService {
  static async list() {
    return await http.get<Raffle[]>('raffles')
  }

  static async create(data: CreateRaffleDTO) {
    return await http.post<Raffle>('raffles', data)
  }

  static async get(id: string) {
    return (await http.get<Raffle>(`raffles/${id}`)).data
  }
}
