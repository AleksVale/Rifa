'use client'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import imagem1 from '../../public/images/imgcarousel/teste1.png'

import imagem2 from '../../public/images/imgcarousel/teste2.png'

import imagem3 from '../../public/images/imgcarousel/teste3.jpg'

import { Metadata } from 'next'
import Image from 'next/image'
import { ImagemCarousel } from '@/components/ImagemCarousel/ImagemCarousel'
export const metadata: Metadata = {
  title: 'Tables Page | Next.js E-commerce Dashboard Template',
  description: 'This is Tables page for TailAdmin Next.js',
  // other metadata
}

const Ganhadores = () => {
  return (
    <div className="mx-auto max-w-270">
      <div className="text-title-md2 font-semibold text-black py-11">
        <h1>🏆 Ganhadores</h1>
      </div>
      <div className="border-solid border-6 border-white dark:bg-strokedark border-opacity-50 rounded-xl shadow-lg">
        <div className="w-auto">
          <Carousel showArrows>
            <ImagemCarousel src={imagem1} />
            <ImagemCarousel src={imagem2} />
            <ImagemCarousel src={imagem3} />
          </Carousel>
        </div>
        <div className="ganhadores-txt-txt">
          <p className="py-3 px-3">
            Uma lista emocionante dos sortudos que tiveram a sorte de ganhar
            prêmios incríveis em nossos sorteios recentes. Parabenizamos a todos
            todos os vencedores por sua incrível conquista! 🤩
          </p>
          <p className="py-3 px-3">
            Esses são apenas alguns exemplos dos sortudos que tiveram sua vida
            transformada por meio de nossas campanhas. Estamos extremamente
            felizes por compartilhar essas histórias de sucesso com você.
          </p>

          <p className="py-3 px-3">
            Acompanhe nossas redes sociais e fique atento as próximas campanhas.
            Sua oportunidade de ganhar um prêmio incrível pode estar mais perto
            do que você imagina. 🔥🔥🔥
          </p>
          <div className="flex justify-center items-center embed-responsive embed-responsive-16by9 py-4">
            <iframe
              title="winner frame"
              className="embed-responsive-item "
              src="https://www.youtube.com/embed/LXb3EKWsInQ?si=Xn3lf4Pzob58mkxm"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="border-solid border-6 border-white dark:bg-strokedark border-opacity-50 rounded-xl shadow-lg">
        <div className="flex">
          <div className="flex gap-3 mb-2 pointer">
            <div className="w-1/3 box-shadow-08">
              <div className="border-2 border-green-300">
                <Image
                  alt="Teste"
                  src="https://s3.incrivelsorteios.com/redimensiona?key=150x150/default.jpg"
                  decoding="async"
                  data-nimg="fill"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="text-xs">
              <h3 className="">Nome teste</h3>
              <div>
                <p className="">
                  <b>1 MOTO 0KM </b>
                </p>
                <p className="">
                  Número da sorte <b>100000</b>
                </p>
                <p className="">
                  Data da premiação <b>25/11/2023</b>
                </p>
                <p className="">
                  Sorteio <b>2</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ganhadores
