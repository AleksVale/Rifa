'use client'
import { Select } from '@/components/Select/Select'
import { RaffleService } from '@/services/Raffle.service'
import { Buyer, TicketService } from '@/services/ticket.service'
import { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowsProp, ptBR } from '@mui/x-data-grid'
import { formatPhoneNumber } from '@/utils/formatter'

const FilterRanking = () => {
  const [selectedRaffle, setSelectedRaffle] = useState('Selecione uma opção')

  const [showSensitiveData, setShowSensitiveData] = useState(false)

  const [raffleTicketValue, setRaffleTicketValue] = useState(0)

  const [buyers, setBuyers] = useState<Buyer[]>([])

  const columns: GridColDef[] = [
    {
      field: 'place',
      headerName: 'Colocação',
      flex: 1,
      valueGetter: (params) => params.row.place,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.value}º</div>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      valueGetter: (params) => params.row.name,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.value}</div>
      ),
    },
    {
      field: 'value',
      headerName: 'Valor gasto',
      flex: 1,
      valueGetter: (params) => params.row.Ticket.length * raffleTicketValue,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(params.value)}
        </div>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      flex: 1,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.row.Ticket.length}</div>
      ),
    },
  ]

  const columsWithSensitiveData: GridColDef[] = [
    {
      field: 'place',
      headerName: 'Colocação',
      width: 150,
      valueGetter: (params) => params.row.place,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.value}º</div>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      valueGetter: (params) => params.row.name,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.value}</div>
      ),
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.value}</div>
      ),
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      flex: 1,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>
          {formatPhoneNumber(params.value)}
        </div>
      ),
    },
    {
      field: 'value',
      headerName: 'Valor gasto',
      width: 150,
      valueGetter: (params) => params.row.Ticket.length * raffleTicketValue,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(params.value)}
        </div>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      width: 150,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>{params.row.Ticket.length}</div>
      ),
    },
  ]

  const [raffleOptions, setRaffleOptions] = useState<
    { id: number; label: string; price: number }[]
  >([])

  const handleSelectRaffle = async (value: string) => {
    setSelectedRaffle(value)
    const raffle = raffleOptions.find((raffle) => raffle.label === value)
    const response = await TicketService.getBuyersFromRaffle(raffle?.id ?? 0)
    setRaffleTicketValue(raffle?.price ?? 0)
    setBuyers(response.data)
  }

  const getRaffles = useCallback(async () => {
    const response = await RaffleService.list()
    const options = response.data.map((raffle) => {
      return {
        id: raffle.id,
        label: raffle.name,
        price: raffle.price,
      }
    })
    setRaffleOptions(options)
  }, [])

  useEffect(() => {
    getRaffles()
  }, [getRaffles])

  return (
    <>
      <div className="container mx-auto px-5">
        <h1 className="text-title-md2 font-semibold text-black">Ranking</h1>
      </div>
      <div className="box-border border-neutral-950 h-128 w-128 p-8 border rounded-lg mt-15">
        <div className="container mx-auto flex-auto">
          <span className="text-[#334155]">Selecione uma campanha</span>
        </div>
        <div className="container flex justify-between space-x-1">
          <div className="flex-1">
            <Select
              options={raffleOptions}
              value={selectedRaffle}
              onChange={handleSelectRaffle}
            />
          </div>
          <div>
            <button
              onClick={() => setShowSensitiveData((state) => !state)}
              className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg space-x-2"
            >
              {showSensitiveData ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              )}

              <span>Dados</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 z-0">
        <DataGrid
          rows={buyers}
          columns={showSensitiveData ? columsWithSensitiveData : columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          autoHeight
        />
      </div>
    </>
  )
}

export default FilterRanking
