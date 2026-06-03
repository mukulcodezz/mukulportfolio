# Mukul Gupta — Portfolio

Personal portfolio of **Mukul Gupta** — AI Automation Engineer, GenAI Developer & Web Developer.
Immersive single-page site with a WebGL neural-mesh hero, shader background, and Framer Motion animations.

🔗 **Live:** https://mukulportfolio-rho.vercel.app/

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4**
- **Framer Motion** — animations
- **Three.js** / **@react-three/fiber** + **drei** — 3D neural mesh
- **@shadergradient/react** — animated shader background
- **EmailJS** — contact form
- **lucide-react** — icons

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Environment

Copy `.env.example` to `.env` and fill in your EmailJS keys (the contact form
falls back to a `mailto:` draft when these are absent):

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Project Structure

```
src/
  components/   # section + UI components (hero, about, projects, contact, ...)
  data/         # content: projects, skills, stats, testimonials, timeline
  hooks/        # parallax, count-up, mouse helpers
  lib/          # framer-motion variants, utils
public/
  screenshots/  # project screenshots
  og-image.png  # social share card
```

## Deployment

Hosted on **Vercel**. Pushing to `main` triggers an automatic deploy.

---

© 2025 Mukul Gupta
