import { Metadata } from 'next'

import HistoricoRaffle from '@/components/HistoricoRaffle'
export const metadata: Metadata = {
  title: 'Histórico de Colaborações',
  description: 'This is the raffle history',
}

const Profile = () => {
  return <HistoricoRaffle />
}

export default Profile
