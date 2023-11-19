'use client'
import Link from 'next/link'
import React from 'react'
import { FaTriangleExclamation, FaTicket } from 'react-icons/fa6'
import Autocomplete from '../Autocomplete/Autocomplete'
import { Select } from '../Select/Select'

const Campanha: React.FC = () => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-xl sm:text-xl font-light flex gap-2">
        <div className="animate-waving-hand">👋🏽</div> Olá,{' '}
        <span>
          <span className="font-medium">Aleks</span>!
        </span>
      </h2>
      <div className="bg-black-2 rounded-lg text-lg text-white mt-14 font-medium">
        <Link
          href={'/admin#pagamento'}
          className="p-5  items-center flex gap-4"
        >
          <FaTriangleExclamation className="text-xl text-white" />
          <span>
            Você ainda não possui nenhum meio de pagamento para receber o valor
            das reservas.{' '}
            <span className="font-medium">Clique aqui para configurar!</span>
          </span>
        </Link>
      </div>
      <h2 className="mt-4 text-xl flex gap-2 items-center text-zinc-800">
        <FaTicket size="24px" color="#536654" /> Minhas campanhas
      </h2>
      <p className="text-gray-500 mt-2 text-sm">
        Aqui estão suas campanhas criadas.
      </p>
      <div>
        <Select
          options={[
            {
              id: 'andamento',
              label: 'Em andamento',
            },
            { id: 'finish', label: 'Encerrada' },
          ]}
        />
      </div>
    </div>
  )
}

export default Campanha
