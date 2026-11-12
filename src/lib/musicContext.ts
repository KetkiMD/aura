import { byId } from '../data/aesthetics'
import { createContext, useContext } from 'react'
import type { Song } from '../data/songs'

export type Music = {
  vibe: string | null
  queue: Song[]
  index: number
  playing: boolean
  started: boolean
  shuffle: boolean
  follow: (vibe: string) => void
  playVibe: (vibe: string, startId?: string) => void
  playAt: (index: number) => void
  toggle: () => void
  next: () => void
  prev: () => void
  toggleShuffle: () => void
  mount: (el: HTMLDivElement | null) => void
  playlist: Song[]
  addSong: (song: Song) => void
  removeSong: (id: string) => void
}

export const MINE = 'mine'

export function vibeLabel(vibe: string | null) {
  const a = vibe ? byId(vibe) : undefined
  return a ? `${a.emoji} ${a.name} radio` : '♡ My playlist'
}

export const MusicContext = createContext<Music | null>(null)

export const useMusic = () => useContext(MusicContext)!
