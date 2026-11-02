import { useEffect, useMemo, useRef, useState } from 'react'
import { AESTHETICS, byId, pexelsPage, pexelsUrl } from '../data/aesthetics'
import { useResult, useSaved, useVibe } from '../lib/store'

const PAGE = 16
type Pin = { id: string; a: string }

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Explore() {
  const [result] = useResult()
  const [vibe, setVibe] = useVibe()
  const [saved, setSaved] = useSaved()
  const [count, setCount] = useState(PAGE)
  const [open, setOpen] = useState<Pin | null>(null)
  const sentinel = useRef<HTMLDivElement>(null)

  const pool = useMemo<Pin[]>(() => {
    if (vibe) return shuffle(byId(vibe)!.images.map((id) => ({ id, a: vibe })))
    const weight = (id: string) => (result?.primary === id ? 4 : result?.secondary === id ? 3 : result && byId(result.primary)!.related.includes(id) ? 2 : 1)
    const queues = AESTHETICS.map((a) => ({ id: a.id, imgs: shuffle(a.images) })).sort((x, y) => weight(y.id) - weight(x.id))
    const out: Pin[] = []
    while (queues.some((q) => q.imgs.length))
      for (const q of queues) for (let i = 0; i < weight(q.id) && q.imgs.length; i++) out.push({ id: q.imgs.shift()!, a: q.id })
    return out
  }, [vibe, result])

  const feed = useMemo(() => Array.from({ length: count }, (_, i) => ({ ...pool[i % pool.length], key: `${i}` })), [pool, count])

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setCount((c) => c + PAGE), { rootMargin: '800px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const toggle = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [id, ...s]))
  const chips = [{ id: null as string | null, label: result ? '✦ For you' : '✦ All vibes' }, ...AESTHETICS.map((a) => ({ id: a.id as string | null, label: `${a.emoji} ${a.name}` }))]

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-5 py-6">
      <div className="sticky top-16 z-20 -mx-4 px-4 py-3 bg-bg/80 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setVibe(c.id)
                setCount(PAGE)
                window.scrollTo({ top: 0 })
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-sm border transition ${vibe === c.id ? 'bg-ink text-bg border-ink' : 'border-ink/15 text-muted hover:text-ink'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="masonry mt-4">
        {feed.map((p) => (
          <PinCard key={p.key} pin={p} saved={saved.includes(p.id)} onSave={() => toggle(p.id)} onOpen={() => setOpen(p)} />
        ))}
      </div>
      <div ref={sentinel} className="h-10" />

      {open && <PinModal pin={open} saved={saved} onSave={toggle} onOpen={setOpen} onClose={() => setOpen(null)} />}
    </div>
  )
}

function PinCard({ pin, saved, onSave, onOpen }: { pin: Pin; saved: boolean; onSave: () => void; onOpen: () => void }) {
  const a = byId(pin.a)!
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-surface cursor-zoom-in" onClick={onOpen}>
      <img src={pexelsUrl(pin.id, 600)} alt={a.name} loading="lazy" className="w-full block min-h-24" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition" />
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSave()
        }}
        className={`absolute top-3 right-3 px-4 py-2 rounded-full text-sm font-medium transition md:opacity-0 group-hover:opacity-100 ${saved ? 'bg-accent text-bg md:opacity-100' : 'bg-white/90 text-black'}`}
      >
        {saved ? 'Saved ♥' : 'Save'}
      </button>
      <span className="absolute bottom-3 left-3 text-[11px] text-white opacity-0 group-hover:opacity-100 transition">
        {a.emoji} {a.name}
      </span>
    </div>
  )
}

function PinModal({ pin, saved, onSave, onOpen, onClose }: { pin: Pin; saved: string[]; onSave: (id: string) => void; onOpen: (p: Pin) => void; onClose: () => void }) {
  const a = byId(pin.a)!
  const more = useMemo(() => shuffle(a.images.filter((id) => id !== pin.id)).slice(0, 12), [a, pin.id])
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pin, onClose])
  const isSaved = saved.includes(pin.id)
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div ref={scroller} className="h-full overflow-y-auto py-6 md:py-12 px-3">
        <div className="mx-auto max-w-4xl rounded-3xl bg-bg text-ink overflow-hidden fade-up" onClick={(e) => e.stopPropagation()}>
          <div className="grid md:grid-cols-2">
            <img src={pexelsUrl(pin.id, 1200)} alt={a.name} className="w-full max-h-[75vh] object-cover bg-surface" />
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted">
                  {a.emoji} {a.name}
                </span>
                <button onClick={onClose} className="w-9 h-9 rounded-full border border-ink/15" aria-label="Close">
                  ✕
                </button>
              </div>
              <h3 className="font-display text-3xl mt-4">{a.tagline}</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {a.keywords.map((k) => (
                  <span key={k} className="px-3 py-1 rounded-full text-xs border border-ink/15">
                    {k}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto pt-8">
                <button onClick={() => onSave(pin.id)} className={`flex-1 py-3 rounded-full font-medium ${isSaved ? 'bg-ink text-bg' : 'bg-accent text-bg'}`}>
                  {isSaved ? 'Saved ♥' : 'Save'}
                </button>
                <a href={pexelsPage(pin.id)} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-full border border-ink/20 text-sm">
                  Photo on Pexels ↗
                </a>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <h4 className="font-display text-2xl mb-4">More like this</h4>
            <div className="masonry">
              {more.map((id) => (
                <img key={id} src={pexelsUrl(id, 400)} alt="" loading="lazy" onClick={() => onOpen({ id, a: pin.a })} className="w-full rounded-xl cursor-pointer hover:opacity-90" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
