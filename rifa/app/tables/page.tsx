'use client'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { Metadata } from 'next'
import teste1 from '../public/carousel/teste1.png'
export const metadata: Metadata = {
  title: 'Tables Page | Next.js E-commerce Dashboard Template',
  description: 'This is Tables page for TailAdmin Next.js',
  // other metadata
}

const TablesPage = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <div className="text-title-md2 font-semibold text-black py-11">
          <h1>🏆 Ganhadores</h1>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"></div>
        <div className="container w-auto h-auto flex-auto py-5">
          <div className="w-screen w-auto h-auto flex-auto"></div>
        </div>
      </div>
    </>
  )
}

export default TablesPage
