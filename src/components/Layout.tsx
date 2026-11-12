import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { byId } from '../data/aesthetics'
import { useAuth } from '../lib/authContext'
import { MusicProvider } from '../lib/music'
import Player from './Player'

const DEFAULT_VIBE = 'clean-girl'
import { useResult, useVibe } from '../lib/store'
import { applyTheme, DEFAULT_THEME } from '../lib/theme'

const NAV = [
  { to: '/explore', label: 'Explore', icon: '✦' },
  { to: '/me', label: 'My Aesthetic', icon: '◐' },
  { to: '/space', label: 'My Space', icon: '❖' },
  { to: '/music', label: 'Music', icon: '♪' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [result] = useResult()
  const [vibe] = useVibe()
  const auth = useAuth()
  const signature = pathname === '/' || pathname === '/quiz'
  const activeId = signature ? null : (pathname === '/explore' ? vibe : null) ?? result?.primary ?? null
  const active = activeId ? byId(activeId) : undefined

  useEffect(() => {
    applyTheme(active?.theme ?? DEFAULT_THEME)
  }, [active])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <MusicProvider>
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-bg/70 border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-[0.25em]">
            <span className={active ? 'text-ink' : 'aura-gradient'}>AURA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm transition ${isActive ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            {!result && (
              <Link to="/quiz" className="ml-2 px-4 py-2 rounded-full text-sm bg-accent text-bg font-medium">
                Take the quiz
              </Link>
            )}
            <AccountButton {...auth} />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            {!result && (
              <Link to="/quiz" className="px-4 py-2 rounded-full text-xs bg-accent text-bg font-medium">
                Take the quiz
              </Link>
            )}
            <AccountButton {...auth} />
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {pathname !== '/' && (
        <footer className="border-t border-ink/10 py-6 text-center text-xs text-muted">
          © AURA · <Link to="/help" className="underline hover:text-ink">Help & contact</Link>
        </footer>
      )}

      <Player vibe={active?.id ?? result?.primary ?? (pathname === '/explore' ? vibe : null) ?? DEFAULT_VIBE} />

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-ink/10">
        <div className="grid grid-cols-4">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 text-xs gap-1 ${isActive ? 'text-accent' : 'text-muted'}`
              }
            >
              <span className="text-lg leading-none">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
    </MusicProvider>
  )
}

function AccountButton({ enabled, session }: ReturnType<typeof useAuth>) {
  if (!enabled) return null
  if (!session)
    return (
      <Link to="/login" className="ml-1 px-4 py-2 rounded-full text-xs md:text-sm border border-ink/20 hover:border-ink/50">
        Log in
      </Link>
    )
  const meta = session.user.user_metadata ?? {}
  const pic = (meta.avatar_url || meta.picture) as string | undefined
  const initial = ((meta.full_name || session.user.email || '?') as string)[0].toUpperCase()
  return (
    <Link to="/login" title="Your account" className="ml-1 w-9 h-9 rounded-full overflow-hidden grid place-items-center bg-accent text-bg font-medium">
      {pic ? <img src={pic} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" /> : initial}
    </Link>
  )
}
