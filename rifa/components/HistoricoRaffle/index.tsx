'use client'
import { Select } from '@/components/Select/Select'
import { Transition } from '@headlessui/react'
import { RaffleService } from '@/services/Raffle.service'
import { useEffect, useState, useCallback, FocusEvent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Transaction, TransactionService } from '@/services/transaction.service'
import TransactionInfo from '../TransactionInfo'
import dayjs from 'dayjs'
import { DateInput } from '../DateInput'

const reservationOptions = [
  { id: 'sem_filtro', label: 'Sem filtro' },
  { id: 'PENDING', label: 'Pendente' },
  { id: 'PAID', label: 'Pago' },
  { id: 'EXPIRED', label: 'Expirado' },
  { id: 'CANCELLED', label: 'Cancelado' },
]

const filters = [
  { id: 'sem_filtro', label: 'Sem filtro' },
  { id: 'ticket', label: 'Bilhete' },
  { id: 'name', label: 'Nome do comprador' },
  { id: 'email', label: 'Email do comprador' },
  { id: 'phone', label: 'Telefone do comprador' },
]

const HistoricoRaffle = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [selectedRaffle, setSelectedRaffle] = useState('Selecione uma opção')

  const [statusReservation, setStatusReservation] = useState('Sem filtro')

  const [filterOptions, setFilterOptions] = useState('Sem filtro')

  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().subtract(1, 'week'),
  )

  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs())

  const [raffleOptions, setRaffleOptions] = useState<
    { id: number; label: string }[]
  >([])

  const createQueryString = useCallback(
    (params: { [key: string]: string | number | boolean }): string => {
      return Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              value.toString(),
            )}`,
        )
        .join('&')
    },
    [],
  )

  const handleChangeStartDate = (value: dayjs.Dayjs | null) => {
    if (!value) return

    const params = new URLSearchParams(window.location.search)

    params.set('startDate', value.format('YYYY-MM-DD'))

    router.push(`${pathname}?${params}`)
  }

  const handleChangeEndDate = (value: dayjs.Dayjs | null) => {
    if (!value) return

    const params = new URLSearchParams(window.location.search)

    params.set('endDate', value.format('YYYY-MM-DD'))

    router.push(`${pathname}?${params}`)
  }

  const handleChangeBlurValue = async (event: FocusEvent<HTMLInputElement>) => {
    if (filterOptions === 'Sem filtro') return
    const value = event.target.value

    const params = new URLSearchParams(window.location.search)

    params.set(
      filters.find((value) => value.label === filterOptions)?.id ?? 'name',
      value,
    )
    router.push(`${pathname}?${params}`)
  }

  const handleChangeFilterOption = async (value: string) => {
    const params = new URLSearchParams(window.location.search)
    const oldFilter =
      filters.find((value) => value.label === filterOptions)?.id ?? 'jesus'
    params.delete(oldFilter)
    router.push(`${pathname}?${params}`)
    setFilterOptions(value)
  }

  const resetSelectValues = () => {
    setStatusReservation('Sem filtro')
    setFilterOptions('Sem filtro')
  }

  const handleChangeReservationStatus = async (value: string) => {
    setStatusReservation(value)

    const status =
      reservationOptions.find((reservation) => reservation.label === value)
        ?.id ?? '0'

    const params = new URLSearchParams(window.location.search)

    params.set('status', status)

    router.push(`${pathname}?${params}`)
  }

  const handleSelectRaffle = async (value: string) => {
    resetSelectValues()
    setSelectedRaffle(value)
    const raffle = raffleOptions.find((raffle) => raffle.label === value)

    router.push(
      `${pathname}?${createQueryString({
        raffle: raffle?.id.toString() ?? '0',
      })}`,
    )
  }

  const getRaffle = async (id: string) => {
    const response = await TransactionService.getTransactionFromRaffle(id)
    setTransactions(response.data)
  }

  useEffect(() => {
    getRaffle(searchParams.get('raffle') ?? '0')
  }, [searchParams])

  const getRaffles = useCallback(async () => {
    const response = await RaffleService.list()
    const options = response.data.map((raffle) => {
      return {
        id: raffle.id,
        label: raffle.name,
        price: raffle.price,
      }
    })
    setRaffleOptions(options)
  }, [])

  useEffect(() => {
    getRaffles()
  }, [getRaffles])

  const [isShowing, setIsShowing] = useState(false)
  return (
    <>
      <div className="container mx-auto px-5">
        <h1 className="text-title-md2 font-semibold text-black">
          Histórico de colaborações
        </h1>
      </div>
      <div className="box-border border-neutral-950 h-full w-full p-8 border rounded-lg relative top-15">
        <div className="container mx-auto flex flex-col md:flex-row">
          <span className="text-[#334155]">Selecione uma campanha</span>
        </div>
        <div className="container flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
          <div className="flex-1">
            <Select
              options={raffleOptions}
              value={selectedRaffle}
              onChange={handleSelectRaffle}
            />
          </div>
          <div>
            <button className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded-lg space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-4"
                width="16px"
                height="16px"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Dados
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsShowing((isShowing) => !isShowing)}
              className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded-lg space-x-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-4"
                height="16px"
                width="16px"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Filtros
            </button>
          </div>
        </div>
        <Transition
          show={isShowing}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <fieldset>
            <div className="flex-auto py-3">
              <label className="text-[#334155] mx-auto flex-auto">
                Status da Reserva
              </label>
              <div>
                <Select
                  options={reservationOptions}
                  value={statusReservation}
                  onChange={handleChangeReservationStatus}
                />
              </div>
              <p className="helper-info mt-1 mb-0 text-[#64748b] text-sm">
                Use o filtro para encontrar mais rápido as reservas
              </p>
            </div>
            <div className="flex-auto py-4">
              <label className="text-[#334155] mx-auto flex-auto">
                Filtro da pesquisa
              </label>
              <div>
                <Select
                  options={filters}
                  value={filterOptions}
                  onChange={handleChangeFilterOption}
                />
              </div>
              <p className="helper-info mt-1 mb-0 text-[#64748b] text-sm">
                Use esse filtro para ser específico na pesquisa
              </p>
            </div>

            <label>
              <span className="text-[#334155] mx-auto block">Pesquisa</span>
              <input
                type="text"
                onBlur={handleChangeBlurValue}
                className="block appearance-none border border-slate-300 w-full py-2 px-3 text-gray-700 leading-tight rounded focus:outline-green-300"
              />
              <p className="text-[#64748b] text-sm mt-1 mb-0">
                Este campo precisa do filtro acima.
              </p>
            </label>

            <div className="flex justify-between flex-col sm:flex-row">
              <div>
                <span>Início</span>
                <DateInput
                  value={startDate}
                  handleChange={handleChangeStartDate}
                  shouldDisableFuture
                />
              </div>

              <div>
                <span>Fim</span>
                <DateInput
                  value={endDate}
                  handleChange={handleChangeEndDate}
                  shouldDisableFuture
                />
              </div>
            </div>
          </fieldset>
        </Transition>
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <TransactionInfo key={transaction.id} transaction={transaction} />
          ))}
      </div>
    </>
  )
}

export default HistoricoRaffle
