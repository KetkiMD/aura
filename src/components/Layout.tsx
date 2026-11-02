import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { byId } from '../data/aesthetics'
import { useResult, useVibe } from '../lib/store'
import { applyTheme, DEFAULT_THEME } from '../lib/theme'

const NAV = [
  { to: '/explore', label: 'Explore', icon: '✦' },
  { to: '/me', label: 'My Aesthetic', icon: '◐' },
  { to: '/space', label: 'My Space', icon: '❖' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [result] = useResult()
  const [vibe] = useVibe()
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
          </nav>
          {!result && (
            <Link to="/quiz" className="md:hidden px-4 py-2 rounded-full text-xs bg-accent text-bg font-medium">
              Take the quiz
            </Link>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {active && <MusicPlayer key={active.id} name={active.name} emoji={active.emoji} playlist={active.playlist} />}

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-ink/10">
        <div className="grid grid-cols-3">
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
  )
}

function MusicPlayer({ name, emoji, playlist }: { name: string; emoji: string; playlist: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed z-40 right-4 bottom-20 md:bottom-6 w-[calc(100%-2rem)] max-w-sm">
      {open && (
        <div className="mb-2 rounded-2xl overflow-hidden shadow-2xl fade-up">
          <iframe
            title={`${name} playlist`}
            src={`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block border-0"
          />
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex items-center gap-3 rounded-full bg-surface border border-ink/10 shadow-xl pl-2 pr-5 py-2 text-sm"
      >
        <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-bg">{open ? '✕' : '♪'}</span>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-widest text-muted">Now vibing</span>
          <span className="block font-medium">
            {emoji} {name} playlist
          </span>
        </span>
      </button>
    </div>
  )
}
