import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Link, useSearchParams } from 'react-router-dom'
import { blendName, blendPalette, byId, pexelsUrl } from '../data/aesthetics'
import { encodeMatch } from '../lib/match'
import type { Result } from '../lib/store'
import { useResult, useStored } from '../lib/store'

export default function MyAesthetic() {
  const [result] = useResult()
  const [params] = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  if (!result)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">You haven’t found your aesthetic yet</h1>
        <p className="text-muted mt-4">Take the 1-minute quiz and AURA will style itself around you.</p>
        <Link to="/quiz" className="inline-block mt-8 px-7 py-4 rounded-full bg-accent text-bg font-medium">
          Take the quiz →
        </Link>
      </div>
    )

  const a = byId(result.primary)!
  const b = byId(result.secondary)!
  const total = Object.values(result.scores).reduce((s, n) => s + n, 0) || 1
  const pct = (id: string) => Math.round((result.scores[id] / total) * 100)
  const ranked = Object.keys(result.scores).filter((id) => result.scores[id] > 0).sort((x, y) => result.scores[y] - result.scores[x])

  async function makePng() {
    return toPng(cardRef.current!, { pixelRatio: 3, cacheBust: true })
  }
  async function download() {
    setBusy(true)
    try {
      const url = await makePng()
      const link = document.createElement('a')
      link.download = `my-aura-${a.id}.png`
      link.href = url
      link.click()
    } finally {
      setBusy(false)
    }
  }
  async function share() {
    setBusy(true)
    try {
      const url = await makePng()
      const blob = await (await fetch(url)).blob()
      const file = new File([blob], `my-aura-${a.id}.png`, { type: 'image/png' })
      const data = { files: [file], title: 'My AURA', text: `My aesthetic is ${a.name} ✨ What’s yours?` }
      if (navigator.canShare?.(data)) await navigator.share(data)
      else await download()
    } catch {
      /* user cancelled */
    } finally {
      setBusy(false)
    }
  }
  function copy(hex: string) {
    navigator.clipboard?.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
      {params.get('new') && <p className="text-center text-sm text-muted mb-2 fade-up">✨ The whole app just re-styled itself for you</p>}
      <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
        <div className="fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Your aesthetic is</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3">
            {blendName(a, b)} <span className="text-accent">{a.emoji}</span>
          </h1>
          <p className="font-display italic text-2xl text-muted mt-2">
            {a.name} with a touch of {b.name}
          </p>
          <p className="mt-6 text-lg max-w-2xl leading-relaxed">{a.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {a.keywords.map((k) => (
              <span key={k} className="px-3 py-1.5 rounded-full text-sm border border-ink/15">
                {k}
              </span>
            ))}
          </div>

          <h3 className="font-display text-2xl mt-12 mb-4">Your palette</h3>
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {blendPalette(a, b).map((c) => (
              <button key={c} onClick={() => copy(c)} className="text-left group">
                <span className="block aspect-square rounded-2xl border border-ink/10 shadow-sm group-hover:-translate-y-1 transition" style={{ background: c }} />
                <span className="block text-xs mt-2 text-muted uppercase">{copied === c ? 'Copied!' : c}</span>
              </button>
            ))}
          </div>

          <h3 className="font-display text-2xl mt-12 mb-4">Your blend</h3>
          <div className="space-y-3 max-w-lg">
            {ranked.map((id) => (
              <div key={id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    {byId(id)!.emoji} {byId(id)!.name}
                  </span>
                  <span className="text-muted">{pct(id)}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${pct(id)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-12">
            <IdeaCard title="Outfit ideas" items={a.outfits} />
            <IdeaCard title="Room ideas" items={a.rooms} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-12">
            {a.images.slice(5, 8).map((id) => (
              <img key={id} src={pexelsUrl(id, 500)} alt="" className="rounded-2xl aspect-[3/4] object-cover w-full" />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link to="/explore" className="px-6 py-3 rounded-full bg-accent text-bg font-medium">
              Explore my feed →
            </Link>
            <Link to="/quiz" className="px-6 py-3 rounded-full border border-ink/20">
              Retake quiz
            </Link>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 fade-up" style={{ animationDelay: '.15s' }}>
          <ShareCard refEl={cardRef} result={{ a, b, pct: pct(a.id) }} />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button disabled={busy} onClick={share} className="py-3 rounded-full bg-accent text-bg font-medium disabled:opacity-50">
              {busy ? '…' : 'Share'}
            </button>
            <button disabled={busy} onClick={download} className="py-3 rounded-full border border-ink/20 disabled:opacity-50">
              Download
            </button>
          </div>
          <p className="text-xs text-muted text-center mt-3">Post it to your story ✨</p>
          <InvitePanel result={result} />
        </div>
      </div>
    </div>
  )
}

function IdeaCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-surface border border-ink/10 p-6">
      <h4 className="font-display text-xl mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted">
        {items.map((i) => (
          <li key={i}>— {i}</li>
        ))}
      </ul>
    </div>
  )
}

type CardProps = {
  refEl: React.RefObject<HTMLDivElement | null>
  result: { a: NonNullable<ReturnType<typeof byId>>; b: NonNullable<ReturnType<typeof byId>>; pct: number }
}

function ShareCard({ refEl, result: { a, b, pct } }: CardProps) {
  const t = a.theme
  return (
    <div
      ref={refEl}
      className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden p-7 flex flex-col"
      style={{ background: `linear-gradient(160deg, ${t.bg} 0%, ${t.surface} 55%, ${t.accent2} 140%)`, color: t.ink }}
    >
      <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full blur-3xl opacity-60" style={{ background: t.accent }} />
      <div className="absolute bottom-10 -left-20 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ background: t.accent2 }} />
      <div className="relative flex justify-between items-center text-xs tracking-[0.3em]">
        <span>AURA</span>
        <span style={{ color: t.muted }}>MY AESTHETIC</span>
      </div>
      <div className="relative mt-auto">
        <div className="text-6xl">{a.emoji}</div>
        <div className="font-display text-5xl leading-none mt-4">{blendName(a, b)}</div>
        <div className="font-display italic text-xl mt-2" style={{ color: t.muted }}>
          {a.name} × {b.name}
        </div>
        <p className="text-sm mt-5 leading-relaxed" style={{ color: t.muted }}>
          {a.tagline}
        </p>
        <div className="flex mt-6 rounded-xl overflow-hidden h-12">
          {blendPalette(a, b).map((c) => (
            <span key={c} className="flex-1" style={{ background: c }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {a.keywords.slice(0, 4).map((k) => (
            <span key={k} className="text-[11px] px-2.5 py-1 rounded-full" style={{ border: `1px solid ${t.ink}33` }}>
              {k}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-8 flex justify-between items-end text-xs" style={{ color: t.muted }}>
        <span>{pct}% {a.name.toLowerCase()}</span>
        <span>what’s yours? ✦ aura</span>
      </div>
    </div>
  )
}

function InvitePanel({ result }: { result: Result }) {
  const [nick, setNick] = useStored<string>('aura.nick', '')
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}/match?u=${encodeMatch(result, nick || 'Your friend')}`
  const text = `I got my AURA aesthetic ✨ Take the quiz and see how vibe-compatible we are: ${link}`
  return (
    <div className="mt-8 rounded-3xl bg-surface border border-ink/10 p-5">
      <h3 className="font-display text-xl">Compare with a friend 💞</h3>
      <p className="text-sm text-muted mt-1">Send your link. They take the quiz and you both see your vibe match %.</p>
      <input
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        placeholder="Your name or nickname"
        maxLength={24}
        className="w-full mt-4 px-4 py-2.5 rounded-full bg-bg border border-ink/10 outline-none focus:border-accent text-sm"
      />
      <div className="grid grid-cols-2 gap-2 mt-3">
        <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" className="py-2.5 rounded-full bg-[#25D366] text-white text-sm text-center font-medium">
          WhatsApp
        </a>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
          className="py-2.5 rounded-full border border-ink/20 text-sm"
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
