'use client'
import DropdownDefault from '@/components/Dropdowns/DropdownDefault'
import Dropdawn from '@/components/Dropdawn/Dropdawn'
import { Select } from '@/components/Select/Select'
import { useState } from 'react'

const selectOptions = [{ id: 'gato', label: 'cachorro' }]
const FilterRanking = () => {
  const [selectedRaffle, setSelectedRaffle] = useState('Selecione uma opção')

  const handleSelectRaffle = (value: string) => {
    setSelectedRaffle(value)
  }

  return (
    <>
      <div className="container mx-auto px-5">
        <h1 className="text-title-md2 font-semibold text-black">Ranking</h1>
      </div>
      <div className="box-border border-neutral-950 h-128 w-128 p-8 border rounded-lg relative top-15">
        <div className="container mx-auto flex-auto">
          <span className="text-[#334155]">Selecione uma campanha</span>
        </div>
        <div className="container flex justify-between space-x-1">
          <div className="flex-1">
            <Select
              options={selectOptions}
              value={selectedRaffle}
              onChange={handleSelectRaffle}
            />
          </div>
          <div>
            <button className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg space-x-2">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="style=linear">
                  <g id="eye-open">
                    <path
                      id="vector"
                      d="M15 12C15 13.6592 13.6592 15 12 15C10.3408 15 9 13.6592 9 12C9 10.3408 10.3408 9 12 9C13.6592 9 15 10.3408 15 12Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="vector_2"
                      d="M12 19.27C15.53 19.27 18.82 17.4413 21.11 14.2764C22.01 13.0368 22.01 10.9532 21.11 9.71356C18.82 6.54861 15.53 4.71997 12 4.71997C8.46997 4.71997 5.17997 6.54861 2.88997 9.71356C1.98997 10.9532 1.98997 13.0368 2.88997 14.2764C5.17997 17.4413 8.46997 19.27 12 19.27Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </svg>
              <span>Dados</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterRanking
