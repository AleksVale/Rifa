'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import InputLabel from '../Input'
import { useForm } from 'react-hook-form'

export default function MyModal() {
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
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
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
                      Prêmios da campanha!
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
                        <label className="label mb-0 flex justify-start">{`Prêmio ${
                          i + 1
                        }`}</label>
                        <InputLabel
                          key={i}
                          register={register}
                          errors={Error}
                          label=""
                          name={`Premio${i + 1}`}
                          placeholder="Informe o prêmio"
                          icon="gift"
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
