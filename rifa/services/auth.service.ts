import http from '../hooks/http.common'

interface loginResponse {
  access_token: string
}

const login = async (email: string, senha: string) => {
  return http.post<loginResponse>('/auth/signin', { email, senha })
}

const AuthService = {
  login,
}

export default AuthService
