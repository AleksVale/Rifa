'use client'
import React, { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@mui/material'
import Slider from '@/components/Slider/Slider'
import { Raffle, RaffleService } from '@/services/Raffle.service'
import FormDialog from '@/components/TicketBuyModal'

function Anuncio({ params }: Readonly<{ params: { id: string } }>) {
  const [tickets, setTickets] = React.useState<number>(1)
  const [raffle, setRaffle] = React.useState<Raffle>()
  const getAnuncio = useCallback(async () => {
    const raffleResponse = await RaffleService.get(params.id)
    setRaffle(raffleResponse)
  }, [params.id])

  const handleChangeTicketValue = (quantity: number) => {
    setTickets((state) => (state + quantity >= 0 ? state + quantity : 0))
  }

  const generateDescription = () => {
    const description = raffle?.description?.split('<p>')
  }

  useEffect(() => {
    getAnuncio()
  }, [getAnuncio])

  return (
    <div className="container py-6 px-6 ml-auto mr-auto bg-slate-200">
      <div>
        <Slider />
      </div>
      <div className="flex font-bold text-black text-2xl">{raffle?.name}</div>
      <hr className="my-4 dark:border-gray-700"></hr>
      <div className="space-y-6 justify-between">
        <div className="flex items-start gap-3">
          <Image
            src="/images/logo/logo.png"
            alt="Imagem do organizador"
            className="h-16 w-16 rounded-full border border-gray-100 dark:border-gray-700"
            width={100}
            height={100}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col">
                <small className="text-[0.6rem]">Organizado por: </small>
                <div className="font-medium">Pessoa Teste</div>
              </div>
            </div>
            <div className="mt-1 text-xs flex items-center gap-2">
              <a
                target="_blank"
                href="https://wa.me/5512996794004"
                className="bg-[#01A884] rounded-full py-1 px-2 flex gap-1 items-center text-white"
              >
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </i>
                <span>Suporte</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 dark:border-gray-700"></hr>
      <section className="grid gap-4 sm:gap-6 text-white dark:text-gray-200">
        <div className="rounded-2xl p-4 sm:p-6 border bg-orange-400 border-orange-600 dark:bg-orange-600 dark:border-orange-300">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/logo.png"
              className="h-10 w-10"
              alt={''}
              width={100}
              height={100}
            />
            <div className="bg-orange-500 rounded-full inline-block text-xs font-semibold px-4 py-1.5">
              Prêmios
            </div>
          </div>
          <div className="mt-4">
            {raffle?.Prize.map((prize) => (
              <div className="mt-2" key={prize.id}>
                <div className="text-sm font-medium">
                  <span className="font-semibold">{prize.place}º lugar </span>
                  <span>- {prize.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="my-4 dark:border-gray-700"></hr>

      <section className="border p-4 sm:p-6 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-2xl">
        <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider text-center">
          {' '}
          DESCRIÇÃO / REGULAMENTO{' '}
        </p>
        <p className="mt-4 text-sm max-w-xl mx-auto rx-content">
          {raffle?.description && (
            <div dangerouslySetInnerHTML={{ __html: raffle?.description }} />
          )}
        </p>
      </section>
      <section className="relative">
        <form className="border bg-white dark:bg-gray-800 dark:border-gray-700 px-4 sm:px-6 py-6 rounded-2xl">
          <h2 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold text-center">
            {' '}
            Selecione a quantidade de bilhetes{' '}
          </h2>
          <div className="grid grid-cols-4 gap-2 mt-4 max-w-xl mx-auto">
            <button
              type="button"
              className="border button dark:border-gray-600 text-sm py-2 text-center rounded-lg dark:hover:bg-gray-900 font-semibold"
              onClick={() => handleChangeTicketValue(1)}
            >
              {' '}
              +1
            </button>
            <button
              type="button"
              className="border button dark:border-gray-600 text-sm py-2 text-center rounded-lg dark:hover:bg-gray-900 font-semibold"
              onClick={() => handleChangeTicketValue(5)}
            >
              {' '}
              +5
            </button>
            <button
              type="button"
              className="border button dark:border-gray-600 text-sm py-2 text-center rounded-lg dark:hover:bg-gray-900 font-semibold"
              onClick={() => handleChangeTicketValue(10)}
            >
              {' '}
              +10
            </button>
            <button
              type="button"
              className="border button dark:border-gray-600 text-sm py-2 text-center rounded-lg dark:hover:bg-gray-900 font-semibold"
              onClick={() => handleChangeTicketValue(100)}
            >
              {' '}
              +100
            </button>
          </div>
          <div className="flex items-center gap-4 mt-4 max-w-xl mx-auto">
            <button
              type="button"
              className="border p-1 rounded-full w-10 h-10"
              onClick={() => handleChangeTicketValue(-1)}
            >
              -
            </button>
            <Input
              type="number"
              className="input text-center"
              onChange={(e) => setTickets(Number(e.target.value))}
              value={tickets}
            />
            <button
              className="border p-1 rounded-full w-10 h-10"
              type="button"
              onClick={() => handleChangeTicketValue(1)}
            >
              +
            </button>
          </div>
          <div className="max-w-xl mx-auto mt-6 text-sm">
            <div className="flex-h-between">
              <span>Valor final</span>
            </div>
          </div>
          <div className="max-w-xl mx-auto">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8 w-full"
            >
              RESERVAR
            </button>
            <FormDialog />
          </div>
        </form>
      </section>
      <hr className="my-4 dark:border-gray-700"></hr>
      <section className="grid grid-cols-2 gap-4 sm:gap-6 pb-10">
        <div className="border p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-700">
          <p className="text-xs sm:text-sm tracking-wider text-gray-500 dark:text-gray-400 uppercase font-semibold">
            {' '}
            MEIO DE PAGAMENTO{' '}
          </p>
          <p className="mt-4 font-medium text-xs sm:text-sm flex items-center gap-3">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path
                d="M18.6687 19.9616L15.0317 16.3245C14.8987 16.1916 14.7417 16.1674 14.6571 16.1674C14.5725 16.1674 14.4154 16.1916 14.2825 16.3245L10.6333 19.9737C10.2225 20.3845 9.58208 21.0491 7.44333 21.0491L11.9262 25.5199C12.6059 26.1988 13.5273 26.5801 14.4879 26.5801C15.4485 26.5801 16.3699 26.1988 17.0496 25.5199L21.5446 21.037C20.445 21.037 19.5267 20.8195 18.6687 19.9616ZM10.6333 9.02619L14.2825 12.6754C14.3792 12.772 14.5242 12.8324 14.6571 12.8324C14.79 12.8324 14.935 12.772 15.0317 12.6754L18.6446 9.06244C19.5025 8.16828 20.4812 7.96286 21.5808 7.96286L17.0858 3.47994C16.4061 2.8011 15.4848 2.4198 14.5242 2.4198C13.5635 2.4198 12.6422 2.8011 11.9625 3.47994L7.47958 7.95078C9.60625 7.95078 10.2587 8.65161 10.6333 9.02619Z"
                fill="#51D2BB"
              ></path>
              <path
                d="M25.5079 11.9021L22.7892 9.17126H21.2667C20.6142 9.17126 19.9617 9.43709 19.5146 9.90834L15.8896 13.5333C15.5512 13.8717 15.1042 14.0408 14.6571 14.0408C14.1967 14.0344 13.756 13.8529 13.4246 13.5333L9.77542 9.87209C9.31625 9.41293 8.68792 9.14709 8.02333 9.14709H6.24708L3.48 11.9263C2.80116 12.606 2.41986 13.5273 2.41986 14.4879C2.41986 15.4486 2.80116 16.3699 3.48 17.0496L6.24708 19.8288H8.03542C8.68792 19.8288 9.31625 19.5629 9.7875 19.1038L13.4367 15.4546C13.775 15.1163 14.2221 14.9471 14.6692 14.9471C15.1163 14.9471 15.5633 15.1163 15.9017 15.4546L19.5387 19.0917C19.9979 19.5508 20.6263 19.8167 21.2908 19.8167H22.8133L25.5321 17.0858C26.2138 16.3939 26.5939 15.4603 26.5894 14.489C26.5848 13.5177 26.196 12.5876 25.5079 11.9021Z"
                fill="#51D2BB"
              ></path>
            </svg>
            <span>PIX</span>
          </p>
        </div>
        <div className="border p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-700">
          <p className="text-xs sm:text-sm tracking-wider text-gray-500 dark:text-gray-400 uppercase font-semibold">
            {' '}
            SORTEIO{' '}
          </p>
          <p className="mt-4 font-medium text-xs sm:text-sm flex items-center gap-3">
            <span className="h-6 w-6 text-base text-center">🍀</span>
            <span className="uppercase break-all">Loteria Federal</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Anuncio
