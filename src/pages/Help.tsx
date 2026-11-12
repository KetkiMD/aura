import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, mailto } from '../data/site'

const FAQ = [
  {
    q: 'What is AURA?',
    a: 'A place to find your aesthetic. Take the quiz, browse pins for your vibe, build moodboards, plan glow-up rituals and play music that matches your mood.',
  },
  { q: 'Is it free?', a: 'Yes. Everything on AURA is free to use.' },
  {
    q: "My login email didn't arrive",
    a: 'Check your spam or promotions folder and wait a minute before requesting another link. Still nothing? Email us with the address you used.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Without one, everything is saved on this device. Log in to keep your result, pins, boards, rituals and playlist in sync across devices.',
  },
  {
    q: 'Why do ads play between songs?',
    a: "Music plays through YouTube's official player, so YouTube may show its own ads. AURA doesn't host or download any songs.",
  },
  {
    q: 'A song or photo is wrong or broken',
    a: 'Email us the song name or a screenshot and we will fix it. Broken videos are skipped automatically.',
  },
  {
    q: 'How do I delete my account and data?',
    a: "Email us from the address you log in with and we'll delete your account and everything saved in it. Your data on this device clears when you log out.",
  },
  {
    q: 'Where do the photos come from?',
    a: 'Photos are from Pexels and belong to their photographers. Tap a pin to see a link to the original.',
  },
]

export default function Help() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-8 pb-40 md:py-12">
      <h1 className="font-display text-4xl md:text-5xl">Help & contact</h1>
      <p className="text-muted mt-2">Questions, feedback or something not working? We're happy to help.</p>

      <div className="mt-8 rounded-3xl bg-surface/70 border border-ink/10 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xs uppercase tracking-widest text-muted">Email us</h2>
          <p className="font-medium mt-1 break-all">{CONTACT_EMAIL || 'Our support email is coming soon.'}</p>
          <p className="text-sm text-muted mt-1">We usually reply within 1–2 days.</p>
        </div>
        {CONTACT_EMAIL && (
          <a href={mailto('AURA help')} className="shrink-0 px-5 py-3 rounded-full bg-accent text-bg font-medium text-center">
            ✉ Email us
          </a>
        )}
      </div>

      <h2 className="text-xs uppercase tracking-widest text-muted mt-12 mb-3">Common questions</h2>
      <div className="space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="group rounded-2xl bg-surface/60 border border-ink/10 px-5 py-4">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium">
              {f.q}
              <span className="text-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="text-sm text-muted mt-3">{f.a}</p>
          </details>
        ))}
      </div>

      <p className="text-sm text-muted mt-10">
        New here? <Link to="/quiz" className="underline">Take the quiz</Link> to find your aesthetic.
      </p>
    </div>
  )
}
