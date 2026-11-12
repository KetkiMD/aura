import type { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './authContext'
import { supabase } from './supabase'
import { forgetLocal, hasSyncedAccount, startSync } from './sync'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(!supabase)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'SIGNED_OUT' && hasSyncedAccount()) forgetLocal()
      setSession(s)
      setReady(true)
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const userId = session?.user.id
  useEffect(() => {
    if (!userId) return
    return startSync(userId, setSyncing)
  }, [userId])

  return (
    <AuthContext.Provider value={{ enabled: !!supabase, ready, session, syncing }}>{children}</AuthContext.Provider>
  )
}
