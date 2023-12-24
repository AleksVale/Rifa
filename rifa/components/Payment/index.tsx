import { Chip } from '@mui/material'
import React, { useCallback } from 'react'

interface PaymentProps {
  status: 'PAID' | 'PENDING' | 'EXPIRED'
  tickets?: number[]
  name: string
}

export default function Payment({ name, status, tickets }: PaymentProps) {
  const getPaymentStatus = useCallback((status: string) => {
    switch (status) {
      case 'PAID':
        return 'Pago'
      case 'PENDING':
        return 'Reservado'
      case 'EXPIRED':
        return 'Expirado'
      default:
        return 'Reservado'
    }
  }, [])

  const getPaymentColor = useCallback((status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-orange-100 text-orange-800'
      case 'EXPIRED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-orange-100 text-orange-800'
    }
  }, [])

  return (
    <div>
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <p className="text-blue-500 font-bold hover:underline capitalize">
            {name}
          </p>
        </div>
        <div>
          <span
            className={
              getPaymentColor(status) +
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
            }
          >
            {getPaymentStatus(status)}
          </span>
        </div>
      </div>
      <div>
        {status === 'PAID' && (
          <div className="flex gap-1 pt-2 mt-2 border-t-stone-300 border-t">
            {tickets?.map((ticket) => (
              <Chip
                component={'div'}
                color="success"
                key={ticket}
                label={ticket}
                size="small"
              />
            ))}
          </div>
        )}
        {status === 'PENDING' && (
          <div>
            <span>Reservado</span>
          </div>
        )}
      </div>
    </div>
  )
}
