import type { ThemeVars } from '../data/aesthetics'

export const DEFAULT_THEME: ThemeVars = {
  bg: '#0e0b14',
  surface: '#1a1524',
  ink: '#f4effa',
  muted: '#a99fbb',
  accent: '#c9a7ff',
  accent2: '#ff9ad5',
}

export function applyTheme(t: ThemeVars) {
  const root = document.documentElement
  for (const [k, v] of Object.entries(t)) root.style.setProperty(`--${k}`, v)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg)
}
