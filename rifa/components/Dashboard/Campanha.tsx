'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaTicket, FaFaceSadCry } from 'react-icons/fa6'
import { Select } from '../Select/Select'
import { Raffle, RaffleService } from '@/services/Raffle.service'
import { RaffleInfo } from '../RaffleInfo'

const Campanha: React.FC = () => {
  const [raffles, setRaffles] = React.useState<Raffle[]>([])
  const [raffleStatus, setRaffleStatus] = React.useState('Em andamento')

  const getRaffles = async (status: 'active' | 'finished') => {
    const response = await RaffleService.list(status)
    setRaffles(response.data)
  }

  const handleChangeSelect = (value: string) => {
    setRaffleStatus(value)
    getRaffles(value === 'Em andamento' ? 'active' : 'finished')
  }
  useEffect(() => {
    getRaffles('active')
  }, [])
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-xl sm:text-xl font-light flex gap-2">
        <div className="animate-waving-hand">👋🏽</div> Olá,{' '}
        <span>
          <span className="font-medium">Aleks</span>!
        </span>
      </h2>
      {raffles.length > 0 && (
        <div className="flex sm:block justify-center">
          <a
            className="py-2 px-6 border inline-flex bg-white gap-2 items-center mt-6 rounded-lg shadow-sm text-sm font-medium"
            href="admin/raffles/create"
          >
            <FaTicket size="20" color="rgb(83 102 8)" />
            CRIAR CAMPANHA{' '}
          </a>
        </div>
      )}
      <h2 className="mt-4 text-xl flex gap-2 items-center text-zinc-800">
        <FaTicket size="24px" color="#536654" /> Minhas campanhas
      </h2>
      <p className="text-gray-500 mt-2 text-sm">
        Aqui estão suas campanhas criadas.
      </p>
      <div className="pt-2 pb-4">
        <Select
          value={raffleStatus}
          onChange={handleChangeSelect}
          options={[
            {
              id: 'andamento',
              label: 'Em andamento',
            },
            { id: 'finish', label: 'Encerrada' },
          ]}
        />
      </div>
      {raffles.length > 0 ? (
        raffles.map((raffle) => (
          <div key={raffle.id} className="pb-2">
            <RaffleInfo raffle={raffle} />
          </div>
        ))
      ) : (
        <div className="max-w-full rounded-xl mt-6 overflow-hidden shadow-lg bg-white">
          <div className="px-10 py-6">
            <div className="mb-2 text-center flex items-center flex-col">
              <FaFaceSadCry size="64" />
              <p className="text-sm pt-1">Não há Campanhas</p>
            </div>
            <div className="flex justify-center">
              <Link
                className="text-white font-semibold hover:scale-105 px-8 py-2 flex gap-2 items-center rounded-lg bg-black-2 mt-2 "
                href="admin/raffles/create"
              >
                <FaTicket className="text-white" size="24" />
                CRIAR CAMPANHA{' '}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Campanha
