import type { Song } from '../data/songs'

const KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined

export const canSearch = !!KEY

export function videoId(input: string) {
  const s = input.trim()
  if (/^[\w-]{11}$/.test(s)) return s
  return s.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/)?.[1] ?? null
}

const NOISE = /\s*[([][^)\]]*\b(official|lyrics?|audio|video|visuali[sz]er|hd|4k|mv|m\/v)\b[^)\]]*[)\]]/gi

function split(raw: string, channel: string) {
  const t = raw.replace(NOISE, '').trim()
  const m = t.match(/^(.+?)\s+[-–—|]\s+(.+)$/)
  return m ? { artist: m[1].trim(), title: m[2].trim() } : { artist: channel.replace(/( - Topic|VEVO)$/, '').trim(), title: t }
}

function decode(s: string) {
  const el = document.createElement('textarea')
  el.innerHTML = s
  return el.value
}

export async function lookup(id: string): Promise<Song | null> {
  const r = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
  if (!r.ok) return null
  const j = (await r.json()) as { title: string; author_name: string }
  return { id, ...split(j.title, j.author_name) }
}

export async function search(q: string): Promise<Song[]> {
  const u = new URL('https://www.googleapis.com/youtube/v3/search')
  const params = { part: 'snippet', type: 'video', videoEmbeddable: 'true', maxResults: '8', q, key: KEY ?? '' }
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v)
  const r = await fetch(u)
  if (!r.ok) throw new Error(`YouTube search failed: ${r.status}`)
  const j = (await r.json()) as { items: { id: { videoId: string }; snippet: { title: string; channelTitle: string } }[] }
  return j.items.map((i) => ({ id: i.id.videoId, ...split(decode(i.snippet.title), i.snippet.channelTitle) }))
}
