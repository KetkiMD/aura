# AURA

Discover your aesthetic, scroll a feed tuned to it, listen to matching music and keep a glow-up calendar.

**Live (Version 1):** https://ketkimd.github.io/aura/

## Version 1 features
- 10-question adaptive aesthetic quiz across 16 aesthetics, with blended results (name + palette) and a downloadable story card
- Per-vibe theming: background, glow and accents change with each aesthetic
- Pinterest-style Explore feed of fashion, decor and object imagery: infinite scroll, filters, save, full-screen pin view, "More like this"
- Moodboards with a built-in example board
- Glow-up calendar: recurring beauty / movement / nutrition / mind / home rituals, streaks, daily progress ring
- Friend vibe match via shareable link (no backend)
- Matching Spotify playlist player

- React + TypeScript + Vite + Tailwind CSS v4
- No backend yet: results, saved pins, boards and calendar rituals live in `localStorage`
- Images: Pexels (direct CDN URLs, credited). Music: official Spotify embeds.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build && npm run lint
```

Aesthetic data (palettes, images, playlists, copy) lives in `src/data/aesthetics.ts`; quiz questions in `src/data/quiz.ts`.
Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. Also deploys to Vercel as-is (`vercel.json` handles client-side routes).
