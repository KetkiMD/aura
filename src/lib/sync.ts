import type { Board, Result, Ritual } from './store'
import { onLocalWrite, snapshot, writeSnapshot } from './store'
import { supabase } from './supabase'

type Data = Record<string, unknown>

const STAMP = 'aura.localUpdated'
const SYNCED = 'aura.syncedUser'

const localStamp = () => Number(localStorage.getItem(STAMP) || 0)

function byId<T extends { id: string }>(a: T[] | null, b: T[] | null, pick: (x: T, y: T) => T) {
  const map = new Map<string, T>()
  for (const x of b ?? []) map.set(x.id, x)
  for (const x of a ?? []) map.set(x.id, map.has(x.id) ? pick(x, map.get(x.id)!) : x)
  return [...map.values()]
}

export function merge(local: Data, remote: Data): Data {
  const lr = local['aura.result'] as Result | null
  const rr = remote['aura.result'] as Result | null
  const result = !lr ? rr : !rr ? lr : lr.takenAt >= rr.takenAt ? lr : rr
  const saved = [...new Set([...((local['aura.saved'] as string[]) ?? []), ...((remote['aura.saved'] as string[]) ?? [])])]
  const boards = byId(local['aura.boards'] as Board[], remote['aura.boards'] as Board[], (x, y) => ({
    ...x,
    pins: [...new Set([...x.pins, ...y.pins])],
  }))
  const rituals = byId(local['aura.rituals'] as Ritual[], remote['aura.rituals'] as Ritual[], (x, y) =>
    x.lastDone >= y.lastDone ? x : y,
  )
  return { 'aura.result': result, 'aura.saved': saved, 'aura.boards': boards, 'aura.rituals': rituals }
}

export function forgetLocal() {
  writeSnapshot({})
  localStorage.removeItem(STAMP)
  localStorage.removeItem(SYNCED)
}

let flusher: (() => Promise<boolean>) | null = null

export const flushPending = () => (flusher ? flusher() : Promise.resolve(true))

export function startSync(userId: string, setSyncing: (v: boolean) => void) {
  const db = supabase
  if (!db) return
  let cancelled = false
  let ready = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let inflight: Promise<boolean> = Promise.resolve(true)

  const push = () => {
    timer = undefined
    setSyncing(true)
    inflight = inflight.then(async () => {
      const { error } = await db
        .from('user_data')
        .upsert({ user_id: userId, data: snapshot(), updated_at: new Date().toISOString() })
      if (!cancelled) setSyncing(false)
      return !error
    })
    return inflight
  }

  flusher = () => {
    if (!timer) return inflight
    clearTimeout(timer)
    return push()
  }

  const pull = async (first: boolean) => {
    setSyncing(true)
    const { data: row, error } = await db.from('user_data').select('data, updated_at').eq('user_id', userId).maybeSingle()
    if (cancelled) return
    if (error) {
      setSyncing(false)
      return
    }
    const local = snapshot()
    if (!row) {
      await push()
    } else if (first && localStorage.getItem(SYNCED) !== userId) {
      writeSnapshot(merge(local, row.data as Data))
      await push()
    } else if (Date.parse(row.updated_at) > localStamp()) {
      writeSnapshot(row.data as Data)
      localStorage.setItem(STAMP, String(Date.parse(row.updated_at)))
      setSyncing(false)
    } else if (localStamp() > Date.parse(row.updated_at)) {
      await push()
    } else {
      setSyncing(false)
    }
    localStorage.setItem(SYNCED, userId)
    ready = true
  }

  const off = onLocalWrite(() => {
    localStorage.setItem(STAMP, String(Date.now()))
    if (!ready) return
    clearTimeout(timer)
    timer = setTimeout(push, 1000)
  })

  const onVisible = () => {
    if (document.visibilityState === 'hidden' && timer) {
      clearTimeout(timer)
      void push()
    } else if (document.visibilityState === 'visible' && ready && !timer) {
      void pull(false)
    }
  }
  document.addEventListener('visibilitychange', onVisible)

  void pull(true)

  return () => {
    cancelled = true
    flusher = null
    off()
    clearTimeout(timer)
    document.removeEventListener('visibilitychange', onVisible)
  }
}
