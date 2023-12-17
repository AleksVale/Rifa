import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldValues,
  SubmitErrorHandler,
  Controller,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputLabel from '../Input'
import CurrencyInput from 'react-currency-input-field'
import { FaDollarSign, FaTrashCan } from 'react-icons/fa6'

const schema = z.object({
  promotions: z.array(
    z.object({
      quantity: z
        .string()
        .refine((data) => !isNaN(Number(data)), {
          message: 'Invalid quantity. Must be a number.',
        })
        .transform((data) => Number(data)),
      price: z.number().min(0.1, { message: 'Value must be at least 0.1' }),
    }),
  ),
})

interface Promotion {
  id?: number
  quantity: number
  price: number
}

interface PromotionProps {
  items: Promotion[]
  onSave: (promotions: Promotion[]) => void
}

export default function PromotionModal({ items, onSave }: PromotionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      promotions: items,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'promotions',
  })

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const addPromotion = () => {
    append({ quantity: 0, price: 0 })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onSave(data.promotions)
    setIsOpen(false)
    console.log(data)
    // Aqui você pode realizar a lógica necessária com os dados submetidos
  }

  const onError: SubmitErrorHandler<FieldValues> = (errors) => {
    console.error(errors)
  }

  const removePromotion = (index: number) => {
    remove(index)
  }

  return (
    <>
      <div className="flex items-center justify-start mt-2 w-screen">
        <button
          type="button"
          onClick={openModal}
          className="flex justify-center items-center bg-white hover:bg-gray-300 text-black py-2 px-4 rounded-md border border-gray-300 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
          Editar Promoções
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex justify-between">
                      Promoções da sua campanha!
                      <button type="button" onClick={closeModal}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </Dialog.Title>

                  <div className="min-h-full justify-start p-4 text-center space-y-4">
                    {fields.map((item, i) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-center">
                          <label className="label mb-0 flex justify-start">{`Promoção ${
                            i + 1
                          }`}</label>
                          <button
                            type="button"
                            onClick={() => removePromotion(i)}
                          >
                            <FaTrashCan className="text-red-600" />
                          </button>
                        </div>
                        <InputLabel
                          register={register}
                          errors={errors}
                          label=""
                          name={`promotions.${i}.quantity` as const}
                          placeholder="Quantidades de bilhetes"
                          icon="ticket"
                        />
                        <Controller
                          name={`promotions.${i}.price` as const}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <div className="flex items-center">
                              <div className="bg-slate-300 py-3 px-3 border-r border-red-300">
                                <FaDollarSign />
                              </div>
                              <CurrencyInput
                                id={`promotions.${i}.price`}
                                name={`promotions.${i}.price`}
                                placeholder="Valor da promoção"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={field.value}
                                decimalsLimit={2}
                                onValueChange={(value, name, values) =>
                                  field.onChange(values?.float)
                                }
                                intlConfig={{
                                  locale: 'pt-BR',
                                  currency: 'BRL',
                                }}
                              />
                            </div>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      type="button"
                      onClick={addPromotion}
                      className="flex-auto items-center justify-end border-2 border-green-500 rounded-md text-sm text-center w-36 h-8"
                    >
                      Adicionar Prêmio
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit, onError)}
                      className="flex-auto items-center justify-end border-2 border-green-500 text-white bg-green-500 rounded-md text-sm text-center w-36 h-8"
                    >
                      Salvar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
