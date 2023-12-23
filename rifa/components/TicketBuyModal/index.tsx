import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '../Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Divider } from '@mui/material'

const buyTicketSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email('Invalid email'),
  telefone: z.string().min(8).max(15),
})

export type BuyTicketInput = z.infer<typeof buyTicketSchema>

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyTicketInput>({
    resolver: zodResolver(buyTicketSchema),
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<BuyTicketInput> = (data) => {
    // Handle form submission here
    console.log(data)
    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
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
              icon="gift"
            />
            <InputLabel
              register={register}
              errors={errors}
              label=""
              name="email"
              placeholder="Email"
              icon="money"
            />
            <InputLabel
              register={register}
              errors={errors}
              label=""
              name="telefone"
              placeholder="Telefone/Whatsapp"
              icon="ticket"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
