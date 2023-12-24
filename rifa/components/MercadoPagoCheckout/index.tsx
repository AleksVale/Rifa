'use client'
import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function MercadoPagoCheckout() {
  const query = useSearchParams()
  const router = useRouter()

  const checkout = query.get('checkout')
  return (
    <>
      <Button onClick={() => router.back()}>Voltar ao anuncio</Button>
      <iframe
        width={'100%'}
        height={'100%'}
        title="Checkout mercadoPago"
        src={`${decodeURIComponent(checkout ?? '')}`}
      />
    </>
  )
}
