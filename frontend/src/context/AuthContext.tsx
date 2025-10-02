import React, { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface User {
  _id: string
  email: string
  name: {
    first: string
    middle?: string
    last: string
  }
  isBusiness: boolean
  isAdmin: boolean
  phone: string
  image: {
    url: string
    alt: string
  }
  address: {
    state?: string
    country: string
    city: string
    street: string
    houseNumber: number
    zip?: number
  }
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateUser: (userData: any) => Promise<void>
  toggleBusinessStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/users/profile`)
      setUser(response.data.user)
    } catch (error) {
      // Log error in development only
      if (import.meta.env.DEV) {
        console.error('Failed to fetch user:', error)
      }
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/users/login`, { email, password })
      const { token: newToken, user: userData } = response.data
      
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      setToken(newToken)
      setUser(userData)
      
      toast.success('Login successful!')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed')
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/users`, userData)
      const { token: newToken, user: newUser } = response.data
      
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      setToken(newToken)
      setUser(newUser)
      
      toast.success('Registration successful!')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
    toast.success('Logged out successfully')
  }

  const updateUser = async (userData: any) => {
    if (!user) return
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/users/${user._id}`, userData)
      setUser(response.data.user)
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Update failed')
      throw error
    }
  }

  const toggleBusinessStatus = async () => {
    if (!user) return
    
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/users/${user._id}`)
      setUser(response.data.user)
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to toggle business status')
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateUser,
      toggleBusinessStatus
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
