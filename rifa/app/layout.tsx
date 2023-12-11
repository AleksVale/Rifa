'use client'
import './globals.css'
import './data-tables-css.css'
import './satoshi.css'
import { useState, useEffect } from 'react'
import Loader from '@/components/common/Loader'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        {children}
      </body>
    </html>
  )
}
