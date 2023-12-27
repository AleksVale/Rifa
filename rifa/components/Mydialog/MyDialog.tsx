'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
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
import { FaDollarSign, FaTrashCan } from 'react-icons/fa6'

const schema = z.object({
  prizes: z.array(
    z.object({
      place: z.number().min(1, { message: 'Place must be at least 1' }),
      name: z.string(),
    }),
  ),
})

interface Prize {
  place: number
  name: string
}

interface PrizeModalProps {
  items: Prize[]
  onSave: (items: Prize[]) => void
}

export default function MyModal({ items, onSave }: PrizeModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      prizes: items,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'prizes',
  })

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const addPrize = () => {
    append({ place: fields.length + 1, name: '' })
  }

  const removePrize = (index: number) => {
    remove(index)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onSave(data.prizes)
    setIsOpen(false)
    console.log(data)
    // Here you can perform any necessary logic with the submitted data
  }

  const onError: SubmitErrorHandler<FieldValues> = (errors) => {
    console.error(errors)
  }

  useEffect(() => {
    if (items?.length) {
      reset({
        prizes: items.map((item) => ({
          place: item.place,
          name: item.name,
        })),
      })
    }
  }, [items, reset])

  return (
    <>
      <div className="flex flex-1 items-center justify-center mt-2">
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
              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
            />
          </svg>
          Editar Prêmios
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
                      <span>Prêmios da campanha!</span>
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
                          <label className="label mb-0 flex justify-start">{`Prêmio ${
                            i + 1
                          }`}</label>
                          <button type="button" onClick={() => removePrize(i)}>
                            <FaTrashCan className="text-red-600" />
                          </button>
                        </div>
                        <InputLabel
                          register={register}
                          errors={errors}
                          label=""
                          name={`prizes.${i}.name` as const}
                          placeholder="Informe o prêmio"
                          icon="gift"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      type="button"
                      onClick={addPrize}
                      className="flex-auto items-center justify-end border-2 border-green-500 text-white bg-green-500 rounded-md text-sm text-center w-36 h-8"
                    >
                      <div className="w-full flex justify-between items-center">
                        Adicionar Prêmio
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </i>
                      </div>
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
