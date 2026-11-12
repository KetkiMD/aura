import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AESTHETICS, byId, pexelsUrl } from '../data/aesthetics'
import { OPTIONS_PER_QUESTION, PICK_POINTS, QUIZ, RELATED_POINTS } from '../data/quiz'
import { nowISO, useResult, useStored, useVibe } from '../lib/store'

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function score(picks: string[]) {
  const s: Record<string, number> = Object.fromEntries(AESTHETICS.map((a) => [a.id, 0]))
  for (const id of picks) {
    s[id] += PICK_POINTS
    for (const r of byId(id)!.related) s[r] += RELATED_POINTS
  }
  return s
}

function rank(scores: Record<string, number>, picks: string[]) {
  const first = (id: string) => (picks.includes(id) ? picks.indexOf(id) : 99)
  return AESTHETICS.map((a) => a.id).sort((x, y) => scores[y] - scores[x] || first(x) - first(y))
}

function optionsFor(picks: string[]) {
  if (!picks.length) return shuffle(AESTHETICS.map((a) => a.id)).slice(0, OPTIONS_PER_QUESTION)
  const leaders = rank(score(picks), picks).slice(0, OPTIONS_PER_QUESTION / 2)
  const rest = shuffle(AESTHETICS.map((a) => a.id).filter((id) => !leaders.includes(id)))
  return shuffle([...leaders, ...rest.slice(0, OPTIONS_PER_QUESTION - leaders.length)])
}

export default function Quiz() {
  const navigate = useNavigate()
  const [, setResult] = useResult()
  const [, setVibe] = useVibe()
  const [pendingMatch, setPendingMatch] = useStored<string | null>('aura.pendingMatch', null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [optionSets, setOptionSets] = useState<string[][]>(() => [optionsFor([])])
  const q = QUIZ[step]

  function pick(aesthetic: string) {
    const next = [...answers.slice(0, step), aesthetic]
    setAnswers(next)
    if (step < QUIZ.length - 1) {
      setOptionSets((sets) => [...sets.slice(0, step + 1), optionsFor(next)])
      setStep(step + 1)
      return
    }
    const scores = score(next)
    const [primary, secondary] = rank(scores, next)
    setResult({ primary, secondary, scores, takenAt: nowISO() })
    setVibe(null)
    if (pendingMatch) {
      setPendingMatch(null)
      navigate(`/match?u=${pendingMatch}`)
    } else navigate('/me?new=1')
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => (step ? setStep(step - 1) : navigate('/'))}
          className="w-10 h-10 rounded-full border border-ink/15 hover:bg-ink/5"
          aria-label="Back"
        >
          ←
        </button>
        <div className="flex-1 h-1.5 rounded-full bg-ink/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff9ad5] via-[#b79cff] to-[#7fe3ff] transition-all duration-500"
            style={{ width: `${((step + 1) / QUIZ.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted tabular-nums">
          {step + 1}/{QUIZ.length}
        </span>
      </div>

      <h2 key={q.id} className="font-display text-3xl md:text-5xl text-center mb-10 fade-up">
        {q.title}
      </h2>

      <div key={`${q.id}-grid`} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 fade-up">
        {optionSets[step].map((id) => {
          const a = byId(id)!
          const ring = answers[step] === id ? 'ring-2 ring-[#b79cff] ring-offset-2 ring-offset-bg' : ''
          if (q.kind === 'image')
            return (
              <button key={id} onClick={() => pick(id)} className={`group relative aspect-[3/4] rounded-2xl overflow-hidden bg-ink/5 ${ring}`}>
                <img src={pexelsUrl(a.images[q.imageIndex], 500)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </button>
            )
          if (q.kind === 'palette')
            return (
              <button key={id} onClick={() => pick(id)} className={`rounded-2xl overflow-hidden border border-ink/10 hover:-translate-y-1 transition ${ring}`}>
                <div className="flex h-36 md:h-44">
                  {a.palette.map((c) => (
                    <span key={c} className="flex-1" style={{ background: c }} />
                  ))}
                </div>
              </button>
            )
          return (
            <button
              key={id}
              onClick={() => pick(id)}
              className={`rounded-2xl border border-ink/10 bg-surface/70 hover:bg-ink/10 p-5 min-h-28 text-left transition hover:-translate-y-1 ${ring}`}
            >
              {a.answers[q.answerKey]}
            </button>
          )
        })}
      </div>
      <p className="text-center text-muted text-sm mt-8">Go with your gut — there are no wrong answers.</p>
    </div>
  )
}
