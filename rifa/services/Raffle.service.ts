import { CreateRaffleInput } from '@/app/admin/raffles/create/page'
import http from '../hooks/http.common'

export interface Ticket {
  id: number
  name: string
  email: string
  phone: string
  number: number
  status: string
  expirationDate: string
  createdAt: string
  updatedAt?: string | null
  raffleId: number
}

export interface Prize {
  id: number
  name: string
  place: number
  createdAt: string
  updatedAt?: string | null
  raffleId: number
}

export interface Promotion {
  id: number
  quantity: number
  price: number
  createdAt: string
  updatedAt?: string | null
  raffleId: number
}

export interface Winner {
  id: number
  name: string
  email: string
  phone: string
  number: number
  createdAt: string
  updatedAt?: string | null
  raffleId: number
}

export interface RaffleImage {
  id: number
  name: string
  url: string
  createdAt: string
  updatedAt: string
  raffleId: number
}
export interface Raffle {
  id: number
  name: string
  ticketLimit: number
  price: number
  description?: string | null
  minTickets?: number | null
  maxTickets?: number | null
  showRanking?: boolean | null
  drawingDate?: string | null
  timeToPay?: string | null
  createdAt: string
  updatedAt?: string | null
  tickets: Ticket[]
  Prize: Prize[]
  Promotion: Promotion[]
  Winner?: Winner | null
  RaffleImage: RaffleImage[]
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

  static async update(data: any, id: string, images: File[] | null) {
    if (images) {
      this.updatePhotos(id, images)
    }
    return (await http.patch<{ success: boolean }>(`raffles/${id}`, data)).data
  }

  static async updatePhotos(id: string, images: File[]) {
    const formData = new FormData()

    images.forEach((image) => {
      formData.append(`files`, image)
    })
    return (
      await http.patch<{ success: boolean }>(`raffles/${id}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data
  }

  static async get(id: string) {
    return (await http.get<Raffle>(`raffles/${id}`)).data
  }
}
