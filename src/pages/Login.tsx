import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AESTHETICS, pexelsUrl } from '../data/aesthetics'
import { displayName, redirectUrl, useAuth } from '../lib/authContext'
import { supabase } from '../lib/supabase'
import { forgetLocal } from '../lib/sync'

const COLLAGE = ['coquette', 'old-money', 'cottagecore', 'coastal', 'royal-rajasthani', 'soft-korean'].map(
  (id) => AESTHETICS.find((a) => a.id === id)!.images[2],
)

export default function Login() {
  const { enabled, ready, session, syncing } = useAuth()

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="hidden md:grid grid-cols-3 gap-3 fade-up">
        {COLLAGE.map((id, i) => (
          <img
            key={id}
            src={pexelsUrl(id, 400)}
            alt=""
            className={`w-full object-cover rounded-2xl shadow-xl ${i % 2 ? 'h-56 mt-8' : 'h-64'}`}
          />
        ))}
      </div>
      <div className="max-w-md w-full mx-auto fade-up">
        {!enabled ? (
          <Card title="Login is coming soon">
            <p className="text-muted">Everything you do is saved on this device for now.</p>
          </Card>
        ) : !ready ? (
          <Card title="One sec…" />
        ) : session ? (
          <Account name={displayName(session)} email={session.user.email ?? ''} syncing={syncing} />
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-surface/80 backdrop-blur border border-ink/10 p-8 shadow-2xl">
      <h1 className="font-display text-4xl leading-tight mb-3">{title}</h1>
      {children}
    </div>
  )
}

function SignIn() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const google = async () => {
    const { error } = await supabase!.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl('space') },
    })
    if (error) {
      setState('error')
      setError(error.message)
    }
  }

  const sendLink = async (e: FormEvent) => {
    e.preventDefault()
    setState('sending')
    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl('space') },
    })
    if (error) {
      setState('error')
      setError(error.message)
    } else setState('sent')
  }

  if (state === 'sent')
    return (
      <Card title="Check your inbox ✉️">
        <p className="text-muted">
          We sent a login link to <span className="text-ink font-medium">{email}</span>. Open it on this device and
          you’re in.
        </p>
        <button onClick={() => setState('idle')} className="mt-6 text-sm underline text-muted hover:text-ink">
          Use a different email
        </button>
      </Card>
    )

  return (
    <Card title="Your aura, everywhere">
      <p className="text-muted mb-6">
        Log in to keep your aesthetic, saved pins, moodboards and glow-up calendar on every device.
      </p>
      <button
        onClick={google}
        className="w-full flex items-center justify-center gap-3 rounded-full bg-ink text-bg py-3.5 font-medium hover:opacity-90 transition"
      >
        <GoogleIcon /> Continue with Google
      </button>
      <div className="flex items-center gap-3 my-6 text-xs uppercase tracking-widest text-muted">
        <span className="h-px flex-1 bg-ink/15" /> or <span className="h-px flex-1 bg-ink/15" />
      </div>
      <form onSubmit={sendLink} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full bg-bg/60 border border-ink/15 px-5 py-3.5 outline-none focus:border-accent"
        />
        <button
          disabled={state === 'sending'}
          className="w-full rounded-full bg-accent text-bg py-3.5 font-medium disabled:opacity-60 hover:opacity-90 transition"
        >
          {state === 'sending' ? 'Sending…' : 'Email me a login link'}
        </button>
      </form>
      {state === 'error' && <p className="mt-4 text-sm text-red-500">{error}</p>}
      <p className="mt-6 text-xs text-muted">No password needed. We only use your email to log you in.</p>
    </Card>
  )
}

function Account({ name, email, syncing }: { name: string; email: string; syncing: boolean }) {
  const navigate = useNavigate()
  const logout = async () => {
    await supabase!.auth.signOut()
    forgetLocal()
    navigate('/')
  }
  return (
    <Card title={`Hi, ${name} ✨`}>
      <p className="text-muted">{email}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-bg/60 px-4 py-2 text-sm">
        <span className={`w-2 h-2 rounded-full ${syncing ? 'bg-accent animate-pulse' : 'bg-green-500'}`} />
        {syncing ? 'Syncing…' : 'Synced across your devices'}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/space" className="rounded-full bg-accent text-bg px-6 py-3 font-medium">
          Go to My Space
        </Link>
        <button onClick={logout} className="rounded-full border border-ink/20 px-6 py-3">
          Log out
        </button>
      </div>
    </Card>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}
