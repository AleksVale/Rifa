'use client'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import imagem1 from '../../public/images/brand/brand-01.svg'

import imagem2 from '../../public/images/brand/brand-02.svg'

import imagem3 from '../../public/images/brand/brand-03.svg'

import { Metadata } from 'next'
import Image from 'next/image'
import { ImagemCarousel } from '@/components/ImagemCarousel/ImagemCarousel'
export const metadata: Metadata = {
  title: 'Tables Page | Next.js E-commerce Dashboard Template',
  description: 'This is Tables page for TailAdmin Next.js',
  // other metadata
}

const TablesPage = () => {
  return (
    <div className="w-2/3">
      <Carousel showArrows>
        <ImagemCarousel src={imagem1} />
        <ImagemCarousel src={imagem2} />
        <ImagemCarousel src={imagem3} />
      </Carousel>
    </div>
  )
}

export default TablesPage
