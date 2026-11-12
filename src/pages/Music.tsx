import AddSong from '../components/AddSong'
import { HeartButton, IconButton, PlayButton } from '../components/Player'
import { AESTHETICS } from '../data/aesthetics'
import type { Song } from '../data/songs'
import { SONGS, thumb } from '../data/songs'
import { MINE, useMusic, vibeLabel } from '../lib/musicContext'

export default function Music() {
  const m = useMusic()
  const song = m.queue[m.index]
  const saved = !!song && m.playlist.some((s) => s.id === song.id)

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:py-12 space-y-12">
      <section className="grid md:grid-cols-[1fr_1.3fr] gap-8 items-start">
        <div>
          <h1 className="font-display text-4xl md:text-5xl">Music</h1>
          <p className="text-muted mt-2">Search any song, build your playlist, or tune into a vibe.</p>
          {song && (
            <div className="mt-6 rounded-3xl bg-surface/70 border border-ink/10 p-4 flex items-center gap-4">
              <img src={thumb(song.id)} alt="" className="w-28 aspect-video rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-widest text-muted truncate">
                  {m.playing ? 'Now playing · ' : ''}
                  {vibeLabel(m.vibe)}
                </p>
                <p className="font-medium truncate">{song.title}</p>
                <p className="text-sm text-muted truncate">{song.artist}</p>
                <div className="flex items-center gap-1 mt-2 -ml-2">
                  <HeartButton saved={saved} onClick={() => (saved ? m.removeSong(song.id) : m.addSong(song))} />
                  <IconButton label="Previous" onClick={m.prev}>
                    <path d="M6 5h2v14H6zM20 5v14L9 12z" />
                  </IconButton>
                  <PlayButton playing={m.playing} onClick={m.toggle} />
                  <IconButton label="Next" onClick={m.next}>
                    <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
                  </IconButton>
                  <button
                    onClick={m.toggleShuffle}
                    className={`ml-1 text-xs px-3 py-1.5 rounded-full border ${m.shuffle ? 'bg-ink text-bg border-ink' : 'border-ink/20 text-muted'}`}
                  >
                    Shuffle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="rounded-3xl bg-surface/70 border border-ink/10 p-5">
          <h2 className="text-xs uppercase tracking-widest text-muted mb-3">Add a song</h2>
          <AddSong />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-4">
          <h2 className="font-display text-2xl md:text-3xl">
            ♡ My playlist <span className="text-muted text-lg">({m.playlist.length})</span>
          </h2>
          {m.playlist.length > 0 && (
            <button onClick={() => m.playVibe(MINE)} className="rounded-full bg-accent text-bg px-5 py-2 text-sm font-medium">
              ▶ Play all
            </button>
          )}
        </div>
        {m.playlist.length ? (
          <ol className="grid md:grid-cols-2 gap-x-6 gap-y-1">
            {m.playlist.map((s) => (
              <Row key={s.id} song={s} current={m.vibe === MINE && song?.id === s.id} onPlay={() => m.playVibe(MINE, s.id)} onRemove={() => m.removeSong(s.id)} />
            ))}
          </ol>
        ) : (
          <p className="rounded-3xl border border-dashed border-ink/20 p-6 text-muted text-center">
            Your playlist is empty. Search for a song above, or tap ♡ on anything that's playing.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl md:text-3xl mb-4">Vibe radios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {AESTHETICS.map((a) => {
            const on = m.vibe === a.id
            return (
              <button
                key={a.id}
                onClick={() => m.playVibe(a.id)}
                className={`relative text-left rounded-3xl p-4 h-32 overflow-hidden border transition hover:-translate-y-0.5 ${on ? 'border-accent ring-2 ring-accent' : 'border-ink/10'}`}
                style={{ background: `linear-gradient(135deg, ${a.palette.join(', ')})` }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="relative flex h-full flex-col justify-end text-white">
                  <span className="text-2xl">{a.emoji}</span>
                  <span className="font-medium leading-tight">{a.name}</span>
                  <span className="text-xs opacity-80">{on ? (m.playing ? '♪ Playing' : 'Selected') : `${SONGS[a.id]?.length ?? 0} songs`}</span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {m.queue.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Up next <span className="text-muted text-lg">· {vibeLabel(m.vibe)}</span>
          </h2>
          <ol className="grid md:grid-cols-2 gap-x-6 gap-y-1">
            {m.queue.map((s, i) => (
              <Row key={s.id} song={s} current={i === m.index} onPlay={() => m.playAt(i)} />
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}

function Row({ song, current, onPlay, onRemove }: { song: Song; current: boolean; onPlay: () => void; onRemove?: () => void }) {
  return (
    <li className={`flex items-center rounded-2xl ${current ? 'bg-ink/10' : 'hover:bg-ink/5'}`}>
      <button onClick={onPlay} className="min-w-0 flex-1 flex items-center gap-3 p-2 text-left">
        <img src={thumb(song.id)} alt="" loading="lazy" className="w-16 aspect-video rounded-lg object-cover" />
        <span className="min-w-0">
          <span className={`block truncate ${current ? 'text-accent font-medium' : ''}`}>{song.title}</span>
          <span className="block text-sm text-muted truncate">{song.artist}</span>
        </span>
      </button>
      {onRemove && (
        <button onClick={onRemove} aria-label={`Remove ${song.title}`} className="shrink-0 w-10 h-10 grid place-items-center text-muted hover:text-ink">
          ✕
        </button>
      )}
    </li>
  )
}
