import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { pexelsUrl } from '../data/aesthetics'
import type { Ritual } from '../lib/store'
import { todayISO, uid, useBoards, useRituals, useSaved } from '../lib/store'

const SUGGESTIONS: Omit<Ritual, 'id' | 'lastDone' | 'streak'>[] = [
  { title: 'Hair trim', emoji: '✂️', everyDays: 45 },
  { title: 'Hair oiling', emoji: '🫧', everyDays: 4 },
  { title: 'Nails', emoji: '💅', everyDays: 14 },
  { title: 'Brows', emoji: '🪞', everyDays: 21 },
  { title: 'Face mask', emoji: '🧖‍♀️', everyDays: 7 },
  { title: 'Change bedsheets', emoji: '🛏️', everyDays: 7 },
  { title: 'Water plants', emoji: '🪴', everyDays: 3 },
  { title: 'Room refresh', emoji: '🕯️', everyDays: 30 },
]

const DAY = 86400000
const toDate = (iso: string) => new Date(iso + 'T00:00:00')
const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (iso: string, n: number) => toISO(new Date(toDate(iso).getTime() + n * DAY))
const nextDue = (r: Ritual) => addDays(r.lastDone, r.everyDays)
const daysUntil = (iso: string) => Math.round((toDate(iso).getTime() - toDate(todayISO()).getTime()) / DAY)

export default function MySpace() {
  const [tab, setTab] = useState<'boards' | 'calendar'>('boards')
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl md:text-5xl">My Space</h1>
      <div className="inline-flex mt-6 p-1 rounded-full bg-surface border border-ink/10">
        {(['boards', 'calendar'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm transition ${tab === t ? 'bg-accent text-bg' : 'text-muted'}`}
          >
            {t === 'boards' ? 'Moodboards' : 'Glow-up calendar'}
          </button>
        ))}
      </div>
      <div className="mt-8">{tab === 'boards' ? <Boards /> : <Calendar />}</div>
    </div>
  )
}

function Boards() {
  const [saved, setSaved] = useSaved()
  const [boards, setBoards] = useBoards()
  const [name, setName] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const open = boards.find((b) => b.id === openId)

  function create() {
    if (!name.trim()) return
    setBoards((bs) => [...bs, { id: uid(), name: name.trim(), pins: [] }])
    setName('')
  }
  function addTo(boardId: string, pin: string) {
    setBoards((bs) => bs.map((b) => (b.id === boardId && !b.pins.includes(pin) ? { ...b, pins: [pin, ...b.pins] } : b)))
  }

  if (open)
    return (
      <div>
        <button onClick={() => setOpenId(null)} className="text-sm text-muted mb-4">
          ← All boards
        </button>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl">{open.name}</h2>
          <button
            onClick={() => {
              setBoards((bs) => bs.filter((b) => b.id !== open.id))
              setOpenId(null)
            }}
            className="text-sm text-muted hover:text-ink"
          >
            Delete board
          </button>
        </div>
        {open.pins.length === 0 && <p className="text-muted mt-6">Empty board. Add pins from your saved images.</p>}
        <div className="masonry mt-6">
          {open.pins.map((p) => (
            <div key={p} className="group relative rounded-2xl overflow-hidden">
              <img src={pexelsUrl(p, 500)} alt="" className="w-full block" />
              <button
                onClick={() => setBoards((bs) => bs.map((b) => (b.id === open.id ? { ...b, pins: b.pins.filter((x) => x !== p) } : b)))}
                className="absolute top-2 right-2 px-3 py-1 rounded-full bg-white/90 text-black text-xs md:opacity-0 group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div>
      <div className="flex gap-2 max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && create()}
          placeholder="New board, e.g. Dream room"
          className="flex-1 px-4 py-3 rounded-full bg-surface border border-ink/10 outline-none focus:border-accent"
        />
        <button onClick={create} className="px-5 rounded-full bg-accent text-bg font-medium">
          Create
        </button>
      </div>

      {boards.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {boards.map((b) => (
            <button key={b.id} onClick={() => setOpenId(b.id)} className="text-left group">
              <div className="grid grid-cols-2 gap-1 aspect-square rounded-2xl overflow-hidden bg-surface border border-ink/10">
                {[0, 1, 2, 3].map((i) =>
                  b.pins[i] ? (
                    <img key={i} src={pexelsUrl(b.pins[i], 300)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span key={i} className="bg-ink/5" />
                  ),
                )}
              </div>
              <div className="mt-2 font-medium">{b.name}</div>
              <div className="text-xs text-muted">{b.pins.length} pins</div>
            </button>
          ))}
        </div>
      )}

      <h2 className="font-display text-2xl mt-12 mb-4">Saved ({saved.length})</h2>
      {saved.length === 0 ? (
        <p className="text-muted">
          Nothing saved yet.{' '}
          <Link to="/explore" className="text-accent underline">
            Explore your feed
          </Link>{' '}
          and tap Save on anything you love.
        </p>
      ) : (
        <div className="masonry">
          {saved.map((p) => (
            <div key={p} className="group relative rounded-2xl overflow-hidden">
              <img src={pexelsUrl(p, 500)} alt="" className="w-full block" />
              <div className="absolute inset-x-2 bottom-2 flex gap-2 md:opacity-0 group-hover:opacity-100 transition">
                {boards.length > 0 && (
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) addTo(e.target.value, p)
                      e.target.value = ''
                    }}
                    className="flex-1 min-w-0 px-2 py-1.5 rounded-full bg-white/90 text-black text-xs"
                  >
                    <option value="" disabled>
                      + Add to board
                    </option>
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                )}
                <button onClick={() => setSaved((s) => s.filter((x) => x !== p))} className="px-3 py-1.5 rounded-full bg-white/90 text-black text-xs">
                  Unsave
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Calendar() {
  const [rituals, setRituals] = useRituals()
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [form, setForm] = useState({ title: '', emoji: '✨', everyDays: 7 })
  const today = todayISO()

  const dueMap = useMemo(() => {
    const map: Record<string, Ritual[]> = {}
    const end = toISO(new Date(month.getFullYear(), month.getMonth() + 1, 0))
    const start = toISO(month)
    for (const r of rituals) {
      let d = nextDue(r)
      while (d <= end) {
        if (d >= start) (map[d] ||= []).push(r)
        d = addDays(d, r.everyDays)
      }
    }
    return map
  }, [rituals, month])

  function add(r: Omit<Ritual, 'id' | 'lastDone' | 'streak'>) {
    if (!r.title.trim() || r.everyDays < 1) return
    setRituals((rs) => [...rs, { ...r, id: uid(), lastDone: today, streak: 0 }])
  }
  function done(id: string) {
    setRituals((rs) =>
      rs.map((r) => (r.id === id ? { ...r, lastDone: today, streak: daysUntil(nextDue(r)) >= -1 ? r.streak + 1 : 1 } : r)),
    )
  }

  const firstWeekday = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const sorted = [...rituals].sort((a, b) => nextDue(a).localeCompare(nextDue(b)))

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="rounded-3xl bg-surface border border-ink/10 p-5 md:p-7">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="w-9 h-9 rounded-full border border-ink/15">
            ‹
          </button>
          <h3 className="font-display text-2xl">{month.toLocaleString('en', { month: 'long', year: 'numeric' })}</h3>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="w-9 h-9 rounded-full border border-ink/15">
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs text-muted mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {cells.map((day, i) => {
            if (!day) return <span key={i} />
            const iso = toISO(new Date(month.getFullYear(), month.getMonth(), day))
            const due = dueMap[iso] ?? []
            const isToday = iso === today
            return (
              <div
                key={i}
                className={`aspect-square rounded-xl p-1 md:p-2 flex flex-col ${isToday ? 'bg-accent text-bg' : due.length ? 'bg-accent2/30' : 'bg-ink/5'}`}
              >
                <span className="text-xs md:text-sm font-medium">{day}</span>
                <span className="mt-auto text-[10px] md:text-sm leading-none truncate">{due.map((r) => r.emoji).join('')}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-display text-2xl mb-3">Coming up</h3>
          {sorted.length === 0 && <p className="text-muted text-sm">Add your first ritual below — AURA will remember the dates for you.</p>}
          <div className="space-y-2">
            {sorted.map((r) => {
              const n = daysUntil(nextDue(r))
              return (
                <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-surface border border-ink/10 p-3">
                  <span className="text-2xl">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.title}</div>
                    <div className={`text-xs ${n <= 0 ? 'text-accent' : 'text-muted'}`}>
                      {n < 0 ? `${-n} day${n === -1 ? '' : 's'} overdue` : n === 0 ? 'Due today' : `In ${n} day${n === 1 ? '' : 's'}`} · every {r.everyDays}d
                      {r.streak > 0 && ` · 🔥 ${r.streak}`}
                    </div>
                  </div>
                  <button onClick={() => done(r.id)} className="px-3 py-1.5 rounded-full text-xs bg-accent text-bg">
                    Done ✓
                  </button>
                  <button onClick={() => setRituals((rs) => rs.filter((x) => x.id !== r.id))} className="text-muted text-sm px-1" aria-label="Delete">
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl bg-surface border border-ink/10 p-5">
          <h4 className="font-medium mb-3">Quick add</h4>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.filter((s) => !rituals.some((r) => r.title === s.title)).map((s) => (
              <button key={s.title} onClick={() => add(s)} className="px-3 py-1.5 rounded-full text-sm border border-ink/15 hover:bg-ink/5">
                {s.emoji} {s.title}
              </button>
            ))}
          </div>
          <h4 className="font-medium mt-5 mb-3">Custom</h4>
          <div className="flex gap-2">
            <input
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              className="w-12 text-center px-2 py-2 rounded-xl bg-bg border border-ink/10"
              aria-label="Emoji"
            />
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Eyebrow threading"
              className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-bg border border-ink/10"
            />
          </div>
          <div className="flex gap-2 mt-2 items-center">
            <span className="text-sm text-muted">Every</span>
            <input
              type="number"
              min={1}
              value={form.everyDays}
              onChange={(e) => setForm({ ...form, everyDays: Number(e.target.value) })}
              className="w-20 px-3 py-2 rounded-xl bg-bg border border-ink/10"
            />
            <span className="text-sm text-muted flex-1">days</span>
            <button
              onClick={() => {
                add(form)
                setForm({ title: '', emoji: '✨', everyDays: 7 })
              }}
              className="px-4 py-2 rounded-xl bg-accent text-bg text-sm font-medium"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
