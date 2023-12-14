import Campanha from '@/components/Dashboard/Campanha'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TailAdmin | Next.js E-commerce Dashboard Template',
  description: 'This is Home Blog page for TailAdmin Next.js',
  // other metadata
}

export default function Home() {
  return (
    <>
      <Campanha />
    </>
  )
}