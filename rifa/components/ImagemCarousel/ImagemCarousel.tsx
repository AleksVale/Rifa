import Image, { StaticImageData } from 'next/image'

export function ImagemCarousel({
  src,
}: Readonly<{ src: string | StaticImageData }>) {
  return (
    <div className="p-8 w-80 mx-auto justify-center flex px-2">
      <Image alt="" src={src} />
    </div>
  )
}
