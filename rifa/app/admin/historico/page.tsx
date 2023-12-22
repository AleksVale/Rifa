import { Metadata } from 'next'

import HistoricoRaffle from '@/components/HistoricoRaffle'
export const metadata: Metadata = {
  title: 'Historico',
  description: 'This is the raffle history',
  // other metadata
}

const Profile = () => {
  return <HistoricoRaffle />
}

export default Profile
