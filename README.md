# Darsin David J — Portfolio

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — custom amber/charcoal palette
- **Framer Motion** — all animations
- **Google Fonts** — Space Grotesk, Playfair Display, JetBrains Mono

---

## Structure

```
src/
├── app/
│   ├── layout.tsx          → Fonts, metadata, SEO
│   ├── page.tsx            → Main page, assembles sections
│   └── globals.css         → CSS variables, film grain, cursor
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        → Film title card opening
│   │   ├── About.tsx       → Zine-style personality grid
│   │   ├── Timeline.tsx    → ACT-based chapter timeline
│   │   ├── ProjectLab.tsx  → Expandable experiment cards
│   │   ├── Arcade.tsx      → Odd or Even cricket game
│   │   ├── Terminal.tsx    → CLI terminal with commands
│   │   ├── FutureVision.tsx→ Field notes and fragments
│   │   └── Contact.tsx     → Conversational contact
│   └── ui/
│       ├── LoadingScreen.tsx → Absurd fake progress bar
│       ├── Navbar.tsx        → Minimal sticky nav
│       ├── CustomCursor.tsx  → Amber dot cursor (desktop)
│       └── EasterEggs.tsx    → Konami code, idle detector
└── lib/
    ├── data.ts             → ALL CONTENT LIVES HERE
    └── utils.ts            → Helpers
```

---

## Updating Content

**All content is in `src/lib/data.ts`.** You don't need to touch any other file to update:

- Projects → Edit `PROJECTS` array
- Timeline → Edit `TIMELINE` array
- Skills → Edit `SKILLS` object
- Future fragments → Edit `FUTURE_FRAGMENTS` array
- Terminal commands → Edit `TERMINAL_COMMANDS` object

---

## Easter Eggs

The site has several hidden interactions:

| Easter Egg | How to Trigger |
|---|---|
| Absurd loading bar | First load — auto-triggers |
| Logo message | Click the "DDJ" logo 5+ times |
| Konami code | ↑↑↓↓←→←→BA |
| Idle message | Leave page idle for 45 seconds |
| Terminal: `sudo hire me` | Type it in the terminal |
| Terminal: `sudo rm -rf /` | Type it (safely handled) |
| Terminal: `neofetch` | System info in neofetch style |
| Terminal: `cat manifesto.txt` | Read the manifesto |
| Terminal: `ls` | List hidden files |
| Project card egg | Click any project card 7+ times |
| Arcade achievement | Score 100+ runs in one innings |
| Arcade: Lucky 7 | Get a sum of exactly 7 in arcade |
| Skill tag hover | Click amber-highlighted skills for context |

---

## GitHub Setup

```bash
# Initialize git
git init
git add .
git commit -m "initial commit: portfolio v1.0.0"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## Vercel Deployment

### Option A: Via Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts — select Next.js, deploy
```

### Option B: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy**
5. Done. Your site is live.

### Custom Domain

In Vercel dashboard → Project Settings → Domains → Add your domain.

---

## Resume Integration

The terminal `resume` command outputs a text-formatted resume. To update it:

1. Open `src/lib/data.ts`
2. Find `TERMINAL_COMMANDS.resume`
3. Edit the text — it's plain string, no formatting needed

To add a PDF download:
1. Put your resume PDF in `/public/resume.pdf`
2. Add a download link in `Contact.tsx` or `Navbar.tsx`:
   ```tsx
   <a href="/resume.pdf" download>Download Resume</a>
   ```

---

## SEO

Metadata is in `src/app/layout.tsx`. Update:
- `title` — page title
- `description` — meta description
- `keywords` — keyword array
- `openGraph.title` / `openGraph.description` — for social sharing

---

## Customization Quick Reference

| Thing to change | File |
|---|---|
| Color palette | `tailwind.config.ts` + `globals.css` |
| Fonts | `app/layout.tsx` |
| Opening headline | `components/sections/Hero.tsx` |
| All projects | `lib/data.ts` → `PROJECTS` |
| Timeline | `lib/data.ts` → `TIMELINE` |
| Terminal commands | `lib/data.ts` → `TERMINAL_COMMANDS` |
| Loading bar steps | `components/ui/LoadingScreen.tsx` |
| Contact links | `components/sections/Contact.tsx` |

---

Built with intention. No floating blue blobs. No waving hand emojis.
