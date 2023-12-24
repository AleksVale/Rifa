import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '../Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Divider } from '@mui/material'
import { TicketService } from '@/services/ticket.service'
import { normalizePhoneNumber } from '@/utils/formatter'

const buyTicketSchema = z
  .object({
    name: z
      .string({ required_error: 'O campo é obrigatório' })
      .min(2, { message: 'O nome deve conter pelo menos 2 letras' })
      .max(250, { message: 'O nome deve conter no máximo 250 letras' }),
    email: z
      .string({ required_error: 'O campo é obrigatório' })
      .email('Email inválido'),
    phone: z
      .string({ required_error: 'O campo é obrigatório' })
      .min(8)
      .max(15)
      .transform((data) => normalizePhoneNumber(data)),
    confirmPhone: z
      .string({ required_error: 'O campo é obrigatório' })
      .min(11, { message: 'Telefone inválido' })
      .max(15, { message: 'Telefone inválido' })
      .transform((data) => normalizePhoneNumber(data)),
  })
  .refine((data) => data.phone === data.confirmPhone, {
    message: 'Os números de telefone não coincidem',
    path: ['confirmPhone'],
  })

export type BuyTicketInput = z.infer<typeof buyTicketSchema>

interface FormDialogProps {
  open: boolean
  handleClose: (checkout?: string) => void
  quantity: number
  value: number
  raffleId: number
}

const FormDialog = React.memo(
  ({ handleClose, open, quantity, value, raffleId }: FormDialogProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<BuyTicketInput>({
      resolver: zodResolver(buyTicketSchema),
    })
    const onSubmit: SubmitHandler<BuyTicketInput> = async (data) => {
      const response = await TicketService.createTickets({
        ...data,
        quantity,
        price: value,
        raffleId,
      })
      handleClose(
        response.data.point_of_interaction.transaction_data.ticket_url,
      )
    }

    return (
      <Dialog
        open={open}
        onClose={handleClose as any}
        maxWidth={'sm'}
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Reservar bilhetes</DialogTitle>
          <Divider />
          <DialogContent>
            <InputLabel
              register={register}
              errors={errors}
              label=""
              name="name"
              placeholder="Nome completo"
              icon="signature"
            />
            <InputLabel
              register={register}
              errors={errors}
              label=""
              name="email"
              placeholder="Email"
              icon="envelope"
            />
            <InputLabel
              register={register}
              errors={errors}
              label=""
              name="phone"
              placeholder="Telefone/Whatsapp"
              mask="(99) 99999-9999"
              icon="phone"
            />

            <InputLabel
              register={register}
              errors={errors}
              label=""
              name="confirmPhone"
              placeholder="Confirme o Telefone/Whatsapp"
              mask="(99) 99999-9999"
              icon="phone"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
              className="py-4"
            >
              Reservar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  },
)

FormDialog.displayName = 'FormDialog'

export default FormDialog
