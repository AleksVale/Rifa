import Image from 'next/image'
import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: 'Login',
  description: 'This is the login page',
  // other metadata
}

const Login = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-150 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-3xl block text-center font-semibold">
            <div className="flex justify-center items-center">
              <Link href="/">
                <Image
                  width={200}
                  height={32}
                  src={'/images/logo/logo.png'}
                  alt="Logo"
                />
              </Link>
            </div>
          </h1>
          <div className="mt-8">
            <label htmlFor="email" className="block text-base mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 border-"
              placeholder="📧  Coloque o email..."
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="🔑 Coloque a senha..."
            />
          </div>
          <div className="mt-5 flex justify-between items-center text-indigo=-800 font-semibold">
            <div>
              <input type="checkbox" className="w-5" />
              <label>Lembrar conta</label>
            </div>
            <div>
              <a href="#" className="text-indigo=-800 font-semibold">
                Esqueceu a senha?
              </a>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="border-2 border-gray-100 bg-amber-400 text-[#0f172a] py-1 w-full rounded-md hover:bg-amber-300 font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
