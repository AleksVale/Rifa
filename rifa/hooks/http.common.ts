import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'

interface ErrorResponse {
  status: number
}

// Create a custom Axios instance
const serverURL = 'http://localhost:3000/api'
// const serverURL = 'http://13.58.221.90/api/'
// const serverURL = 'https://rifa-api-49s3.onrender.com/api/'

const http: AxiosInstance = axios.create({
  baseURL: serverURL,
  headers: {
    'Content-type': 'application/json',
  },
})

// Response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// Request interceptor
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token')
    if (token && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`
    }
    return config
  },
  (error: ErrorResponse) => {
    return Promise.reject(error)
  },
)

export default http
