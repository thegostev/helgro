# Helgro

Weekend experience booking website for Nordic travelers visiting Gdańsk and Tricity, Poland.

## What This Is

A static marketing and booking site built on the [Sandstone](https://lexingtonthemes.com/templates/sandstone) template from Lexington Themes. Visitors browse curated weekend experiences (projects), learn about the team and services, read blog content, and book experiences via embedded Cal.com with Stripe payments.

**Status**: Baseline template deployed. Content customization and booking integration in progress.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.15.6 (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.1.17 (OKLCH color system, Inter variable font)
- **Content**: Astro Content Collections (Markdown with Zod validation)
- **Booking**: Cal.com (planned)
- **Payments**: Stripe via Cal.com (planned)
- **Hosting**: Cloudflare Pages (edge CDN)
- **CMS**: Sanity CMS (planned)

## Quick Start

```bash
cd helgro
npm install
npm run dev        # → http://localhost:4321
```

## Build & Deploy

```bash
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

Cloudflare Pages auto-deploys from `git push` to `main`.

## Project Structure

```
Helgro/                        # Project root (documentation)
├── CLAUDE.md                  # Claude Code conventions & project charter
├── ARCHITECTURE.md            # WBS decomposition (L0–L3)
├── README.md                  # This file
├── docs/
│   ├── lexington-themes-guide.md  # Sandstone template reference
│   └── adr/                   # Architectural Decision Records
└── helgro/                    # Astro project (git repo)
    ├── src/
    │   ├── components/        # 66 .astro components
    │   ├── content/           # 5 Markdown collections
    │   ├── layouts/           # 6 page layouts
    │   ├── pages/             # File-based routing (14+ pages)
    │   └── styles/global.css  # Tailwind theme configuration
    ├── astro.config.mjs
    └── package.json
```

## Documentation

- [CLAUDE.md](CLAUDE.md) — Project conventions, key patterns, known debt, quality matrix
- [ARCHITECTURE.md](ARCHITECTURE.md) — Full system decomposition (subsystems, modules, components)
- [docs/lexington-themes-guide.md](docs/lexington-themes-guide.md) — Sandstone template reference (components, collections, theming)
- [docs/adr/](docs/adr/) — Architectural Decision Records

## Performance

Sandstone template baseline scores (Lighthouse):
- Performance: 100
- Accessibility: 98
- Best Practices: 100
- SEO: 100
