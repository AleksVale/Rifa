import React from 'react'
import LoginForm from '@/components/LoginForm/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is the login page',
  // other metadata
}
const Login = () => {
  return <LoginForm />
}

export default Login
