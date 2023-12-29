'use client'
import { Raffle } from '@/services/Raffle.service'
import { Dialog } from '@headlessui/react'
import { Alert, Snackbar } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import QRCode, { QRCodeCanvas } from 'qrcode.react'

interface ModalCompartilhamentoProps {
  open: boolean
  onClose: () => void
  raffle: Raffle
}

export function ModalCompartilhamento({
  onClose,
  open,
  raffle,
}: Readonly<ModalCompartilhamentoProps>) {
  const [message, setMessage] = React.useState(
    `Estou fazendo uma ação Sorteio, e cada bilhete está custando ${new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      },
    ).format(raffle.price)} O link da minha campanha é este ${
      window.location.origin
    }/${raffle.id}/s`,
  )
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const downloadQrcode = () => {
    const canvas = document.getElementById('qrcode') as any
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'qrcodeAleks.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Tempo em milissegundos que o alerta fica aberto
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="pt-10"
      >
        <Alert
          className="z-999999"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Link copiado para a área de transferência!
        </Alert>
      </Snackbar>
      <div className="flex items-center justify-center min-h-full p-4 text-center">
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center min-h-screen p-4 text-center">
          <div className="bg-opacity-50 fixed inset-0 bg-gray-500"></div>
          <div className="z-50 relative max-w-xl md:max-w-2xl w-full mx-auto my-10">
            <Dialog.Panel className="text-left relative transform transition-all w-full bg-white rounded shadow-lg p-6">
              <div
                id="headlessui-dialog-panel-63"
                data-headlessui-state="open"
                className="text-left relative mx-auto transform transition-all w-full"
              >
                <div className="modal-v1">
                  <p className="font-bold text-xl">Compartilhe sua ação</p>
                  <hr className="border-gray-300 my-4 w-full" />
                  <div className="flex gap-4 justify-center md:justify-start">
                    <div className="flex items-center flex-col">
                      <Link
                        className="rounded-full border border-gray-300 p-4 bg-white focus:outline-none hover:bg-emerald-50"
                        href={`https://api.whatsapp.com/send?text=${window.location.origin}/${raffle.id}/s`}
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="20"
                          viewBox="0 0 448 512"
                          fill="#00FF00"
                        >
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                        </svg>
                      </Link>
                      <p className="mt-2 text-sm">WhatsApp</p>
                    </div>

                    <div className="flex items-center flex-col">
                      <Link
                        className="rounded-full border border-gray-300 p-4 bg-white focus:outline-none hover:bg-blue-50"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          `${window.location.origin}/${raffle.id}/s`,
                        )}&quote=Venha conecer nossa rifa`}
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="20"
                          viewBox="0 0 320 512"
                          fill="#0000FF"
                        >
                          <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                        </svg>
                      </Link>
                      <p className="mt-2 text-sm">Facebook</p>
                    </div>

                    <div className="flex items-center flex-col">
                      <Link
                        className="rounded-full border border-gray-300 p-4 bg-white focus:outline-none hover:bg-cyan-50"
                        href={`https://telegram.me/share/url?url=${encodeURIComponent(
                          `${window.location.origin}/${raffle.id}/s`,
                        )}&text="Ola brasil de bolsonaro"`}
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="20"
                          viewBox="0 0 496 512"
                          fill="#2fa3d9"
                        >
                          <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                        </svg>
                      </Link>
                      <p className="mt-2 text-sm">Telegram</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="label mb-3">Mensagem personalizada</p>
                    <div className="flex">
                      <textarea
                        className="input flex-auto p-1 h-20 border border-gray-300 rounded-md resize-none"
                        value={message ?? ''}
                        onChange={(e) => {
                          setMessage(e.target.value)
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="grid md:flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        downloadQrcode()
                      }}
                      className=" flex justify-center items-center button border border-gray-300 rounded-md shadow-sm py-2 px-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="14"
                        viewBox="0 0 448 512"
                      >
                        <path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80zM64 96v64h64V96H64zM0 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336zm64 16v64h64V352H64zM304 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm80 64H320v64h64V96zM256 304c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16v64c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V304zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" />
                      </svg>
                      <span className="button mx-2">Gerar QRCode</span>
                    </button>
                    <button className=" flex justify-center items-center button border border-gray-300 rounded-md shadow-sm py-2 px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="20"
                        viewBox="0 0 640 512"
                      >
                        <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                      </svg>
                      <button
                        onClick={() => {
                          setSnackbarOpen(true)
                          navigator.clipboard.writeText(
                            `${window.location.origin}/${raffle.id}/s`,
                          )
                        }}
                      >
                        Copiar Link
                      </button>
                    </button>
                  </div>
                  <div>
                    <QRCode
                      id="qrcode"
                      value={`${window.location.origin}/${raffle.id}/s`}
                      bgColor="#fff"
                      includeMargin={true}
                      level="H"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
