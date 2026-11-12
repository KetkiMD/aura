export const CONTACT_EMAIL = 'aura.vibes.help@gmail.com'

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
