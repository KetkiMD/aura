import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { SONGS } from '../data/songs'
import type { Song } from '../data/songs'
import { MusicContext } from './musicContext'

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

  const host = useRef<HTMLDivElement | null>(null)
  const player = useRef<Promise<YTPlayer> | null>(null)
  const state = useRef({ queue, index, playing, started, shuffle, vibe })
  const skip = useRef((d: number) => void d)

  useEffect(() => {
    state.current = { queue, index, playing, started, shuffle, vibe }
  })

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
    const s = state.current
    if (s.playing || s.vibe === v) return
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
    playVibe: (v: string) => {
      const list = SONGS[v] ?? []
      setVibe(v)
      load(shuffle ? shuffled(list) : list, 0)
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
      const base = SONGS[vibe ?? ''] ?? []
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
  }

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}
