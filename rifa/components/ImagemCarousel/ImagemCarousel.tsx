import Image from 'next/image'

export function ImagemCarousel({ src }: Readonly<{ src: string }>) {
  return (
    <div className="p-8 w-72 mx-auto">
      <Image alt="" src={src} />
    </div>
  )
}
