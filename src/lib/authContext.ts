import type { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export type Auth = {
  enabled: boolean
  ready: boolean
  session: Session | null
  syncing: boolean
}

export const AuthContext = createContext<Auth>({ enabled: false, ready: true, session: null, syncing: false })

export const useAuth = () => useContext(AuthContext)

export const redirectUrl = (path = '') => `${window.location.origin}${import.meta.env.BASE_URL}${path}`

export function displayName(session: Session | null) {
  const meta = session?.user.user_metadata ?? {}
  return (meta.full_name || meta.name || session?.user.email?.split('@')[0] || '') as string
}
