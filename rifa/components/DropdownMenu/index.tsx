import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { IconButton, Snackbar } from '@mui/material'
import { ModalCompartilhamento } from '../ModalCompartilhamento'
import { Raffle } from '@/services/Raffle.service'

interface DropDownMenuProps {
  raffle: Raffle
}

export default function DropDownMenu({ raffle }: DropDownMenuProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [shareModal, setShareModal] = React.useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleShareCampaign = () => {
    setShareModal(true)
  }

  return (
    <div>
      <ModalCompartilhamento
        open={shareModal}
        onClose={() => setShareModal(false)}
        raffle={raffle}
      />
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FaEllipsisVertical size="20" color="#536654" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigateTo(`/${raffle.id}/s`)}>
          Visualizar
        </MenuItem>
        <MenuItem
          onClick={() => navigateTo(`/admin/raffles/${raffle.id}/edit`)}
        >
          Editar
        </MenuItem>
        <MenuItem onClick={handleShareCampaign}>Compartilhar</MenuItem>
        <MenuItem onClick={handleClose}>Informar vencedores</MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Tempo em milissegundos que o alerta fica aberto
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message="Mensagem copiada para a área de transferência!"
      />
    </div>
  )
}
