import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import client, { setAuthToken } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('symposium_user')
    const storedToken = localStorage.getItem('symposium_accessToken')
    const storedRefresh = localStorage.getItem('symposium_refreshToken')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setAccessToken(storedToken)
      setAuthToken(storedToken)
    }

    if (storedRefresh) {
      client.post('/auth/refresh', { refreshToken: storedRefresh }).then((res) => {
        const nextToken = res.data.accessToken
        setAccessToken(nextToken)
        setAuthToken(nextToken)
        localStorage.setItem('symposium_accessToken', nextToken)
      }).catch(() => {
        localStorage.removeItem('symposium_accessToken')
        localStorage.removeItem('symposium_refreshToken')
        localStorage.removeItem('symposium_user')
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    setError('')
    const response = await client.post('/auth/login', { email, password })
    const { accessToken, refreshToken, user } = response.data
    setUser(user)
    setAccessToken(accessToken)
    setAuthToken(accessToken)
    localStorage.setItem('symposium_accessToken', accessToken)
    localStorage.setItem('symposium_refreshToken', refreshToken)
    localStorage.setItem('symposium_user', JSON.stringify(user))
    return user
  }

  const register = async (userData) => {
    setError('')
    const response = await client.post('/auth/register', userData)
    const { accessToken, refreshToken, user } = response.data
    setUser(user)
    setAccessToken(accessToken)
    setAuthToken(accessToken)
    localStorage.setItem('symposium_accessToken', accessToken)
    localStorage.setItem('symposium_refreshToken', refreshToken)
    localStorage.setItem('symposium_user', JSON.stringify(user))
    return user
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setAuthToken(null)
    localStorage.removeItem('symposium_accessToken')
    localStorage.removeItem('symposium_refreshToken')
    localStorage.removeItem('symposium_user')
  }

  const value = useMemo(() => ({
    user,
    accessToken,
    login,
    register,
    logout,
    loading,
    error,
    setError,
  }), [user, accessToken, loading, error])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
