import { Ticket } from '@/services/Raffle.service'
import { Buyer } from '@/services/ticket.service'
import { Transaction } from '@/services/transaction.service'
import React from 'react'
import TailwindBadge from '../TailwindBadge'

interface TransactionInfoProps {
  transaction: Transaction
}

export default function TransactionInfo({ transaction }: TransactionInfoProps) {
  const isPending = !transaction.paid
  const ticketCount = transaction.Ticket?.length ?? 0

  return (
    <div className="px-4 sm:px-6 py-4 text-sm">
      <div className="flex items-center justify-between gap-x-4">
        <div className="font-medium">
          <span className="uppercase mr-2.5 text-green-600">
            {transaction.buyer.name}
          </span>
          <TailwindBadge
            color={isPending ? 'yellow' : 'green'}
            text={isPending ? 'Pendente' : 'Pago'}
          />
        </div>
        <div data-headlessui-state="" className="relative">
          <button
            className="button px-2"
            aria-haspopup="true"
            aria-expanded="false"
            type="button"
          >
            {/* Add your button content or icon here */}
          </button>
          {/* Add your dropdown content here */}
        </div>
      </div>
      <div className="relative">
        <hr className="my-3.5 block sm:hidden" />
        <div className="mt-1 text-gray-500 flex flex-col sm:flex-row flex-wrap items-start gap-x-4 gap-y-1.5">
          {/* Add your dynamic information here */}
          <span className="inline-flex items-center gap-1.5">
            {/* Add your icon and dynamic value here */}
          </span>
          <span className="inline-flex flex-wrap items-center gap-x-1.5">
            {/* Add your icon and dynamic value here */}
          </span>
          {/* Add more dynamic information here */}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 max-h-48 overflow-y-auto pb-2">
        {/* Add your dynamic badges or elements here */}
      </div>
    </div>
  )
}
