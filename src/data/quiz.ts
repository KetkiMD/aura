import type { QuizAnswerKey } from './aesthetics'

export type QuizQuestion =
  | { id: string; title: string; kind: 'image'; imageIndex: number }
  | { id: string; title: string; kind: 'palette' }
  | { id: string; title: string; kind: 'text'; answerKey: QuizAnswerKey }

export const QUIZ: QuizQuestion[] = [
  { id: 'scene', title: 'Pick the picture you’d want to live in', kind: 'image', imageIndex: 0 },
  { id: 'sunday', title: 'Your perfect Sunday looks like…', kind: 'text', answerKey: 'sunday' },
  { id: 'palette', title: 'Which colour story feels like you?', kind: 'palette' },
  { id: 'photo', title: 'Which photo feels most like you?', kind: 'image', imageIndex: 1 },
  { id: 'song', title: 'What’s playing in your headphones?', kind: 'text', answerKey: 'song' },
  { id: 'place', title: 'Teleport me to…', kind: 'text', answerKey: 'place' },
  { id: 'mood', title: 'Pick a mood', kind: 'image', imageIndex: 2 },
  { id: 'outfit', title: 'Your go-to outfit', kind: 'text', answerKey: 'outfit' },
  { id: 'item', title: 'Grab one thing on your way out', kind: 'text', answerKey: 'item' },
  { id: 'wallpaper', title: 'Last one — choose your phone wallpaper', kind: 'image', imageIndex: 3 },
]

export const PICK_POINTS = 3
export const RELATED_POINTS = 1
export const OPTIONS_PER_QUESTION = 8
