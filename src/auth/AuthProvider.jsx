import { createContext, useContext, useMemo, useState } from 'react'
import { login, logoutUser, register, verifyRegisterPhoneOtp } from '../api/auth'
import { setAccessToken } from '../api/client'
import { displayName } from '../api/mapListing'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  function applySession(payload) {
    const nextToken = payload?.token ?? null
    const nextUser = payload?.user ?? null
    setAccessToken(nextToken)
    setToken(nextToken)
    setUser(nextUser)
    return { token: nextToken, user: nextUser }
  }

  function clearSession() {
    setAccessToken(null)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthed: Boolean(token),
      displayName: displayName(user),
      applySession,
      clearSession,
      async signIn(credentials) {
        const payload = await login(credentials)
        return applySession(payload)
      },
      async signUp(body) {
        return register(body)
      },
      async verifySignupOtp(body) {
        const payload = await verifyRegisterPhoneOtp(body)
        return applySession(payload)
      },
      async signOut() {
        try {
          if (token) await logoutUser()
        } finally {
          clearSession()
        }
      },
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
