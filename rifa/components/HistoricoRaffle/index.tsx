'use client'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Image from 'next/image'

import { Select } from '@/components/Select/Select'
import DropdownDefault from '@/components/Dropdowns/DropdownDefault'
import Dropdawn from '@/components/Dropdawn/Dropdawn'
import { Transition } from '@headlessui/react'
import { useState } from 'react'

const selectOptions = [{ id: 'gato', label: 'cachorro' }]

const HistoricoRaffle = () => {
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
          <label className="text-[#334155]">Selecione uma campanha</label>
        </div>
        <div className="container flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
          <div className="flex-1">
            <Select options={selectOptions} />
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
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
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
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
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
                <Select options={selectOptions} />
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
                <Select options={selectOptions} />
              </div>
              <p className="helper-info mt-1 mb-0 text-[#64748b] text-sm">
                Use esse filtro para ser específico na pesquisa
              </p>
            </div>
          </fieldset>
        </Transition>
      </div>
    </>
  )
}

export default HistoricoRaffle
