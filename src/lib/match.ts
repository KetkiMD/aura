import { AESTHETICS } from '../data/aesthetics'
import type { Result } from './store'

export type MatchPayload = { n: string; p: string; s: string; v: number[] }

export function encodeMatch(result: Result, nick: string) {
  const payload: MatchPayload = { n: nick.slice(0, 24), p: result.primary, s: result.secondary, v: AESTHETICS.map((a) => result.scores[a.id] ?? 0) }
  const bytes = new TextEncoder().encode(JSON.stringify(payload))
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeMatch(code: string | null): MatchPayload | null {
  if (!code) return null
  try {
    const bin = atob(code.replace(/-/g, '+').replace(/_/g, '/'))
    const json = new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
    const p = JSON.parse(json) as MatchPayload
    if (!AESTHETICS.some((a) => a.id === p.p) || !Array.isArray(p.v)) return null
    return p
  } catch {
    return null
  }
}

export function compatibility(a: number[], b: number[]) {
  const dot = a.reduce((s, x, i) => s + x * (b[i] ?? 0), 0)
  const mag = (v: number[]) => Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1
  return Math.round(35 + 64 * (dot / (mag(a) * mag(b))))
}

export function matchLabel(pct: number) {
  if (pct >= 85) return { title: 'Vibe soulmates', text: 'Same playlists, same Pinterest boards, same everything.' }
  if (pct >= 70) return { title: 'Aesthetic twins', text: 'You could swap wardrobes and nobody would notice.' }
  if (pct >= 55) return { title: 'Perfect complements', text: 'Different vibes that look amazing side by side.' }
  return { title: 'Opposites attract', text: 'Totally different worlds — that’s what makes it fun.' }
}

export const scoresToVector = (scores: Record<string, number>) => AESTHETICS.map((a) => scores[a.id] ?? 0)
