import AuthService from '@/services/auth.service'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface AuthContextType {
  token: string | null
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && token !== 'undefined') {
      setToken(JSON.parse(token))
    } else {
      setToken(null)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, senha: string) => {
    const token = await AuthService.login(email, senha)
    console.log(token)
    setToken(token.data.access_token)
    localStorage.setItem('token', JSON.stringify(token.data.access_token))
    return !!token.data
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user_type')
  }
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
