import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { thumb } from '../data/songs'
import { useMusic, vibeLabel } from '../lib/musicContext'

export default function Player({ vibe }: { vibe?: string }) {
  const m = useMusic()
  const { follow, mount } = m
  const { pathname } = useLocation()
  const [video, setVideo] = useState(false)

  useEffect(() => {
    if (vibe) follow(vibe)
  }, [vibe, follow])

  const song = m.queue[m.index]
  if (!song) return null
  const saved = m.playlist.some((s) => s.id === song.id)

  return (
    <div className="fixed z-40 right-4 bottom-20 md:bottom-6 w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-surface/95 backdrop-blur-xl border border-ink/10 shadow-2xl overflow-hidden fade-up">
      <div className={video ? 'flex flex-col' : 'flex items-center gap-3 p-2 pr-3'}>
        <div
          className={`relative shrink-0 overflow-hidden bg-black ${video ? 'w-full aspect-video' : 'w-20 aspect-video rounded-xl'}`}
        >
          <div ref={mount} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full" />
          {!m.started && (
            <button onClick={m.toggle} className="absolute inset-0" aria-label="Play">
              <img src={thumb(song.id)} alt="" className="w-full h-full object-cover" />
            </button>
          )}
        </div>
        <div className={video ? 'flex items-center gap-2 p-3 pl-4' : 'contents'}>
          <button onClick={() => setVideo((v) => !v)} className="min-w-0 flex-1 text-left" title={video ? 'Hide video' : 'Show video'}>
            <span className="block text-[10px] uppercase tracking-widest text-muted truncate">{vibeLabel(m.vibe)}</span>
            <span className="block font-medium truncate">{song.title}</span>
            <span className="block text-xs text-muted truncate">{song.artist}</span>
          </button>
          <div className="flex items-center gap-1 shrink-0">
            {video && (
              <>
                <HeartButton saved={saved} onClick={() => (saved ? m.removeSong(song.id) : m.addSong(song))} />
                <IconButton label="Previous" onClick={m.prev}>
                  <path d="M6 5h2v14H6zM20 5v14L9 12z" />
                </IconButton>
              </>
            )}
            <PlayButton playing={m.playing} onClick={m.toggle} />
            <IconButton label="Next" onClick={m.next}>
              <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
            </IconButton>
            {pathname !== '/music' && (
              <Link to="/music" aria-label="Open Music" title="Search, playlist and vibes" className="grid place-items-center w-9 h-9 rounded-full text-ink hover:bg-ink/10">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M3 6h12v2H3zm0 5h12v2H3zm0 5h8v2H3zm14-10h4v2h-2v9a3 3 0 1 1-2-2.83z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PlayButton({ playing, onClick, big }: { playing: boolean; onClick: () => void; big?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={playing ? 'Pause' : 'Play'}
      className={`grid place-items-center rounded-full bg-accent text-bg ${big ? 'w-14 h-14' : 'w-10 h-10'}`}
    >
      <svg viewBox="0 0 24 24" className={big ? 'w-7 h-7' : 'w-5 h-5'} fill="currentColor">
        {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
      </svg>
    </button>
  )
}

export function HeartButton({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={saved ? 'Remove from My playlist' : 'Add to My playlist'}
      className={`grid place-items-center w-9 h-9 rounded-full hover:bg-ink/10 ${saved ? 'text-accent' : 'text-ink'}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.4 3.4 5 6.8 5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.4 0 5.6 3.4 4.3 6.7C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  )
}

export function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid place-items-center w-9 h-9 rounded-full text-ink hover:bg-ink/10">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        {children}
      </svg>
    </button>
  )
}
