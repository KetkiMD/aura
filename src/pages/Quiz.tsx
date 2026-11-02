import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AESTHETICS, byId, pexelsUrl } from '../data/aesthetics'
import { QUIZ } from '../data/quiz'
import { todayISO, useResult, useVibe } from '../lib/store'

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz() {
  const navigate = useNavigate()
  const [, setResult] = useResult()
  const [, setVibe] = useVibe()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const questions = useMemo(() => QUIZ.map((q) => ({ ...q, options: shuffle(q.options) })), [])
  const q = questions[step]

  function pick(aesthetic: string) {
    const next = [...answers.slice(0, step), aesthetic]
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep(step + 1)
      return
    }
    const scores: Record<string, number> = Object.fromEntries(AESTHETICS.map((a) => [a.id, 0]))
    next.forEach((id) => (scores[id] += 1))
    const ranked = AESTHETICS.map((a) => a.id).sort((x, y) => scores[y] - scores[x] || next.indexOf(x) - next.indexOf(y))
    setResult({ primary: ranked[0], secondary: ranked[1], scores, takenAt: todayISO() })
    setVibe(null)
    navigate('/me?new=1')
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
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted tabular-nums">
          {step + 1}/{questions.length}
        </span>
      </div>

      <h2 key={q.id} className="font-display text-3xl md:text-5xl text-center mb-10 fade-up">
        {q.title}
      </h2>

      <div key={`${q.id}-grid`} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 fade-up">
        {q.options.map((o) => {
          const a = byId(o.aesthetic)!
          const selected = answers[step] === o.aesthetic
          const ring = selected ? 'ring-2 ring-[#b79cff] ring-offset-2 ring-offset-bg' : ''
          if (q.kind === 'image')
            return (
              <button key={o.aesthetic} onClick={() => pick(o.aesthetic)} className={`group relative aspect-[3/4] rounded-2xl overflow-hidden ${ring}`}>
                <img
                  src={pexelsUrl(a.images[q.imageIndex ?? 0], 500)}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition" />
              </button>
            )
          if (q.kind === 'palette')
            return (
              <button key={o.aesthetic} onClick={() => pick(o.aesthetic)} className={`group rounded-2xl overflow-hidden border border-ink/10 hover:-translate-y-1 transition ${ring}`}>
                <div className="flex h-36 md:h-44">
                  {a.palette.map((c) => (
                    <span key={c} className="flex-1" style={{ background: c }} />
                  ))}
                </div>
              </button>
            )
          return (
            <button
              key={o.aesthetic}
              onClick={() => pick(o.aesthetic)}
              className={`rounded-2xl border border-ink/10 bg-surface/70 hover:bg-ink/10 p-5 min-h-28 text-left transition hover:-translate-y-1 ${ring}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <p className="text-center text-muted text-sm mt-8">Go with your gut — there are no wrong answers.</p>
    </div>
  )
}
