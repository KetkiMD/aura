import { useCallback, useEffect, useState } from 'react'

export type Result = { primary: string; secondary: string; scores: Record<string, number>; takenAt: string }
export type Board = { id: string; name: string; pins: string[] }
export type Ritual = { id: string; title: string; emoji: string; everyDays: number; lastDone: string; streak: number }

const listeners = new Map<string, Set<() => void>>()

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => read(key, fallback))
  useEffect(() => {
    const sync = () => setValue(read(key, fallback))
    if (!listeners.has(key)) listeners.set(key, new Set())
    listeners.get(key)!.add(sync)
    return () => {
      listeners.get(key)!.delete(sync)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, fallback)
      const v = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      localStorage.setItem(key, JSON.stringify(v))
      listeners.get(key)?.forEach((l) => l())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  )
  return [value, set] as const
}

export const useResult = () => useStored<Result | null>('aura.result', null)
export const useSaved = () => useStored<string[]>('aura.saved', [])
export const useBoards = () => useStored<Board[]>('aura.boards', [])
export const useRituals = () => useStored<Ritual[]>('aura.rituals', [])
export const useVibe = () => useStored<string | null>('aura.vibe', null)

export const uid = () => Math.random().toString(36).slice(2, 10)
export const todayISO = () => new Date().toISOString().slice(0, 10)
