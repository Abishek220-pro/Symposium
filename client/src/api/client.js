import axios from 'axios'

let token = null

export const setAuthToken = (newToken) => {
  token = newToken
}

export const getAuthToken = () => token

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Interceptor to attach token to all requests
client.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default client
