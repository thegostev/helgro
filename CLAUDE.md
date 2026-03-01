# Helgro

Weekend experience booking website for Nordic travelers visiting Gdańsk and Tricity. Built on Lexington Themes Sandstone template (Astro SSG + Tailwind CSS v4), with Cal.com for booking and Stripe payments. Deployed to Cloudflare Pages.

## Constitution

See `.specify/memory/constitution.md` — use `/speckit.constitution` to create or update.

The constitution contains immutable project principles that no atomic task can violate. It is versioned and governed by Spec Kit. All downstream artifacts (specs, plans, tasks) must comply.

## Architecture

Static site (SSG) built on the Sandstone template from Lexington Themes. Astro generates static HTML at build time from Markdown content collections and `.astro` components. Third-party integrations (Cal.com booking, Stripe payments) will be embedded client-side. Deployed to Cloudflare Pages edge network.

- See `ARCHITECTURE.md` for WBS decomposition (S1-S3, modules, components)
- See `docs/adr/` for architectural decisions affecting this project

## Key patterns

- **Component hierarchy**: Pages → Layouts → Global components (Nav, Footer, Search) → Page-specific components → Foundation components (Button, Text, Wrapper)
- **Content via Astro Collections**: 5 collections (posts, projects, team, services, legal) with Zod schemas in `helgro/src/content/config.ts`. Never hardcode content that belongs in a collection
- **Inline Tailwind styling**: All styling is via Tailwind utility classes in component templates. No per-component CSS files. Theme variables in `helgro/src/styles/global.css` `@theme {}` block
- **Foundation components**: Button, Text, Wrapper, Kicker have rich prop APIs (variants, sizes, slots). Use these instead of raw HTML
- **File-based routing**: `src/pages/` directory structure = URL structure. Dynamic routes via `[...slug].astro`
- **Video backgrounds**: `/hero.mp4` used across Hero, Footer, Studio, Contact, and 404 pages
- **OKLCH color system**: Grayscale palette (`base-50` to `base-950`) defined in OKLCH color space in global.css
- **Tailwind v4 gotcha**: Arbitrary values need data type hints — `text-[length:var(--size)]` not `text-[var(--size)]` (see `docs/lexington-themes-guide.md`)

## Commands

```bash
# Development
cd helgro
npm run dev          # Dev server at localhost:4321
npm run build        # Production build → dist/
npm run preview      # Preview production build locally

# Deployment
# Cloudflare Pages auto-deploys from git push to main
# Current site URL: https://sandsonte-astro.pages.dev (typo in config — see Known debt)
```

## Known technical debt

- **Site URL typo**: `astro.config.mjs` has `sandsonte-astro` instead of `sandstone-astro` in the site URL
- **All content is placeholder**: Sandstone template default text, images, and team members — needs full replacement with Helgro content
- **Hardcoded contact data**: `helgro/src/pages/contact.astro` has placeholder email (sandstone@example.com) and phone (+1 555-123-4567)
- **No test suite**: No tests exist (typical for SSG — rely on Lighthouse and `npm run build` for validation)
- **Empty README**: `helgro/README.md` inside the Astro project is empty
- **CMS not integrated**: Sanity CMS planned but not yet set up. PagesCMS integration available from template (`.pages.yaml`)
- **Cal.com/Stripe not embedded**: Booking and payment integrations not yet implemented
- **Navigation links**: Some nav links point to template defaults (e.g., "Buy Sandstone" link in mobile menu)

## Constraints and gotchas

- Cloudflare Pages free tier: 500 builds/month, 1 build at a time
- Cal.com free tier: check current plan limitations
- Stripe requires business verification for live payments
- Target audience is Nordic: content in English, SEO for Nordic search terms
- iCloud sync: workspace is iCloud-synced — large burst writes may cause sync delays
- Sandstone template is Lexington Themes licensed — see `docs/lexington-themes-guide.md` for component docs and customization patterns

## Quality coverage matrix

| Domain | What matters here |
|---|---|
| Functional correctness | Booking flow works end-to-end; all pages render correctly; Stripe checkout completes |
| Performance | Lighthouse Performance ≥95; TTFB <150ms from Nordic capitals via Cloudflare edge; images optimized |
| SEO | Meta tags, Open Graph, structured data (LocalBusiness); Nordic travel keywords |
| Accessibility | WCAG 2.2 AA compliance; keyboard navigation; screen reader support |
| Security | No API keys in client bundle; Stripe keys server-side only; CSP headers configured |
| Reliability | Site available 99.9% via Cloudflare; graceful fallback if Cal.com/Stripe embed fails |
| Maintainability | Content editable without developer; clear component boundaries; no code duplication |

## File reference when stuck

- **Theme config (colors, fonts, animations)**: `helgro/src/styles/global.css`
- **Content collection schemas**: `helgro/src/content/config.ts`
- **Navigation**: `helgro/src/components/global/Navigation.astro`
- **Footer**: `helgro/src/components/global/Footer.astro`
- **Landing page composition**: `helgro/src/pages/index.astro` (imports 9 section components)
- **Layouts** (6 total): `helgro/src/layouts/` — BaseLayout, BlogLayout, ProjectsLayout, ServicesLayout, TeamLayout, LegalLayout
- **Foundation components**: `helgro/src/components/fundations/elements/` — Button, Text, Kicker, RollingLink
- **Wrapper container**: `helgro/src/components/fundations/containers/Wrapper.astro`
- **Astro config**: `helgro/astro.config.mjs`
- **Lexington Themes reference**: `docs/lexington-themes-guide.md`
- **WBS decomposition**: `ARCHITECTURE.md`
- **Decisions**: `docs/adr/`

## Active Technologies

- Astro 5.15.6 (SSG framework)
- Tailwind CSS v4.1.17 with @tailwindcss/forms, /typography, scrollbar-hide plugins
- MDX via @astrojs/mdx (content rendering)
- @astrolib/seo (SEO meta components)
- @astrojs/sitemap (auto sitemap generation)
- @astrojs/rss (RSS feed)
- Keen Slider (carousels — testimonials, project cards)
- Fuse.js (client-side search)
- Inter variable font (weight 100-900, extensive OpenType features)

## Recent Changes

- 2026-02-28: Navigation links and mobile menu styles updated
- 2026-02-28: Videos compressed for performance
- 2026-02-28: Baseline documentation created (ARCHITECTURE.md, README.md, ADRs)
