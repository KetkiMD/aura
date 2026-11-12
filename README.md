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
- Data lives in `localStorage`; with Supabase configured, users can log in (Google or email link) and it syncs across devices
- Images: Pexels (direct CDN URLs, credited). Music: official Spotify embeds.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build && npm run lint
```

## Login & sync (Supabase)
Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (e.g. in `.env.production` for the Pages build, `.env.local` for dev). Without them the app runs local-only and the login UI is hidden.

The table and row-level security live in `supabase/migrations/`. Local stack for development: `npx supabase start` (emails land in Mailpit at http://127.0.0.1:54324).

Aesthetic data (palettes, images, playlists, copy) lives in `src/data/aesthetics.ts`; quiz questions in `src/data/quiz.ts`.
Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. Also deploys to Vercel as-is (`vercel.json` handles client-side routes).
