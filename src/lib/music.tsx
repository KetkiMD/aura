import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { SONGS } from '../data/songs'
import type { Song } from '../data/songs'
import { MINE, MusicContext } from './musicContext'
import { usePlaylist } from './store'

type YTPlayer = {
  loadVideoById(id: string): void
  cueVideoById(id: string): void
  playVideo(): void
  pauseVideo(): void
}
type YTEvent = { data: number; target: YTPlayer }
type YTNamespace = {
  Player: new (el: HTMLElement, opts: object) => YTPlayer
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let api: Promise<YTNamespace> | null = null
function loadApi() {
  api ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!)
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(s)
  })
  return api
}

function shuffled(songs: Song[], first?: Song) {
  const rest = songs.filter((s) => s !== first)
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[rest[i], rest[j]] = [rest[j], rest[i]]
  }
  return first ? [first, ...rest] : rest
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [vibe, setVibe] = useState<string | null>(null)
  const [queue, setQueue] = useState<Song[]>([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [playlist, setPlaylist] = usePlaylist()

  const host = useRef<HTMLDivElement | null>(null)
  const player = useRef<Promise<YTPlayer> | null>(null)
  const state = useRef({ queue, index, playing, started, shuffle, vibe, playlist })
  const skip = useRef((d: number) => void d)
  const pinned = useRef(false)
  const followed = useRef<string | null>(null)

  useEffect(() => {
    state.current = { queue, index, playing, started, shuffle, vibe, playlist }
  })

  const listFor = (v: string | null) => (v === MINE ? playlist : (SONGS[v ?? ''] ?? []))

  const load = useCallback((q: Song[], i: number) => {
    setQueue(q)
    setIndex(i)
    setStarted(true)
    const id = q[i].id
    if (player.current) {
      void player.current.then((p) => p.loadVideoById(id))
      return
    }
    player.current = loadApi().then(
      (YT) =>
        new Promise<YTPlayer>((resolve) => {
          const el = document.createElement('div')
          host.current?.replaceChildren(el)
          new YT.Player(el, {
            width: '100%',
            height: '100%',
            videoId: id,
            playerVars: { autoplay: 1, playsinline: 1, rel: 0 },
            events: {
              onReady: (e: YTEvent) => {
                e.target.playVideo()
                resolve(e.target)
              },
              onStateChange: (e: YTEvent) => {
                if (e.data === YT.PlayerState.PLAYING) setPlaying(true)
                else if (e.data === YT.PlayerState.PAUSED) setPlaying(false)
                else if (e.data === YT.PlayerState.ENDED) skip.current(1)
              },
              onError: () => skip.current(1),
            },
          })
        }),
    )
  }, [])

  useEffect(() => {
    skip.current = (d) => {
      const { queue: q, index: i } = state.current
      if (q.length) load(q, (i + d + q.length) % q.length)
    }
  }, [load])

  const follow = useCallback((v: string) => {
    followed.current = v
    const s = state.current
    if (pinned.current || s.playing || s.vibe === v) return
    const list = SONGS[v] ?? []
    const q = s.shuffle ? shuffled(list) : list
    setVibe(v)
    setQueue(q)
    setIndex(0)
    if (s.started && q[0]) void player.current?.then((p) => p.cueVideoById(q[0].id))
  }, [])

  const value = {
    vibe,
    queue,
    index,
    playing,
    started,
    shuffle,
    follow,
    playVibe: (v: string, startId?: string) => {
      const list = listFor(v)
      if (!list.length) return
      pinned.current = true
      setVibe(v)
      const start = list.find((s) => s.id === startId)
      if (shuffle) load(start ? [start, ...shuffled(list.filter((s) => s !== start))] : shuffled(list), 0)
      else load(list, Math.max(0, list.indexOf(start as Song)))
    },
    playAt: (i: number) => load(queue, i),
    toggle: () => {
      if (!started) load(queue, index)
      else void player.current?.then((p) => (playing ? p.pauseVideo() : p.playVideo()))
    },
    next: () => skip.current(1),
    prev: () => skip.current(-1),
    toggleShuffle: () => {
      const current = queue[index]
      const base = listFor(vibe)
      setShuffle(!shuffle)
      if (!shuffle) {
        setQueue(shuffled(base, current))
        setIndex(0)
      } else {
        setQueue(base)
        setIndex(Math.max(0, base.indexOf(current)))
      }
    },
    mount: (el: HTMLDivElement | null) => {
      host.current = el
    },
    playlist,
    addSong: (song: Song) => {
      if (playlist.some((s) => s.id === song.id)) return
      setPlaylist([...playlist, song])
      if (vibe === MINE) setQueue([...queue, song])
    },
    removeSong: (id: string) => {
      const rest = playlist.filter((s) => s.id !== id)
      setPlaylist(rest)
      if (vibe !== MINE) return
      if (!rest.length) {
        pinned.current = false
        const v = followed.current ?? 'clean-girl'
        setVibe(v)
        setQueue(SONGS[v] ?? [])
        setIndex(0)
        return
      }
      const i = queue.findIndex((s) => s.id === id)
      if (i < 0) return
      setQueue(queue.filter((s) => s.id !== id))
      if (i < index || index >= queue.length - 1) setIndex(Math.max(0, index - 1))
    },
  }

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}
