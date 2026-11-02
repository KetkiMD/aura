import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AESTHETICS, blendName, blendPalette, byId } from '../data/aesthetics'
import { compatibility, decodeMatch, matchLabel, scoresToVector } from '../lib/match'
import { useResult, useStored } from '../lib/store'

export default function Match() {
  const [params] = useSearchParams()
  const code = params.get('u')
  const friend = decodeMatch(code)
  const [result] = useResult()
  const [nick] = useStored<string>('aura.nick', '')
  const [, setPending] = useStored<string | null>('aura.pendingMatch', null)
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  if (!friend)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">This match link looks broken</h1>
        <Link to="/quiz" className="inline-block mt-8 px-7 py-4 rounded-full bg-accent text-bg font-medium">
          Take the quiz anyway →
        </Link>
      </div>
    )

  const fa = byId(friend.p)!
  const fb = byId(friend.s) ?? fa
  const name = friend.n || 'Your friend'

  if (!result)
    return (
      <div className="relative mx-auto max-w-2xl px-5 py-20 text-center fade-up">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Vibe match invite</p>
        <h1 className="font-display text-4xl md:text-6xl mt-4">
          {name} is a <span className="aura-gradient">{blendName(fa, fb)}</span>
        </h1>
        <div className="flex justify-center mt-6 rounded-2xl overflow-hidden h-10 max-w-xs mx-auto">
          {blendPalette(fa, fb).map((c) => (
            <span key={c} className="flex-1" style={{ background: c }} />
          ))}
        </div>
        <p className="text-lg text-muted mt-6">Take the 1-minute quiz to find your aesthetic and see how vibe-compatible you two are.</p>
        <button
          onClick={() => {
            setPending(code)
            navigate('/quiz')
          }}
          className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#ff9ad5] via-[#b79cff] to-[#7fe3ff] text-[#0e0b14] font-semibold"
        >
          Find my aesthetic & match →
        </button>
      </div>
    )

  const me = byId(result.primary)!
  const me2 = byId(result.secondary)!
  const pct = compatibility(scoresToVector(result.scores), friend.v)
  const label = matchLabel(pct)
  const mine = scoresToVector(result.scores)
  const shared = AESTHETICS.map((a, i) => ({ a, v: Math.min(mine[i], friend.v[i] ?? 0) }))
    .filter((x) => x.v > 0)
    .sort((x, y) => y.v - x.v)
    .slice(0, 3)
  const t = me.theme

  async function download() {
    setBusy(true)
    try {
      const url = await toPng(cardRef.current!, { pixelRatio: 3, cacheBust: true })
      const link = document.createElement('a')
      link.download = `aura-match-${pct}.png`
      link.href = url
      link.click()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:py-16 grid md:grid-cols-[1fr_360px] gap-10 items-start">
      <div className="fade-up">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Vibe match</p>
        <h1 className="font-display text-6xl md:text-8xl mt-3 text-accent">{pct}%</h1>
        <h2 className="font-display text-3xl md:text-4xl mt-2">{label.title}</h2>
        <p className="text-lg text-muted mt-3">{label.text}</p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          {[
            { who: nick || 'You', a: me, b: me2 },
            { who: name, a: fa, b: fb },
          ].map((p) => (
            <div key={p.who} className="rounded-3xl bg-surface border border-ink/10 p-5">
              <div className="text-xs text-muted uppercase tracking-widest">{p.who}</div>
              <div className="font-display text-2xl mt-2">
                {p.a.emoji} {blendName(p.a, p.b)}
              </div>
              <div className="text-sm text-muted mt-1">
                {p.a.name} × {p.b.name}
              </div>
              <div className="flex mt-4 rounded-lg overflow-hidden h-6">
                {blendPalette(p.a, p.b).map((c) => (
                  <span key={c} className="flex-1" style={{ background: c }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {shared.length > 0 && (
          <p className="mt-8">
            <span className="text-muted">Shared vibes: </span>
            {shared.map((x) => `${x.a.emoji} ${x.a.name}`).join(' · ')}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-10">
          <Link to="/me" className="px-6 py-3 rounded-full bg-accent text-bg font-medium">
            Send my own link →
          </Link>
          <Link to="/explore" className="px-6 py-3 rounded-full border border-ink/20">
            Explore my feed
          </Link>
        </div>
      </div>

      <div className="fade-up" style={{ animationDelay: '.15s' }}>
        <div
          ref={cardRef}
          className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden p-7 flex flex-col"
          style={{ background: `linear-gradient(160deg, ${t.bg}, ${fa.theme.bg})`, color: t.ink }}
        >
          <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full blur-3xl opacity-60" style={{ background: t.accent }} />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full blur-3xl opacity-60" style={{ background: fa.theme.accent }} />
          <div className="relative text-xs tracking-[0.3em]">AURA · VIBE MATCH</div>
          <div className="relative my-auto text-center">
            <div className="font-display text-8xl">{pct}%</div>
            <div className="font-display text-2xl mt-2">{label.title}</div>
            <div className="mt-8 space-y-1 text-sm">
              <div>
                {nick || 'Me'} · {me.emoji} {blendName(me, me2)}
              </div>
              <div className="opacity-70">×</div>
              <div>
                {name} · {fa.emoji} {blendName(fa, fb)}
              </div>
            </div>
          </div>
          <div className="relative text-xs text-center opacity-80">what’s your match? ✦ aura</div>
        </div>
        <button disabled={busy} onClick={download} className="w-full mt-4 py-3 rounded-full bg-accent text-bg font-medium disabled:opacity-50">
          {busy ? '…' : 'Download match card'}
        </button>
      </div>
    </div>
  )
}
