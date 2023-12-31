'use client'
import React from 'react'
import { FaTicket, FaArrowRightLong } from 'react-icons/fa6'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputLabel from '@/components/Input'
import { Select } from '@/components/Select/Select'
import CurrencyInput from 'react-currency-input-field'
import { RaffleService } from '@/services/Raffle.service'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/Loading'

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  quantityTickets: z.string({
    required_error: 'Quantidade de bilhetes é obrigatório',
  }),
  valueTicket: z.number().min(0.1, { message: 'Value must be at least 0.1' }),
})

export type CreateRaffleInput = z.infer<typeof schema>
const CreateRaffle: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateRaffleInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      valueTicket: 0.4,
    },
  })
  const onSubmit: SubmitHandler<CreateRaffleInput> = async (data) => {
    const raffle = {
      name: data.name,
      ticketLimit: Number(data.quantityTickets.split(' ')[0]),
      price: data.valueTicket,
    }
    const response = await RaffleService.create(raffle)

    router.push(`/admin/raffles/${response.data.id}/edit`)
  }

  return (
    <div className="flex-grow">
      <Loading isLoading={isSubmitting} />
      <div className="py-8 px-4 sm:px-8 container">
        <h1 className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
          <FaTicket size="40" /> <span className="ml-1">Criar Campanha</span>
        </h1>
      </div>
      <form className="px-4 sm:px-8" onSubmit={handleSubmit(onSubmit)}>
        <InputLabel
          errors={errors}
          register={register}
          label="Nome da campanha"
          name="name"
          placeholder="Nome da sua campanha"
        />
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1 mt-3"
            htmlFor={'quantityTickets'}
          >
            Quantidade de bilhetes
          </label>
          <Controller
            name="quantityTickets"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={errors.quantityTickets?.message}
                onChange={(value) => field.onChange(value)}
                options={[
                  { id: '1', label: '25 bilhetes - (00 à 24)' },
                  { id: '2', label: '50 bilhetes - (00 à 49)' },
                  { id: '3', label: '100 bilhetes - (00 à 99)' },
                  { id: '4', label: '200 bilhetes - (000 à 199)' },
                  { id: '5', label: '300 bilhetes - (000 à 299)' },
                  { id: '6', label: '400 bilhetes - (000 à 399)' },
                  { id: '7', label: '500 bilhetes - (000 à 499)' },
                  { id: '8', label: '600 bilhetes - (000 à 599)' },
                  { id: '9', label: '1000 bilhetes - (0000 à 0999)' },
                  { id: '10', label: '2000 bilhetes - (0000 à 1999)' },
                  { id: '11', label: '3000 bilhetes - (0000 à 2999)' },
                  { id: '12', label: '4000 bilhetes - (0000 à 3999)' },
                  { id: '13', label: '5000 bilhetes - (0000 à 4999)' },
                  { id: '14', label: '6000 bilhetes - (0000 à 5999)' },
                  { id: '15', label: '10000 bilhetes - (0000 à 15999)' },
                  { id: '16', label: '20000 bilhetes - (00000 à 25999)' },
                  { id: '17', label: '30000 bilhetes - (00000 à 35999)' },
                  { id: '18', label: '50000 bilhetes - (00000 à 85999)' },
                  { id: '19', label: '100000 bilhetes - (00000 à 185999)' },
                  { id: '28', label: '1000000 bilhetes - (0000000 à 1985999)' },
                ]}
              />
            )}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1 mt-3"
            htmlFor={'valueTicket'}
          >
            Valor do bilhete
          </label>
          <Controller
            name="valueTicket"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CurrencyInput
                id="valueTicket"
                name="valueTicket"
                placeholder="Valor do bilhete"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={0.4}
                decimalsLimit={2}
                onValueChange={(value, name, values) =>
                  field.onChange(values?.float)
                }
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
              />
            )}
          />
        </div>
        <button
          className="flex items-center mt-8 bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          <div className=" flex gap-2 items-center w-full text-sm">
            {' '}
            Prosseguir <FaArrowRightLong />
          </div>
        </button>
      </form>
    </div>
  )
}

export default CreateRaffle
