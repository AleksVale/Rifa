import { Raffle, Ticket } from '@/services/Raffle.service'
import React from 'react'
import DropDownMenu from '../DropdownMenu'

interface RaffleInfoProps {
  raffle: Raffle
}

export function RaffleInfo({ raffle }: Readonly<RaffleInfoProps>) {
  const calculatePercentage = (purchased: number, total: number) => {
    return (purchased / total) * 100
  }

  const purchasedTickets = raffle.tickets.filter(
    (ticket) => ticket.status.toLowerCase() === 'paid',
  ).length

  const reservedTickets = raffle.tickets.filter(
    (ticket) => ticket.status.toLowerCase() === 'pending',
  ).length

  const percentagePurchased = calculatePercentage(
    purchasedTickets,
    raffle.ticketLimit,
  )
  const percentageReserved = calculatePercentage(
    reservedTickets,
    raffle.ticketLimit,
  )
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex p-4 justify-between items-center bg-slate-50">
        <span>FOTO DA CAMPANHA</span>
        <DropDownMenu raffle={raffle} />
      </div>
      <div className="p-4">
        <p>{raffle.name}</p>
        <div className="border bg-gray-50 rounded-lg h-3 overflow-hidden relative mt-1">
          <div
            style={{
              width: `${percentageReserved}%`,
              right: `calc(${100 - percentageReserved}%)`,
              zIndex: 2,
            }}
            className="w-full h-full absolute default-transition rounded-r-lg bg-orange-500"
          ></div>
          <div
            style={{
              width: `${percentagePurchased}%`,
              right: `calc(${100 - percentagePurchased}%)`,
            }}
            className="w-full h-full absolute default-transition rounded-r-lg bg-green-500"
          ></div>
        </div>
        <p className="text-right mt-1 text-sm text-slate-500">
          {percentagePurchased.toFixed(2)}% de {raffle.ticketLimit} tickets
        </p>
        <p className="text-right mt-1 text-sm"></p>
        <div className="flex mt-6 flex-wrap gap-2 text-sm">
          <button className="px-4 badge text-white bg-blue-500 flex items-center gap-2 rounded-lg">
            <span> ARRECADOU </span>
          </button>
          <div className="px-4 badge text-white bg-green-500 rounded-lg">
            PAGOS: <span>{purchasedTickets}</span>
          </div>
          <div className="px-4 badge text-white bg-orange-500 rounded-lg">
            RESERVADOS: <span>{reservedTickets}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
