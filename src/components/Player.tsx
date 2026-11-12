import { useEffect, useState } from 'react'
import { AESTHETICS, byId } from '../data/aesthetics'
import { thumb } from '../data/songs'
import { useMusic } from '../lib/musicContext'

export default function Player({ vibe }: { vibe?: string }) {
  const m = useMusic()
  const { follow, mount } = m
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (vibe) follow(vibe)
  }, [vibe, follow])

  const a = m.vibe ? byId(m.vibe) : undefined
  const song = m.queue[m.index]
  if (!a || !song) return null

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
            <span className="block text-[10px] uppercase tracking-widest text-muted truncate">
              {a.emoji} {a.name} radio
            </span>
            <span className="block font-medium truncate">{song.title}</span>
            <span className="block text-xs text-muted truncate">{song.artist}</span>
          </button>
          <div className="flex items-center gap-1 shrink-0">
            {open && (
              <IconButton label="Previous" onClick={m.prev}>
                <path d="M6 5h2v14H6zM20 5v14L9 12z" />
              </IconButton>
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
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mt-3 mb-2">
            <span className="text-xs uppercase tracking-widest text-muted">Up next</span>
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
          <ol className="max-h-[28vh] overflow-y-auto -mx-1 pr-1 space-y-0.5">
            {m.queue.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => m.playAt(i)}
                  className={`w-full flex items-center gap-3 rounded-xl px-1 py-1.5 text-left ${i === m.index ? 'bg-ink/10' : 'hover:bg-ink/5'}`}
                >
                  <img src={thumb(s.id)} alt="" loading="lazy" className="w-12 aspect-video rounded-md object-cover" />
                  <span className="min-w-0">
                    <span className={`block text-sm truncate ${i === m.index ? 'text-accent font-medium' : ''}`}>{s.title}</span>
                    <span className="block text-xs text-muted truncate">{s.artist}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="text-xs uppercase tracking-widest text-muted mt-4 mb-2">Switch vibe</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
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
        </div>
      )}
    </div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid place-items-center w-9 h-9 rounded-full text-ink hover:bg-ink/10">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        {children}
      </svg>
    </button>
  )
}
