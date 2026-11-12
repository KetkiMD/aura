import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Song } from '../data/songs'
import { thumb } from '../data/songs'
import { useMusic } from '../lib/musicContext'
import { canSearch, lookup, search, videoId } from '../lib/youtube'

export default function AddSong() {
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
    <div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={canSearch ? 'Search a song or paste a link' : 'Paste a YouTube link, or type to search'}
          className="min-w-0 flex-1 rounded-full bg-bg/60 border border-ink/15 px-5 py-3 outline-none focus:border-accent"
        />
        <button disabled={busy || !q.trim()} className="shrink-0 rounded-full bg-accent text-bg px-4 sm:px-6 font-medium disabled:opacity-40">
          {busy ? '…' : videoId(q) ? 'Add' : 'Search'}
        </button>
      </form>
      {msg && <p className="text-sm text-muted mt-3">{msg}</p>}
      {results.length > 0 && (
        <ul className="mt-3 space-y-1">
          {results.map((s) => {
            const added = m.playlist.some((p) => p.id === s.id)
            return (
              <li key={s.id} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-ink/5">
                <img src={thumb(s.id)} alt="" className="w-20 aspect-video rounded-lg object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium truncate">{s.title}</span>
                  <span className="block text-sm text-muted truncate">{s.artist}</span>
                </span>
                <button
                  onClick={() => m.addSong(s)}
                  disabled={added}
                  className={`shrink-0 text-sm px-4 py-2 rounded-full border ${added ? 'border-accent text-accent' : 'border-ink/20 hover:border-ink/50'}`}
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
