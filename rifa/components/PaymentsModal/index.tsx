import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FaMagnifyingGlassDollar } from 'react-icons/fa6'
import InputLabel from '../Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { normalizePhoneNumber } from '@/utils/formatter'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Payment from '../Payment'

const schema = z.object({
  phone: z
    .string({ required_error: 'O campo é obrigatório' })
    .min(8)
    .max(15)
    .transform((data) => normalizePhoneNumber(data)),
})

export type PaymentModalType = z.infer<typeof schema>

const PaymentModal: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentModalType>({
    resolver: zodResolver(schema),
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getPayments: SubmitHandler<{ phone: string }> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Buscar bilhetes <FaMagnifyingGlassDollar />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Buscar bilhetes</DialogTitle>
        <DialogContent>
          <InputLabel
            register={register}
            errors={errors}
            label=""
            name="phone"
            placeholder="Telefone/Whatsapp"
            mask="(99) 99999-9999"
            icon="phone"
          />
          <div className="pt-2">
            <Payment name="Aleks" status="PAID" tickets={[1, 2, 3, 4]} />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(getPayments)}
          >
            Buscar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PaymentModal
