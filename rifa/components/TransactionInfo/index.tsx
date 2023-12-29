import { Transaction } from '@/services/transaction.service'
import { Fragment } from 'react'
import TailwindBadge from '../TailwindBadge'
import {
  FaCalendar,
  FaCircleDollarToSlot,
  FaEllipsisVertical,
  FaEnvelope,
  FaTicket,
  FaUser,
} from 'react-icons/fa6'
import { Menu, Transition } from '@headlessui/react'
import dayjs from 'dayjs'

interface TransactionInfoProps {
  transaction: Transaction
  showSensitiveData: boolean
}

export default function TransactionInfo({
  transaction,
  showSensitiveData,
}: TransactionInfoProps) {
  const isPending = !transaction.paid
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
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-slate-100 bg-white/20 px-2 py-1 text-sm font-medium hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <FaEllipsisVertical />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="relative ">
        <div className="mt-1 text-gray-500 flex flex-col sm:flex-row flex-wrap items-start gap-x-4 gap-y-2 z-9 border-b border-b-slate-400 pb-2">
          {showSensitiveData && (
            <>
              <span className="inline-flex flex-wrap items-center gap-x-1.5">
                <FaUser color="gray" size={14} />
                Nome {transaction.buyer.name}
              </span>
              <span className="inline-flex flex-wrap items-center gap-x-1.5">
                <FaEnvelope color="gray" size={14} />
                Email {transaction.buyer.email}
              </span>
            </>
          )}
          <span className="inline-flex items-center gap-1.5">
            <FaCircleDollarToSlot />
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(transaction.value)}
          </span>

          <span className="inline-flex flex-wrap items-center gap-x-1.5">
            <FaTicket color="gray" size={18} /> {transaction.amount} bilhetes
          </span>

          <span className="inline-flex items-center gap-1.5">
            <FaCalendar />
            Criada em {dayjs(transaction.createdAt).format('DD/MM/YYYY, hh:mm')}
          </span>
          {transaction.updatedAt && transaction.status !== 'PENDING' && (
            <span className="inline-flex items-center gap-1.5">
              <FaCalendar />
              Atualizada em{' '}
              {dayjs(transaction.updatedAt).format('DD/MM/YYYY, hh:mm')}
            </span>
          )}
        </div>
        <hr className="my-3.5 block sm:hidden" />
        <div className="mt-3 text-gray-500 flex flex-wrap items-start gap-x-4 gap-y-1.5">
          {transaction.Ticket?.map((ticket) => (
            <span key={ticket.id} className="inline-flex items-center gap-1.5">
              <TailwindBadge
                color={isPending ? 'yellow' : 'green'}
                text={`${ticket.number}`}
              />
            </span>
          ))}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 max-h-48 overflow-y-auto pb-2">
        {/* Add your dynamic badges or elements here */}
      </div>
    </div>
  )
}
