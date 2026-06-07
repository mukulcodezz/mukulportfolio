# Mukul Gupta — Portfolio

Personal portfolio of **Mukul Gupta** — AI Automation Engineer, GenAI Developer & Web Developer.

🔗 **Live:** https://mukulportfolio-rho.vercel.app/

---

## What changed in the latest redesign

Full design-system overhaul. Every section rewritten. Summary of what landed:

### Design system
- **Font:** Switched from Inter to **Geist + Geist Mono**. Display weight at `tracking-[-0.025em]` with `clamp` fluid scale.
- **Color:** Replaced the AI-purple + cyan dual-gradient with a single accent — **Emerald `#10b981`** — on a true off-black base (`#0a0a0a`). One color, whole page.
- **Surfaces:** Two surface levels (`#111`, `#161616`) with `rgba` hairline borders. No glass blur on every card.
- **Radius:** Unified to 12 px. No mixed round/square inconsistency.

### Sections rebuilt
| Section | Change |
|---|---|
| **Navbar** | Removed scroll listener (`window.addEventListener`). Now uses Framer Motion `useScroll`. Consolidated to one CTA: "Get in touch". |
| **Hero** | New layout: headline + subtext left, mono status panel right. Removed: typed.js typewriter, WebGL neural mesh, shader gradient, custom cursor, scroll cue. Stat strip on a hairline below. |
| **About** | Split layout: bio left, 6 capability tiles right. No profile card floaters. |
| **Projects** | Cards numbered `01–06`. Mono tag pills. Removed per-card random accent colors, emojis, and gradient badges. Single accent on bullet dots. |
| **Experience** | Date column + role column separated by hairlines. No glass cards. |
| **Skills** | Replaced 2-col static grid with **RadialOrbitalTimeline** — 6 nodes orbiting a central core (AI Agents, Automation, GenAI Integrations, MCP Development, Full-Stack Web, APIs & Webhooks). Click any node to expand detail card with description, energy bar, and connected nodes. |
| **Tech Stack** | Replaced 3 equal cards with a single grouped spec list (label row + mono chips). |
| **GitHub Activity** | Recolored calendar to emerald theme. Total commits stat alongside headline. |
| **Certifications** | Clean tiles, mono tags, consistent with skills layout. |
| **Testimonials** | Blockquote + figcaption pattern. No floating quote icons, no random accents. |
| **Contact** | Form labels above inputs (not placeholder-as-label). Contact info as a bordered list. |
| **Footer** | Mono wordmark, 3 social icon buttons, copyright. No gradient text. |
| **Floating Action Menu** | Fixed bottom-right `+` button — expands to GitHub, LinkedIn, Email social links. Framer Motion spring animation. |

### Removed
- Custom cursor (`CustomCursor.tsx`) — accessibility hostile, perf cost
- WebGL neural mesh (`NeuralMesh.tsx`) + Three.js dependency from the render path
- Shader gradient (`ShaderBackground.tsx`) + `@shadergradient/react` from the hero
- `typed.js` typewriter in hero
- `useHeroParallax` hook (scroll listener)
- `ProfileCard` floating badges
- `GlassCard`, `AnimatedTag` — replaced with plain surface + border tokens
- All em-dashes from visible copy (replaced with commas, periods, colons)
- Section-label eyebrows on every section (down to 1 per 3 sections max)
- Scroll cue ("Scroll ↓") in hero

### Performance
- JS bundle: **443 kB** (gzip 142 kB)
- CSS: **47 kB** (gzip 8.7 kB)

---

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4**
- **Framer Motion** — page animations, scroll-aware navbar
- **react-github-calendar** — live contribution heatmap
- **EmailJS** — contact form (falls back to `mailto:` when keys absent)
- **lucide-react** — icons

> Three.js / @react-three/fiber / @shadergradient still in `package.json` (orbital timeline uses them). They're lazy-loaded and not in the critical render path.

---

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Environment

Copy `.env.example` to `.env` and fill in EmailJS keys:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Assets still needed

- `public/resume.pdf` — hero Resume button points here
- `public/screenshots/whatsapp-bot.png` — only screenshot still missing (5 of 6 done)

## Project Structure

```
src/
  components/   # section + UI components
  data/         # content: projects, skills, stats, experiences, testimonials
  lib/          # framer-motion variants, utils
public/
  screenshots/  # project screenshots (1400w, compressed)
  og-image.png  # social share card (1200x630)
  resume.pdf    # linked from hero (drop here)
```

## Deployment

Hosted on **Vercel** (account: `drakenop1`, project: `mukulportfolio`).  
Push to `main` triggers automatic deploy.  
Live at: https://mukulportfolio-rho.vercel.app/

---

© 2026 Mukul Gupta
