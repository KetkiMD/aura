import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { AESTHETICS, byId } from '../data/aesthetics'
import type { Song } from '../data/songs'
import { thumb } from '../data/songs'
import { MINE, useMusic } from '../lib/musicContext'
import { canSearch, lookup, search, videoId } from '../lib/youtube'

export default function Player({ vibe }: { vibe?: string }) {
  const m = useMusic()
  const { follow, mount } = m
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (vibe) follow(vibe)
  }, [vibe, follow])

  const a = m.vibe ? byId(m.vibe) : undefined
  const song = m.queue[m.index]
  if (!song) return null
  const label = a ? `${a.emoji} ${a.name} radio` : '♡ My playlist'
  const saved = m.playlist.some((s) => s.id === song.id)

  return (
    <div className="fixed z-40 right-4 bottom-20 md:bottom-6 w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-surface/95 backdrop-blur-xl border border-ink/10 shadow-2xl overflow-hidden fade-up">
      <div className={open ? 'flex flex-col' : 'flex items-center gap-3 p-2 pr-3'}>
        <div
          className={`relative shrink-0 overflow-hidden bg-black ${open ? 'w-full aspect-video' : 'w-20 aspect-video rounded-xl'}`}
        >
          <div ref={mount} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full" />
          {!m.started && (
            <button onClick={m.toggle} className="absolute inset-0" aria-label="Play">
              <img src={thumb(song.id)} alt="" className="w-full h-full object-cover" />
            </button>
          )}
        </div>
        <div className={open ? 'flex items-center gap-3 px-4 pt-4' : 'contents'}>
          <button onClick={() => setOpen((o) => !o)} className="min-w-0 flex-1 text-left" title={open ? 'Minimise' : 'Open player'}>
            <span className="block text-[10px] uppercase tracking-widest text-muted truncate">{label}</span>
            <span className="block font-medium truncate">{song.title}</span>
            <span className="block text-xs text-muted truncate">{song.artist}</span>
          </button>
          <div className="flex items-center gap-1 shrink-0">
            {open && (
              <>
                <button
                  onClick={() => (saved ? m.removeSong(song.id) : m.addSong(song))}
                  aria-label={saved ? 'Remove from My playlist' : 'Add to My playlist'}
                  className={`grid place-items-center w-9 h-9 rounded-full hover:bg-ink/10 ${saved ? 'text-accent' : 'text-ink'}`}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.4 3.4 5 6.8 5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.4 0 5.6 3.4 4.3 6.7C19.5 16.4 12 21 12 21z" />
                  </svg>
                </button>
                <IconButton label="Previous" onClick={m.prev}>
                  <path d="M6 5h2v14H6zM20 5v14L9 12z" />
                </IconButton>
              </>
            )}
            <button
              onClick={m.toggle}
              aria-label={m.playing ? 'Pause' : 'Play'}
              className="grid place-items-center w-10 h-10 rounded-full bg-accent text-bg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                {m.playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
              </svg>
            </button>
            <IconButton label="Next" onClick={m.next}>
              <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
            </IconButton>
          </div>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 max-h-[50vh] overflow-y-auto">
          <AddSong />
          <p className="text-xs uppercase tracking-widest text-muted mt-4 mb-2">Switch vibe</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <button
              onClick={() => m.playVibe(MINE)}
              disabled={!m.playlist.length}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border disabled:opacity-40 ${m.vibe === MINE ? 'bg-accent text-bg border-accent' : 'border-ink/20'}`}
            >
              ♡ My playlist ({m.playlist.length})
            </button>
            {AESTHETICS.map((x) => (
              <button
                key={x.id}
                onClick={() => m.playVibe(x.id)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border ${x.id === m.vibe ? 'bg-accent text-bg border-accent' : 'border-ink/20'}`}
              >
                {x.emoji} {x.name}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 mb-2">
            <span className="text-xs uppercase tracking-widest text-muted">Up next · {m.queue.length}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={m.toggleShuffle}
                className={`text-xs px-3 py-1.5 rounded-full border ${m.shuffle ? 'bg-ink text-bg border-ink' : 'border-ink/20 text-muted'}`}
              >
                Shuffle
              </button>
              <button onClick={() => setOpen(false)} className="text-xs px-3 py-1.5 rounded-full border border-ink/20 text-muted">
                Minimise
              </button>
            </div>
          </div>
          <ol className="-mx-1 space-y-0.5">
            {m.queue.map((s, i) => (
              <li key={s.id} className={`flex items-center rounded-xl ${i === m.index ? 'bg-ink/10' : 'hover:bg-ink/5'}`}>
                <button onClick={() => m.playAt(i)} className="min-w-0 flex-1 flex items-center gap-3 px-1 py-1.5 text-left">
                  <img src={thumb(s.id)} alt="" loading="lazy" className="w-12 aspect-video rounded-md object-cover" />
                  <span className="min-w-0">
                    <span className={`block text-sm truncate ${i === m.index ? 'text-accent font-medium' : ''}`}>{s.title}</span>
                    <span className="block text-xs text-muted truncate">{s.artist}</span>
                  </span>
                </button>
                {m.vibe === MINE && (
                  <button
                    onClick={() => m.removeSong(s.id)}
                    aria-label={`Remove ${s.title}`}
                    className="shrink-0 w-8 h-8 grid place-items-center text-muted hover:text-ink"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function AddSong() {
  const m = useMusic()
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [results, setResults] = useState<Song[]>([])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setMsg('')
    setResults([])
    const id = videoId(text)
    if (!id && !canSearch) {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(text)}`, '_blank', 'noopener')
      setMsg('Copy the song link from YouTube and paste it here.')
      return
    }
    setBusy(true)
    try {
      if (id) {
        const s = await lookup(id)
        if (!s) setMsg("That video can't be played outside YouTube.")
        else {
          m.addSong(s)
          setQ('')
          setMsg(`Added “${s.title}” to My playlist.`)
        }
      } else {
        const r = await search(text)
        setResults(r)
        if (!r.length) setMsg('No songs found.')
      }
    } catch {
      setMsg('Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-3">
      <p className="text-xs uppercase tracking-widest text-muted mb-2">Add a song</p>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={canSearch ? 'Search YouTube or paste a link' : 'Paste a YouTube link, or type to search'}
          className="min-w-0 flex-1 rounded-full bg-bg/60 border border-ink/15 px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button disabled={busy || !q.trim()} className="shrink-0 rounded-full bg-ink text-bg px-4 text-sm disabled:opacity-40">
          {busy ? '…' : videoId(q) ? 'Add' : 'Search'}
        </button>
      </form>
      {msg && <p className="text-xs text-muted mt-2">{msg}</p>}
      {results.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {results.map((s) => {
            const added = m.playlist.some((p) => p.id === s.id)
            return (
              <li key={s.id} className="flex items-center gap-3 rounded-xl px-1 py-1.5 hover:bg-ink/5">
                <img src={thumb(s.id)} alt="" className="w-12 aspect-video rounded-md object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm truncate">{s.title}</span>
                  <span className="block text-xs text-muted truncate">{s.artist}</span>
                </span>
                <button
                  onClick={() => m.addSong(s)}
                  disabled={added}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-ink/20 disabled:opacity-60"
                >
                  {added ? '✓ Added' : '+ Add'}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid place-items-center w-9 h-9 rounded-full text-ink hover:bg-ink/10">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        {children}
      </svg>
    </button>
  )
}
