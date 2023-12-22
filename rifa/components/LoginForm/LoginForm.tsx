'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = await login(email, password)

    if (success) {
      router.push('/admin')
    }
  }

  return (
    <form
      className="flex justify-center items-center h-screen"
      onSubmit={handleLogin}
    >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="🔑 Coloque a senha..."
          />
        </div>
        <div className="mt-5 flex justify-between items-center text-indigo=-800 font-semibold">
          <div>
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="w-5"
            />
            <label htmlFor="remember">Lembrar conta</label>
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
    </form>
  )
}

export default LoginForm
