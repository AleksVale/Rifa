'use client'
import React from 'react'
import { Metadata } from 'next'
import InputLabel from '@/components/Input'
import { Select } from '@/components/Select/Select'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Date } from '@/components/Date/Date'
import Toggle from '@/components/Toggle/Toggle'

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is the login page',
  // other metadata
}

const Edit = () => {
  const { register } = useForm()
  return (
    <>
      <div className="container min-h-full">
        <div className="flex-grow">
          <div className="flex justify-between items-center gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl">
              <i className=""></i>
              <span className="ml-1">Editando: Sorteio</span>
            </h1>
          </div>
          <form className="mt-8">
            <InputLabel
              register={register}
              errors={Error}
              label="Nome"
              name="tudo"
              placeholder="Sorteio"
            />
            <div className="mt-8">
              <label className="block text-gray-700 text-sm font-bold mb-1 mt-3">
                Modelo
                <span className="text-[#880808]">*</span>
              </label>
              <Select
                options={[
                  {
                    id: '20',
                    label: 'Cliente escolhe os bilhetes manualmente',
                  },
                  {
                    id: '21',
                    label: 'Sistema escolhe os bilhetes aleatóriamente',
                  },
                ]}
              />
              <div className="flex align-center justify-center items-center border-2 border-gray-300 rounded-lg mt-6 p-2">
                <Image
                  src="/images/gif/gif.gif"
                  alt="✅ Sistema escolhe os bilhetes"
                  width={200}
                  height={50}
                />
              </div>
              <div>
                <label className="label">
                  Descrição / Regulamento{' '}
                  <div className="inline-block">
                    <div className="mt-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 translate-y-[20%] text-gray-4 00"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <textarea
                  id="description"
                  className="w-full border-2 border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 overflow-auto"
                  placeholder="Insira o texto aqui..."
                ></textarea>
              </div>
              <div className="flex gap-1">
                <label className="label">Imagens</label>
                <div className="inline-flex items-center px-2 py-0.5 default-radius text-xs font-medium bg-green-100 text-green-800">
                  <b className="mr-1">Tamanho recomendado: </b> 1365x758 pixels{' '}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1 mt-3 border-2 border-gray-300 rounded-md p-2">
                  Imagem
                  <input
                    type="file"
                    accept="image/*"
                    className="text-sm text-gray-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-blue-100"
                  />
                </label>
              </div>
              <div className="flex space-x-7  ">
                <InputLabel
                  register={register}
                  errors={Error}
                  label="Quantidade minima de bilhetes por compra"
                  name="Teste1"
                  placeholder="1"
                  className="flex-auto"
                />

                <InputLabel
                  register={register}
                  errors={Error}
                  label="Quantidade maxima de bilhetes por compra"
                  name="Teste2"
                  placeholder="300"
                  className="flex-auto"
                />
              </div>
              <label className="label">
                Data de sorteio{' '}
                <div className="inline-block mt-3">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 translate-y-[20%] text-gray-4 00"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </label>
              <Date />
              <Toggle />
              <label className="label">
                Data de sorteio{' '}
                <div className="inline-block mt-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 translate-y-[20%] text-gray-4 00"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </label>
              <Select
                options={[
                  {
                    id: '25',
                    label: ' 1 hora',
                  },
                  {
                    id: '26',
                    label: '3 horas',
                  },
                  {
                    id: '27',
                    label: '1 dia',
                  },
                ]}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit
