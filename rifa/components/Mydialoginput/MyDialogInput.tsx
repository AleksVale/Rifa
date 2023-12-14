'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import InputLabel from '../Input'
import { useForm } from 'react-hook-form'

export default function MyModalInput() {
  const [isOpen, setIsOpen] = useState(false)
  const { register } = useForm()
  const [inputCount, setInputCount] = useState(1)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  function addInput() {
    setInputCount(inputCount + 1)
  }
  function removeInput() {
    if (inputCount > 1) {
      setInputCount(inputCount - 1)
    }
  }

  return (
    <>
      <div className="flex items-center justify-start mt-2">
        <button
          type="button"
          onClick={openModal}
          className="flex justify-center items-center bg-white hover:bg-gray-300 text-black  py-2 px-4 rounded-md border border-gray-300 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
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
                      Promoções da sua campanha!
                      <button type="button" onClick={closeModal}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </Dialog.Title>

                  <div className="min-h-full justify-start p-4 text-center">
                    {Array.from({ length: inputCount }).map((_, i) => (
                      <div key={i}>
                        <label className="label mb-0 flex justify-start">{`Promoção ${
                          i + 1
                        }`}</label>
                        <InputLabel
                          key={i}
                          register={register}
                          errors={Error}
                          label=""
                          name={`Promoção${i + 1}`}
                          placeholder="Quantidades de bilhetes"
                          icon="ticket"
                        />
                        <InputLabel
                          key={i}
                          register={register}
                          errors={Error}
                          label=""
                          name={`Promoção${i + 1}`}
                          placeholder="Valor da promoção"
                          icon="money"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={addInput}
                      className=" flex-auto items-center justify-end border-2 border-green-500 text-white bg-green-500 rounded-md text-sm text-center w-36 h-8 "
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </i>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={removeInput}
                      className="flex-auto justify-end border-2 border-red-500 text-white bg-red-500 rounded-md text-sm text-center w-36  h-8"
                    >
                      <div className="w-full flex justify-between items-center">
                        Excluir prêmio
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </i>
                      </div>
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
