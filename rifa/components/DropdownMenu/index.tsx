import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { IconButton, Snackbar } from '@mui/material'

interface DropDownMenuProps {
  raffleId: number
}

export default function DropDownMenu({ raffleId }: DropDownMenuProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

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
    try {
      const shareMessage = `Estou participando de uma campanha incrível! 🚀 ${window.location.origin}/${raffleId}/anuncio`

      // Copia para a área de transferência
      navigator.clipboard.writeText(shareMessage)

      // Exibe o alerta (Snackbar)
      setSnackbarOpen(true)
    } catch (error: any) {
      console.error(
        'Erro ao copiar para a área de transferência:',
        error.message,
      )
    } finally {
      handleClose() // Fecha o menu após a tentativa de compartilhamento
    }
  }

  return (
    <div>
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
        <MenuItem onClick={() => navigateTo(`/${raffleId}/anuncio`)}>
          Visualizar
        </MenuItem>
        <MenuItem onClick={() => navigateTo(`/admin/raffles/${raffleId}/edit`)}>
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
