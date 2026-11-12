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
  playVibe: (vibe: string) => void
  playAt: (index: number) => void
  toggle: () => void
  next: () => void
  prev: () => void
  toggleShuffle: () => void
  mount: (el: HTMLDivElement | null) => void
}

export const MusicContext = createContext<Music | null>(null)

export const useMusic = () => useContext(MusicContext)!
