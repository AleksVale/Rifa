import { Metadata } from 'next'

import Ganhadores from '@/components/Ganhadores'
export const metadata: Metadata = {
  title: 'Tables Page | Next.js E-commerce Dashboard Template',
  description: 'This is Tables page for TailAdmin Next.js',
}

const TablesPage = () => {
  return <Ganhadores />
}

export default TablesPage
