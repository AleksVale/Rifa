'use client'
import InputLabel from '@/components/Input'
import { Metadata } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Calendar Page | Next.js E-commerce Dashboard Template',
  description: 'This is Calendar page for TailAdmin Next.js',
  // other metadata
}

const Winners = () => {
  const { register } = useForm()
  return (
    <div className="container py-6 px-14">
      <div className="flex">
        <label className="text-title-md text-stone-950">
          Informar Vencedor(es)
        </label>
      </div>
      <div className="flex items-center gap-5 mt-10">
        <Image
          src="/images/logo/logo.png"
          alt="Imagem da campanha"
          className="rounded-md object-cover w-14 h-14"
          width={10}
          height={10}
        />
        <div>
          <h2 className="font-medium text-slate-900">Sorteio</h2>
        </div>
      </div>
      <div className="w-full mt-6">
        <InputLabel
          register={register}
          errors={Error}
          label="1º número"
          name="tudo"
          placeholder="Prêmio"
        />
      </div>
      <div className="w-full mt-6">
        <InputLabel
          register={register}
          errors={Error}
          label="2º número"
          name="tudo"
          placeholder="Prêmio"
        />
      </div>
      <div className="w-full mt-6">
        <InputLabel
          register={register}
          errors={Error}
          label="3º número"
          name="tudo"
          placeholder="Prêmio"
        />
      </div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 inline-block mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        Salvar
      </button>
    </div>
  )
}

export default Winners
