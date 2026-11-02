import { useEffect, useMemo, useRef, useState } from 'react'
import { AESTHETICS, byId, pexelsPage, pexelsUrl } from '../data/aesthetics'
import { useResult, useSaved, useVibe } from '../lib/store'

const PAGE = 16

export default function Explore() {
  const [result] = useResult()
  const [vibe, setVibe] = useVibe()
  const [saved, setSaved] = useSaved()
  const [count, setCount] = useState(PAGE)
  const sentinel = useRef<HTMLDivElement>(null)

  const pins = useMemo(() => {
    if (vibe) return byId(vibe)!.images.map((id) => ({ id, a: vibe }))
    const order = result
      ? [result.primary, result.secondary, ...AESTHETICS.map((a) => a.id).filter((id) => id !== result.primary && id !== result.secondary)]
      : AESTHETICS.map((a) => a.id)
    const weight = (id: string) => (result?.primary === id ? 3 : result?.secondary === id ? 2 : 1)
    const queues = order.map((id) => ({ id, imgs: [...byId(id)!.images] }))
    const out: { id: string; a: string }[] = []
    while (queues.some((q) => q.imgs.length)) {
      for (const q of queues) for (let i = 0; i < weight(q.id) && q.imgs.length; i++) out.push({ id: q.imgs.shift()!, a: q.id })
    }
    return out
  }, [vibe, result])

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setCount((c) => c + PAGE), { rootMargin: '600px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

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
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-sm border transition ${
                vibe === c.id ? 'bg-ink text-bg border-ink' : 'border-ink/15 text-muted hover:text-ink'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="masonry mt-4">
        {pins.slice(0, count).map(({ id, a }) => {
          const isSaved = saved.includes(id)
          return (
            <div key={id} className="group relative rounded-2xl overflow-hidden bg-surface">
              <img src={pexelsUrl(id, 600)} alt={byId(a)!.name} loading="lazy" className="w-full block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition" />
              <button
                onClick={() => toggle(id)}
                className={`absolute top-3 right-3 px-4 py-2 rounded-full text-sm font-medium transition md:opacity-0 group-hover:opacity-100 ${
                  isSaved ? 'bg-accent text-bg md:opacity-100' : 'bg-white/90 text-black'
                }`}
              >
                {isSaved ? 'Saved ♥' : 'Save'}
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[11px] text-white opacity-0 group-hover:opacity-100 transition">
                <span>
                  {byId(a)!.emoji} {byId(a)!.name}
                </span>
                <a href={pexelsPage(id)} target="_blank" rel="noreferrer" className="underline">
                  Pexels
                </a>
              </div>
            </div>
          )
        })}
      </div>
      <div ref={sentinel} className="h-10" />
      {count >= pins.length && <p className="text-center text-muted text-sm py-10">You’ve seen every vibe for now — more drops soon ✦</p>}
    </div>
  )
}
