# AURA

Discover your aesthetic, scroll a feed tuned to it, listen to matching music and keep a glow-up calendar.

- React + TypeScript + Vite + Tailwind CSS v4
- No backend yet: results, saved pins, boards and calendar rituals live in `localStorage`
- Images: Pexels (direct CDN URLs, credited). Music: official Spotify embeds.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build && npm run lint
```

Aesthetic data (palettes, images, playlists, copy) lives in `src/data/aesthetics.ts`; quiz questions in `src/data/quiz.ts`.
Deploys to Vercel as-is (`vercel.json` handles client-side routes).
