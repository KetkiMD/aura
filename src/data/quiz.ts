export type QuizOption = { aesthetic: string; label: string }
export type QuizQuestion = {
  id: string
  title: string
  kind: 'image' | 'palette' | 'text'
  imageIndex?: number
  options: QuizOption[]
}

const ids = ['dark-academia', 'clean-girl', 'coquette', 'cottagecore', 'y2k', 'old-money', 'boho', 'desi-retro']

export const QUIZ: QuizQuestion[] = [
  { id: 'scene', title: 'Pick the picture you’d want to live in', kind: 'image', imageIndex: 0, options: ids.map((a) => ({ aesthetic: a, label: '' })) },
  {
    id: 'sunday', title: 'Your perfect Sunday looks like…', kind: 'text',
    options: [
      { aesthetic: 'dark-academia', label: 'Reading poetry in a café while it rains' },
      { aesthetic: 'clean-girl', label: 'Pilates, a smoothie and a long skincare routine' },
      { aesthetic: 'coquette', label: 'Writing my diary with pink gel pens' },
      { aesthetic: 'cottagecore', label: 'Baking bread and picking flowers' },
      { aesthetic: 'y2k', label: 'Mall trip + karaoke with the besties' },
      { aesthetic: 'old-money', label: 'Brunch at the club, then tennis' },
      { aesthetic: 'boho', label: 'Road trip to watch the sunset somewhere new' },
      { aesthetic: 'desi-retro', label: 'Old Bollywood movie marathon with chai' },
    ],
  },
  { id: 'palette', title: 'Which colour story feels like you?', kind: 'palette', options: ids.map((a) => ({ aesthetic: a, label: '' })) },
  { id: 'room', title: 'Choose your dream room', kind: 'image', imageIndex: 1, options: ids.map((a) => ({ aesthetic: a, label: '' })) },
  {
    id: 'song', title: 'What’s playing in your headphones?', kind: 'text',
    options: [
      { aesthetic: 'dark-academia', label: 'Chopin nocturnes, Hozier' },
      { aesthetic: 'clean-girl', label: 'SZA, Frank Ocean, soft R&B' },
      { aesthetic: 'coquette', label: 'Lana Del Rey, The Marías' },
      { aesthetic: 'cottagecore', label: 'Fleet Foxes, folklore-era Taylor' },
      { aesthetic: 'y2k', label: 'Britney, *NSYNC, Paris Hilton' },
      { aesthetic: 'old-money', label: 'Jazz standards & Sinatra' },
      { aesthetic: 'boho', label: 'Acoustic indie folk' },
      { aesthetic: 'desi-retro', label: 'Kishore Kumar & R.D. Burman' },
    ],
  },
  {
    id: 'item', title: 'Grab one thing on your way out', kind: 'text',
    options: [
      { aesthetic: 'dark-academia', label: '📜 A worn leather notebook' },
      { aesthetic: 'clean-girl', label: '🧴 Lip oil' },
      { aesthetic: 'coquette', label: '🎀 A satin ribbon' },
      { aesthetic: 'cottagecore', label: '🧺 A wicker basket' },
      { aesthetic: 'y2k', label: '📱 A sparkly flip phone' },
      { aesthetic: 'old-money', label: '⌚ Grandpa’s vintage watch' },
      { aesthetic: 'boho', label: '🪶 Layered silver rings' },
      { aesthetic: 'desi-retro', label: '🌼 A gajra & jhumkas' },
    ],
  },
  { id: 'mood', title: 'Last one — pick a mood', kind: 'image', imageIndex: 2, options: ids.map((a) => ({ aesthetic: a, label: '' })) },
]
