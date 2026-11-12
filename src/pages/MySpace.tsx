import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { byId, pexelsUrl } from '../data/aesthetics'
import { useAuth } from '../lib/authContext'
import type { Ritual } from '../lib/store'
import { todayISO, uid, useBoards, useResult, useRituals, useSaved } from '../lib/store'

type Suggestion = Omit<Ritual, 'id' | 'lastDone' | 'streak'>
const GROUPS: { name: string; color: string; items: Suggestion[] }[] = [
  {
    name: 'Beauty',
    color: '#f19bb5',
    items: [
      { title: 'Night skincare', emoji: '🧴', everyDays: 1 },
      { title: 'Hair wash', emoji: '🚿', everyDays: 3 },
      { title: 'Hair oiling', emoji: '🫧', everyDays: 4 },
      { title: 'Face mask', emoji: '🧖‍♀️', everyDays: 7 },
      { title: 'Nails', emoji: '💅', everyDays: 14 },
      { title: 'Brows', emoji: '🪞', everyDays: 21 },
      { title: 'Hair trim', emoji: '✂️', everyDays: 45 },
    ],
  },
  {
    name: 'Move',
    color: '#9fc5a8',
    items: [
      { title: 'Yoga', emoji: '🧘‍♀️', everyDays: 1 },
      { title: '10k steps', emoji: '👟', everyDays: 1 },
      { title: 'Stretching', emoji: '🤸‍♀️', everyDays: 1 },
      { title: 'Pilates', emoji: '🩰', everyDays: 2 },
      { title: 'Gym', emoji: '🏋️‍♀️', everyDays: 2 },
      { title: 'Dance class', emoji: '💃', everyDays: 7 },
    ],
  },
  {
    name: 'Nourish',
    color: '#f2c27b',
    items: [
      { title: 'Drink 2L water', emoji: '💧', everyDays: 1 },
      { title: 'Green juice', emoji: '🥬', everyDays: 1 },
      { title: 'Vitamins', emoji: '💊', everyDays: 1 },
      { title: 'No-sugar day', emoji: '🍓', everyDays: 7 },
      { title: 'Meal prep', emoji: '🥗', everyDays: 7 },
      { title: 'Grocery haul', emoji: '🧺', everyDays: 7 },
    ],
  },
  {
    name: 'Mind',
    color: '#b8a6e8',
    items: [
      { title: 'Journal', emoji: '📓', everyDays: 1 },
      { title: 'Read 20 pages', emoji: '📚', everyDays: 1 },
      { title: 'Digital detox', emoji: '📵', everyDays: 7 },
      { title: 'Period self-care', emoji: '🌸', everyDays: 28 },
    ],
  },
  {
    name: 'Home',
    color: '#9cc3dd',
    items: [
      { title: 'Water plants', emoji: '🪴', everyDays: 3 },
      { title: 'Change bedsheets', emoji: '🛏️', everyDays: 7 },
      { title: 'Room refresh', emoji: '🕯️', everyDays: 30 },
      { title: 'Declutter wardrobe', emoji: '👗', everyDays: 30 },
    ],
  },
]
const colorOf = (title: string) => GROUPS.find((g) => g.items.some((i) => i.title === title))?.color ?? '#d9b8a0'


const DAY = 86400000
const toDate = (iso: string) => new Date(iso + 'T00:00:00')
const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (iso: string, n: number) => toISO(new Date(toDate(iso).getTime() + n * DAY))
const nextDue = (r: Ritual) => addDays(r.lastDone, r.everyDays)
const daysUntil = (iso: string) => Math.round((toDate(iso).getTime() - toDate(todayISO()).getTime()) / DAY)

export default function MySpace() {
  const [tab, setTab] = useState<'boards' | 'calendar'>('boards')
  const { enabled, ready, session } = useAuth()
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl md:text-5xl">My Space</h1>
      {enabled && ready && !session && (
        <Link
          to="/login"
          className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-surface/70 px-5 py-4 hover:border-ink/30 transition"
        >
          <span className="text-sm">
            <span className="font-medium">Keep your space on every device.</span>{' '}
            <span className="text-muted">Log in to sync boards, pins and rituals.</span>
          </span>
          <span className="shrink-0 rounded-full bg-accent text-bg px-4 py-2 text-sm font-medium">Log in</span>
        </Link>
      )}
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
      {boards.length === 0 && (
        <ExampleBoard
          onUse={(n, pins) => {
            const id = uid()
            setBoards((bs) => [...bs, { id, name: n, pins }])
            setOpenId(id)
          }}
        />
      )}
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

function ExampleBoard({ onUse }: { onUse: (name: string, pins: string[]) => void }) {
  const [result] = useResult()
  const a = byId(result?.primary ?? 'coquette')!
  const pins = a.images.slice(4, 10)
  const title = `${a.adj} Sunday`
  const tile = 'w-full h-full object-cover rounded-2xl'
  return (
    <div className="rounded-[2rem] bg-surface border border-ink/10 p-5 md:p-8 mb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted">Example moodboard</span>
          <h2 className="font-display text-3xl md:text-4xl mt-2">{title}</h2>
          <p className="text-muted mt-2 max-w-xl">
            A moodboard collects pins around one idea — a dream room, an outfit, a trip, a birthday look. It helps you see your vibe in one place.
          </p>
        </div>
        <button onClick={() => onUse(title, pins)} className="px-5 py-3 rounded-full bg-accent text-bg text-sm font-medium">
          Save this board to my space
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-3 gap-2 md:gap-3 h-[360px] md:h-[480px] mt-6">
        <img src={pexelsUrl(pins[0], 700)} alt="" className={`${tile} col-span-2 row-span-2`} />
        <img src={pexelsUrl(pins[1], 400)} alt="" className={tile} />
        <img src={pexelsUrl(pins[2], 400)} alt="" className={`${tile} row-span-2`} />
        <div className="rounded-2xl p-3 flex flex-col justify-between" style={{ background: a.palette[1], color: a.palette[4] }}>
          <span className="text-[10px] uppercase tracking-widest opacity-70">palette</span>
          <div className="flex gap-1">
            {a.palette.map((c) => (
              <span key={c} className="flex-1 h-6 rounded-full border border-black/10" style={{ background: c }} />
            ))}
          </div>
        </div>
        <img src={pexelsUrl(pins[3], 400)} alt="" className={tile} />
        <div className="rounded-2xl p-3 flex items-center justify-center text-center font-display italic text-lg md:text-2xl" style={{ background: a.theme.accent, color: a.theme.bg }}>
          “{a.keywords[0].toLowerCase()} & {a.keywords[1].toLowerCase()}”
        </div>
        <img src={pexelsUrl(pins[4], 400)} alt="" className={tile} />
        <img src={pexelsUrl(pins[5], 400)} alt="" className={tile} />
      </div>
      <div className="grid md:grid-cols-3 gap-3 mt-6 text-sm">
        {['Tap Save on pins you love in Explore', 'Create a board with a name, e.g. “Dream room”', 'Add saved pins to it — your vibe, all in one place'].map((t, i) => (
          <div key={t} className="flex gap-3 items-center rounded-2xl bg-bg/60 border border-ink/10 p-3">
            <span className="w-7 h-7 shrink-0 rounded-full bg-accent text-bg grid place-items-center text-xs font-semibold">{i + 1}</span>
            <span className="text-muted">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Ring({ value, total }: { value: number; total: number }) {
  const pct = total ? value / total : 0
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 80 80" className="w-24 h-24 -rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="7" />
      <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} className="transition-all duration-700" />
    </svg>
  )
}

function Calendar() {
  const [rituals, setRituals] = useRituals()
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const today = todayISO()
  const [selected, setSelected] = useState(today)
  const [form, setForm] = useState({ title: '', emoji: '✨', everyDays: 7 })

  const dueMap = useMemo(() => {
    const map: Record<string, Ritual[]> = {}
    const end = toISO(new Date(month.getFullYear(), month.getMonth() + 1, 0))
    const start = toISO(month)
    for (const r of rituals) {
      let d = nextDue(r)
      if (d < today) d = today
      while (d <= end) {
        if (d >= start) (map[d] ||= []).push(r)
        d = addDays(d, r.everyDays)
      }
    }
    return map
  }, [rituals, month, today])

  function add(r: Suggestion) {
    if (!r.title.trim() || r.everyDays < 1) return
    setRituals((rs) => [...rs, { ...r, id: uid(), lastDone: addDays(today, -r.everyDays), streak: 0 }])
  }
  function done(id: string) {
    setRituals((rs) =>
      rs.map((r) => (r.id === id && r.lastDone !== today ? { ...r, lastDone: today, streak: daysUntil(nextDue(r)) >= -1 ? r.streak + 1 : 1 } : r)),
    )
  }

  const todays = rituals.filter((r) => r.lastDone === today || daysUntil(nextDue(r)) <= 0)
  const doneCount = todays.filter((r) => r.lastDone === today).length
  const firstWeekday = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const sorted = [...rituals].sort((a, b) => nextDue(a).localeCompare(nextDue(b)))
  const selectedList = selected === today ? todays : (dueMap[selected] ?? [])
  const bestStreak = Math.max(0, ...rituals.map((r) => r.streak))

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] p-6 md:p-8 text-bg" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}>
        <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute right-24 -bottom-20 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center gap-6">
          <div className="relative">
            <Ring value={doneCount} total={todays.length} />
            <span className="absolute inset-0 grid place-items-center font-display text-2xl">
              {doneCount}/{todays.length}
            </span>
          </div>
          <div className="flex-1 min-w-48">
            <div className="text-xs uppercase tracking-[0.3em] opacity-80">{toDate(today).toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            <h2 className="font-display text-3xl md:text-4xl mt-1">Today’s glow-up</h2>
            <p className="opacity-80 text-sm mt-1">
              {todays.length === 0 ? 'Nothing due — add rituals below and AURA will remember the dates.' : doneCount === todays.length ? 'All done. You’re glowing ✨' : `${todays.length - doneCount} left for today`}
              {bestStreak > 0 && ` · best streak 🔥 ${bestStreak}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto md:max-w-md">
            {todays.map((r) => {
              const isDone = r.lastDone === today
              return (
                <button key={r.id} onClick={() => done(r.id)} className={`px-4 py-2 rounded-full text-sm backdrop-blur transition ${isDone ? 'bg-white/90 text-black line-through decoration-1' : 'bg-white/20 hover:bg-white/30'}`}>
                  {isDone ? '✓' : r.emoji} {r.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="rounded-[2rem] bg-surface border border-ink/10 p-5 md:p-7">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="w-10 h-10 rounded-full border border-ink/15 hover:bg-ink/5">
              ‹
            </button>
            <h3 className="font-display text-2xl md:text-3xl">
              {month.toLocaleString('en', { month: 'long' })} <span className="text-muted italic">{month.getFullYear()}</span>
            </h3>
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="w-10 h-10 rounded-full border border-ink/15 hover:bg-ink/5">
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-[11px] uppercase tracking-widest text-muted mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {cells.map((day, i) => {
              if (!day) return <span key={i} />
              const iso = toISO(new Date(month.getFullYear(), month.getMonth(), day))
              const due = dueMap[iso] ?? []
              const isToday = iso === today
              const isSel = iso === selected
              return (
                <button
                  key={i}
                  onClick={() => setSelected(iso)}
                  className={`aspect-square rounded-2xl p-1.5 md:p-2 flex flex-col items-center transition ${isToday ? 'bg-accent text-bg' : isSel ? 'bg-ink/10' : 'hover:bg-ink/5'} ${isSel && !isToday ? 'ring-1 ring-accent' : ''}`}
                >
                  <span className="text-xs md:text-sm font-medium">{day}</span>
                  <span className="mt-auto flex flex-wrap justify-center gap-0.5 md:gap-1">
                    {due.slice(0, 4).map((r) => (
                      <span key={r.id} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ background: colorOf(r.title) }} />
                    ))}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-5 text-xs text-muted">
            {GROUPS.map((g) => (
              <span key={g.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: g.color }} /> {g.name}
              </span>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-ink/10">
            <h4 className="font-medium mb-3">{selected === today ? 'Today' : toDate(selected).toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'short' })}</h4>
            {selectedList.length === 0 ? (
              <p className="text-sm text-muted">Free day ☁️</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedList.map((r) => (
                  <span key={r.id} className="px-3 py-1.5 rounded-full text-sm" style={{ background: colorOf(r.title) + '40' }}>
                    {r.emoji} {r.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl mb-3">Your rituals</h3>
            {sorted.length === 0 && <p className="text-muted text-sm">Pick a few from Quick add — like Pilates, hair oiling or meal prep.</p>}
            <div className="space-y-2">
              {sorted.map((r) => {
                const n = daysUntil(nextDue(r))
                const isDone = r.lastDone === today
                return (
                  <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-surface border border-ink/10 p-3 overflow-hidden relative">
                    <span className="absolute left-0 inset-y-0 w-1" style={{ background: colorOf(r.title) }} />
                    <span className="text-2xl w-10 h-10 grid place-items-center rounded-xl ml-1" style={{ background: colorOf(r.title) + '33' }}>
                      {r.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{r.title}</div>
                      <div className={`text-xs ${!isDone && n <= 0 ? 'text-accent' : 'text-muted'}`}>
                        {isDone ? 'Done today' : n < 0 ? `${-n} day${n === -1 ? '' : 's'} overdue` : n === 0 ? 'Due today' : `In ${n} day${n === 1 ? '' : 's'}`} · {r.everyDays === 1 ? 'daily' : `every ${r.everyDays}d`}
                        {r.streak > 0 && ` · 🔥 ${r.streak}`}
                      </div>
                    </div>
                    <button onClick={() => done(r.id)} disabled={isDone} className={`px-3 py-1.5 rounded-full text-xs ${isDone ? 'bg-ink/10 text-muted' : 'bg-accent text-bg'}`}>
                      {isDone ? '✓' : 'Done'}
                    </button>
                    <button onClick={() => setRituals((rs) => rs.filter((x) => x.id !== r.id))} className="text-muted text-sm px-1" aria-label="Delete">
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-[2rem] bg-surface border border-ink/10 p-5">
            <h4 className="font-display text-xl mb-4">Quick add</h4>
            <div className="space-y-4">
              {GROUPS.map((g) => {
                const items = g.items.filter((s) => !rituals.some((r) => r.title === s.title))
                if (!items.length) return null
                return (
                  <div key={g.name}>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-muted mb-2">{g.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <button key={s.title} onClick={() => add(s)} className="px-3 py-1.5 rounded-full text-sm border hover:-translate-y-0.5 transition" style={{ borderColor: g.color, background: g.color + '22' }}>
                          {s.emoji} {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <h4 className="font-medium mt-6 mb-3">Custom</h4>
            <div className="flex gap-2">
              <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className="w-12 text-center px-2 py-2 rounded-xl bg-bg border border-ink/10" aria-label="Emoji" />
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Eyebrow threading" className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-bg border border-ink/10" />
            </div>
            <div className="flex gap-2 mt-2 items-center">
              <span className="text-sm text-muted">Every</span>
              <input type="number" min={1} value={form.everyDays} onChange={(e) => setForm({ ...form, everyDays: Number(e.target.value) })} className="w-20 px-3 py-2 rounded-xl bg-bg border border-ink/10" />
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
    </div>
  )
}
