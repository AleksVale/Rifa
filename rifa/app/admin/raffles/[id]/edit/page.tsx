'use client'
import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { FaTicket, FaArrowRightLong, FaCloudArrowUp } from 'react-icons/fa6'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputLabel from '@/components/Input'
import { Select } from '@/components/Select/Select'
import { RaffleService } from '@/services/Raffle.service'
import { useParams, useRouter } from 'next/navigation'
import Toggle from '@/components/Toggle/Toggle'
import { DateCalendar } from '@/components/Date/Date'
import Image from 'next/image'
import MyModal from '@/components/Mydialog/MyDialog'
import PromotionModal from '@/components/Mydialoginput/MyDialogInput'
import dayjs from 'dayjs'
import EditFile from '@/components/EditFile'

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' }),
  minTickets: z.string(),
  maxTickets: z.number(),
  timeToPay: z.string().min(1, { message: 'Time to pay must be at least 1' }),
  drawingDate: z.any(),
  hasSortDay: z.boolean(),
  showRanking: z.boolean(),
  promotions: z.array(
    z.object({
      quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
      price: z.number().min(1, { message: 'Value must be at least 1' }),
    }),
  ),
  prizes: z.array(
    z.object({
      place: z.number().min(1, { message: 'Place must be at least 1' }),
      name: z.string(),
    }),
  ),
})

export type CreateRaffleInput = z.infer<typeof schema>
const EditRaffle: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateRaffleInput>({
    resolver: zodResolver(schema),
  })

  const [files, setFiles] = React.useState<File[] | null>(null)

  const watchName = watch('name', 'Carregando')

  const watchHasSortDay = watch('hasSortDay', false)

  const { id } = useParams()

  const router = useRouter()

  const onSubmit: SubmitHandler<CreateRaffleInput> = async (data) => {
    const conteudoHTML = data.description
      .split('\n')
      .map((line) => `<p>${line}</p>`)
      .join('')
    const { hasSortDay, ...raffles } = data
    const raffle = {
      ...raffles,
      description: conteudoHTML,
      minTickets: Number(data.minTickets),
      drawingDate: data.hasSortDay ? data.drawingDate.toDate() : null,
    }
    const response = await RaffleService.update(raffle, id as string, files)
    response.success && router.push('/admin')
  }

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log(files)
    setFiles(Array.from(files ?? []))
  }

  const handleDeletePhoto = (index: number) => {
    setFiles((value) =>
      value && value.length > 1
        ? [...value.slice(0, index), ...value.slice(index + 1)]
        : null,
    )
  }

  const getRaffle = useCallback(async () => {
    const response = await RaffleService.get(id as string)
    reset({
      ...response,
      hasSortDay: !!response.drawingDate,
      description:
        response.description?.replace(/<p>/g, '').replace(/<\/p>/g, '\n') ?? '',
      minTickets: `${response.minTickets}`,
      maxTickets: response.maxTickets ?? 300,
      timeToPay: response.timeToPay ?? '1 hora',
      showRanking: response.showRanking ?? false,
      promotions: response.Promotion ?? [],
      prizes: response.Prize ?? [],
    })
  }, [id, reset])

  useEffect(() => {
    getRaffle()
  }, [getRaffle])

  const updateField = (fieldValue: any, field: any) => {
    field.onChange(fieldValue)
  }

  return (
    <div className="flex-grow">
      <div className="py-8 px-4 sm:px-8 container">
        <h1 className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
          <FaTicket size="40" />{' '}
          <span className="ml-1">Editando: {watchName} </span>
        </h1>
      </div>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <InputLabel
          register={register}
          errors={errors}
          label="Nome"
          name="name"
          placeholder="Sorteio"
        />
        <div className="mt-8">
          <div className="flex align-center justify-center items-center border-2 border-gray-300 rounded-lg mt-6 p-2">
            <Image
              src="/images/gif/gif.gif"
              alt="✅ Sistema escolhe os bilhetes"
              width={200}
              height={50}
            />
          </div>
          <div>
            <label className="label" htmlFor="description">
              Descrição / Regulamento{' '}
              <div className="inline-block">
                <div className="mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 translate-y-[20%] text-gray-4 00"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
              {...register('description')}
            ></textarea>
          </div>
          <div className="flex gap-1">
            <label className="label">Imagens</label>
            <div className="inline-flex items-center px-2 py-0.5 default-radius text-xs font-medium bg-green-100 text-green-800">
              <b className="mr-1">Tamanho recomendado: </b> 1365x758 pixels{' '}
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4">
            <span className="flex-none bg-white w-full sm:w-[300px] h-28 text-2xl">
              <label
                htmlFor="files"
                className="w-full relative flex cursor-pointer flex-col items-center text-blue-400 justify-center border-4 h-full border-blue-200 hover:text-gray-400 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300"
              >
                <FaCloudArrowUp className="absolute te fa-solid fa-cloud-arrow-up" />
                <input
                  id="files"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden w-full"
                  onChange={handleSelectFiles}
                />
              </label>
            </span>
            <EditFile files={files ?? []} onDelete={handleDeletePhoto} />
          </div>
          <div className="flex space-x-7">
            <InputLabel
              register={register}
              errors={errors}
              label="Quantidade minima de bilhetes por compra"
              name="minTickets"
              placeholder="1"
              icon="cart"
            />

            <InputLabel
              register={register}
              errors={errors}
              label="Quantidade maxima de bilhetes por compra"
              name="maxTickets"
              placeholder="300"
              icon="cart"
            />
          </div>
          <label className="label">
            Data do sorteio
            <div className="inline-block mt-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 translate-y-[20%] text-gray-4 00"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </label>
          {watchHasSortDay && (
            <Controller
              name={'drawingDate'}
              control={control}
              render={({ field }) => (
                <DateCalendar
                  value={dayjs(field.value)}
                  shouldDisablePast
                  handleChange={(value) => field.onChange(value)}
                />
              )}
            />
          )}

          <Controller
            name={'hasSortDay'}
            control={control}
            render={({ field }) => (
              <Toggle
                label="INFORMAR DATA"
                enabled={field.value}
                setEnabled={(enabled) => {
                  field.onChange(enabled) // Atualiza o valor do campo controlado
                }}
              />
            )}
          />
          <label className="label">
            Tempo para Pagamento
            <div className="inline-block mt-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 translate-y-[20%] text-gray-4 00"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </label>
          <Controller
            name="timeToPay"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
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
            )}
          />

          <Controller
            name={'showRanking'}
            control={control}
            render={({ field }) => (
              <div className="flex justify-between items-center">
                <span>Mostrar ranking</span>
                <Toggle
                  enabled={field.value}
                  setEnabled={(enabled) => {
                    field.onChange(enabled) // Atualiza o valor do campo controlado
                  }}
                />
              </div>
            )}
          />

          <Controller
            name="prizes"
            control={control}
            render={({ field }) => (
              <MyModal
                items={field.value}
                onSave={(prizes) => updateField(prizes, field)}
              />
            )}
          />

          <Controller
            name="promotions"
            control={control}
            render={({ field }) => (
              <PromotionModal
                items={field.value}
                onSave={(promotions) => updateField(promotions, field)}
              />
            )}
          />
        </div>

        <button
          className="flex justify-center items-center mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
        >
          <div className="w-full">
            <span className="flex gap-2 items-center">
              Salvar <FaArrowRightLong />
            </span>
          </div>
        </button>
      </form>
    </div>
  )
}

export default EditRaffle
