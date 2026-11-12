import { Link } from 'react-router-dom'
import { AESTHETICS, pexelsUrl } from '../data/aesthetics'
import { useResult } from '../lib/store'

const FEATURES = [
  { icon: '◐', title: 'Find your aesthetic', text: 'A 1-minute visual quiz gives you your aesthetic name, palette and a story-ready card.' },
  { icon: '✦', title: 'Scroll your vibe', text: 'An endless, Pinterest-style feed tuned to you. Save what you love into moodboards.' },
  { icon: '♪', title: 'Hear your vibe', text: 'Every aesthetic has its own soundtrack that plays while you scroll.' },
  { icon: '❖', title: 'Glow-up calendar', text: 'Hair trims, nails, skincare, plants — a pretty calendar that remembers it all for you.' },
]

export default function Landing() {
  const [result] = useResult()
  const collage = AESTHETICS.flatMap((a) => a.images.slice(3, 5).map((id) => ({ id, a })))

  return (
    <div className="relative overflow-hidden">
      <div className="aura-blob w-[28rem] h-[28rem] bg-[#ff9ad5] -top-32 -left-32" />
      <div className="aura-blob w-[32rem] h-[32rem] bg-[#7fe3ff] top-40 -right-40" style={{ animationDelay: '-5s' }} />
      <div className="aura-blob w-[24rem] h-[24rem] bg-[#b79cff] top-[30rem] left-1/3" style={{ animationDelay: '-9s' }} />

      <section className="relative mx-auto max-w-6xl px-5 pt-16 md:pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-muted mb-5">Your vibe, decoded</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
            What’s your <em className="aura-gradient not-italic md:italic">aesthetic</em>?
          </h1>
          <p className="mt-6 text-lg text-muted max-w-md">
            Take a 1-minute visual quiz. Get your aesthetic, your colour palette and a feed, playlist and calendar that
            look just like you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/quiz"
              className="px-7 py-4 rounded-full bg-gradient-to-r from-[#ff9ad5] via-[#b79cff] to-[#7fe3ff] text-[#0e0b14] font-semibold shadow-lg shadow-[#b79cff]/30 hover:scale-[1.03] transition"
            >
              {result ? 'Retake the quiz' : 'Discover my aesthetic →'}
            </Link>
            <Link to={result ? '/me' : '/explore'} className="px-7 py-4 rounded-full border border-ink/20 hover:bg-ink/5 transition">
              {result ? 'See my aesthetic' : 'Just browse'}
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted">No sign-up. Everything stays on your device.</p>
        </div>

        <div className="relative h-[26rem] md:h-[34rem] overflow-hidden md:overflow-visible rounded-3xl md:rounded-none fade-up" style={{ animationDelay: '.15s' }}>
          <div className="grid grid-cols-3 gap-3 h-full rotate-[-4deg] scale-110">
            {[0, 1, 2].map((col) => (
              <div key={col} className={`flex flex-col gap-3 ${col === 1 ? 'md:-mt-16' : 'mt-10 md:mt-0'}`}>
                {collage.filter((_, i) => i % 3 === col).slice(0, 4).map(({ id, a }) => (
                  <div key={id} className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img src={pexelsUrl(id, 400)} alt={a.name} className="w-full h-44 object-cover" loading="lazy" />
                    <span className="absolute bottom-2 left-2 text-[10px] px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur">
                      {a.emoji} {a.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-16">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {AESTHETICS.map((a) => (
            <div key={a.id} className="shrink-0 flex items-center gap-2 rounded-full border border-ink/10 bg-surface/60 pl-1 pr-4 py-1">
              <span className="flex -space-x-1">
                {a.palette.slice(0, 3).map((c) => (
                  <span key={c} className="w-5 h-5 rounded-full border border-black/10" style={{ background: c }} />
                ))}
              </span>
              <span className="text-sm whitespace-nowrap">{a.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-3xl border border-ink/10 bg-surface/60 backdrop-blur p-6">
            <div className="text-2xl aura-gradient">{f.icon}</div>
            <h3 className="font-display text-xl mt-3">{f.title}</h3>
            <p className="text-sm text-muted mt-2">{f.text}</p>
          </div>
        ))}
      </section>

      <footer className="relative border-t border-ink/10 py-8 text-center text-xs text-muted">
        © AURA · Photos from <a className="underline" href="https://www.pexels.com" target="_blank" rel="noreferrer">Pexels</a> · Music via YouTube · <Link to="/help" className="underline">Help & contact</Link>
      </footer>
    </div>
  )
}
