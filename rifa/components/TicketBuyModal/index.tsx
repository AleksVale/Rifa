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

const buyTicketSchema = z
  .object({
    name: z
      .string({ required_error: 'O campo é obrigatório' })
      .min(2, { message: 'O nome deve conter pelo menos 2 letras' })
      .max(250, { message: 'O nome deve conter no máximo 250 letras' }),
    email: z
      .string({ required_error: 'O campo é obrigatório' })
      .email('Email inválido'),
    telefone: z
      .string({ required_error: 'O campo é obrigatório' })
      .min(8)
      .max(15)
      .transform((data) => normalizePhoneNumber(data)),
    confirmPhone: z
      .string({ required_error: 'O campo é obrigatório' })
      .min(11, { message: 'Formato inválido, utilize 11999999999' })
      .max(15, { message: 'Formato inválido, utilize 11999999999' })
      .transform((data) => normalizePhoneNumber(data)),
  })
  .refine((data) => data.telefone === data.confirmPhone, {
    message: 'Os números de telefone não coincidem',
    path: ['confirmPhone'],
  })
function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, '') // Remove non-numeric characters
}

export type BuyTicketInput = z.infer<typeof buyTicketSchema>

interface FormDialogProps {
  open: boolean
  handleClose: () => void
  quantity: number
  value: number
}

const FormDialog = React.memo(
  ({ handleClose, open, quantity, value }: FormDialogProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<BuyTicketInput>({
      resolver: zodResolver(buyTicketSchema),
    })
    const onSubmit: SubmitHandler<BuyTicketInput> = (data) => {
      // Handle form submission here
      console.log(data)
      handleClose()
    }

    return (
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
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
              name="telefone"
              placeholder="Telefone/Whatsapp ((11)99999-9999)"
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  },
)

FormDialog.displayName = 'FormDialog'

export default FormDialog
