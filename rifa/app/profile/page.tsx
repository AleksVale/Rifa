import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Image from 'next/image'

import { Metadata } from 'next'
import DropdownDefault from '@/components/Dropdowns/DropdownDefault'
export const metadata: Metadata = {
  title: 'Profile Page | Next.js E-commerce Dashboard Template',
  description: 'This is Profile page for TailAdmin Next.js',
  // other metadata
}

const Profile = () => {
  return (
    <>
      <div className="container mx-auto px-5">
        <h1 className="text-title-md2 font-semibold text-black">
          Histórico de colaborações
        </h1>
      </div>
      <div className="box-border border-neutral-950 h-128 w-128 p-8 border rounded-lg relative top-15">
        <h3 className="text-[#334155]">Selecione uma campanha</h3>
        <div className="container mx-auto">
          <div className="border-solid border-gray-600 border-[1px] px-2 py-2 rounded cursor-pointer font-bold flex justify-between w-[200]">
            <label className="text-[#334155]">Escolha uma opção</label>
            <img width="15" src="profile/icon.svg" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
