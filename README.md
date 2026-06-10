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
│   │   ├── Hero.tsx        
│   │   ├── About.tsx       
│   │   ├── Timeline.tsx    
│   │   ├── ProjectLab.tsx  
│   │   ├── Arcade.tsx      → Odd or Even cricket game
│   │   ├── Terminal.tsx    → CLI terminal with commands
│   │   ├── FutureVision.tsx 
│   │   └── Contact.tsx     
│   └── ui/
│       ├── Navbar.tsx        → Minimal sticky nav
│       ├── CustomCursor.tsx  → Amber dot cursor (desktop)
└── lib/
    ├── data.ts             → ALL CONTENT LIVES HERE
    └── utils.ts            → Helpers
```