# Mukul Gupta — Portfolio

Personal portfolio of **Mukul Gupta** — AI Automation Engineer, GenAI Developer & Web Developer.

🔗 **Live:** https://mukulportfolio-rho.vercel.app/

---

## What's in this portfolio

### Design system
- **Font:** Geist + Geist Mono. Display weight at `tracking-[-0.025em]` with `clamp` fluid scale.
- **Color:** Single accent — **Emerald `#10b981`** — on true off-black base (`#0a0a0a`).
- **Surfaces:** Two surface levels (`#111`, `#161616`) with `rgba` hairline borders.
- **Radius:** Unified 12px across all cards and inputs.

### Sections
| Section | What's there |
|---|---|
| **Navbar** | Framer Motion `useScroll` scroll detection. One CTA: "Get in touch". |
| **Hero** | Headline left, live status panel right. Cursor-follow glow, word stagger animation, stat strip below. |
| **About** | Bio left, 6 capability tiles right. |
| **Projects** | Cards numbered `01–06`. Mono tag pills, single accent on bullet dots. |
| **Experience** | Date + role columns separated by hairlines. |
| **Skills** | **RadialOrbitalTimeline** — 6 nodes orbiting a core (AI Agents, Automation, GenAI Integrations, MCP Development, Full-Stack Web, APIs & Webhooks). Click to expand detail card. |
| **Tech Stack** | Single grouped spec list — label row + mono chips. |
| **GitHub Activity** | Live contribution calendar (emerald theme) + total commits stat. |
| **Certifications** | Clean tiles with mono tags. |
| **Testimonials** | Blockquote + figcaption pattern. |
| **Contact** | EmailJS form (falls back to `mailto:`). Contact info as bordered list. |
| **Footer** | Mono wordmark, GitHub / LinkedIn / Email icon buttons, copyright. |
| **Floating Action Menu** | Fixed bottom-right `+` button — GitHub, LinkedIn, Email. Framer Motion spring. |
| **Neko Cat** | Pixel-art canvas cat (16×16 @ 4× scale, `imageRendering: pixelated`). Starts above the hero status box. Follows cursor, walks/runs toward it, sleeps after 6s idle (animated ZZZ), wakes on mouse move, flips to face travel direction. |
| **Custom Cursor** | Dot + ring cursor that follows mouse with spring lag. |
| **Scroll Progress** | Thin accent-color bar at top of viewport. |

### Performance
- JS bundle: **449 kB** (gzip 143 kB)
- CSS: **47 kB** (gzip 8.7 kB)

---

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4**
- **Framer Motion** — animations, scroll detection, spring physics
- **react-github-calendar** — live contribution heatmap
- **EmailJS** — contact form
- **lucide-react** — icons
- **shadcn/ui primitives** — Badge, Button, Card (in `src/components/ui/`)

---

## Getting Started

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run preview  # preview build locally
```

## Environment

Copy `.env.example` → `.env` and fill EmailJS keys:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Assets still needed

- `public/resume.pdf` — hero Resume button points here
- `public/screenshots/whatsapp-bot.png` — only project screenshot still missing

## Project Structure

```
src/
  components/
    common/       # CustomCursor, ScrollProgress, NekoCat, MagneticButton, SectionWrapper
    hero/         # Hero, HeroStats
    about/        # About
    navbar/       # Navbar
    skills/       # Skills (RadialOrbitalTimeline)
    projects/     # Projects, ProjectCard
    experience/   # Experience
    techstack/    # TechStack
    github/       # GitHubActivity
    certifications/
    testimonials/
    contact/      # ContactForm, ContactInfoCard
    footer/       # Footer
    ui/           # badge, button, card, radial-orbital-timeline, floating-action-menu
  data/           # projects, skills, stats, experiences, testimonials, certifications
  lib/            # framer-motion variants, cn utils
public/
  screenshots/    # project screenshots (1400w, compressed)
  og-image.png    # social share card (1200×630)
  resume.pdf      # drop here — linked from hero
```

## Deployment

Hosted on **Vercel** (account: `drakenop1`, project: `mukulportfolio`).  
Push to `main` → auto-deploy.  
Live: https://mukulportfolio-rho.vercel.app/

---

© 2026 Mukul Gupta
