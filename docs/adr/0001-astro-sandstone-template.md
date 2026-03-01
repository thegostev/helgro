# 0001 Astro SSG with Lexington Themes Sandstone Template

**Status:** Accepted
**Date:** 2026-02-28
**Project:** Helgro

## Context

Helgro needs a marketing and booking website for Nordic travelers visiting Gdańsk/Tricity. Requirements: fast page loads (Nordic audience expects sub-second), strong SEO (competing for Nordic travel search terms), accessibility compliance (WCAG 2.2 AA), and a polished editorial design that conveys quality weekend experiences. The site is content-heavy (blog, projects/experiences, team, services) with booking flow via Cal.com embed.

The developer is a solo TPM — development speed and maintainability matter more than customization ceiling.

## Considered Options

### Option 1: Next.js (React SSR/SSG)
Full-stack React framework. Supports SSG, SSR, and API routes.
- Pros: Large ecosystem, API routes for server-side integrations, familiar React patterns
- Cons: Heavier client-side JS bundle (hydration overhead), overkill for a content site, more complex deployment, slower Lighthouse scores without optimization effort

### Option 2: Astro from scratch
Build an Astro site from blank starter, designing all components manually.
- Pros: Full control over design, no template lock-in, minimal dependencies
- Cons: Significant upfront design/build time, need to design responsive layouts, component library, and content patterns from zero. Solo developer time is the bottleneck

### Option 3: Astro with Lexington Themes Sandstone template
Pre-built Astro template with 66 components, 5 content collections, 6 layouts, Tailwind v4 theming, and editorial design focused on projects/process.
- Pros: Immediate Lighthouse 100 baseline, professional editorial aesthetic fits travel brand, full source code ownership, rich component library (Button, Text, Wrapper with prop APIs), content collections pre-configured, responsive and accessible out of the box
- Cons: $79 license cost, locked into Sandstone's component patterns and naming conventions ("fundations" spelling), need to customize away from architecture/interior design theme toward travel

## Decision Outcome

Chosen option: **Astro with Lexington Themes Sandstone template**, because the pre-built component library and content collection setup eliminate weeks of development work. The Lighthouse 100 baseline ensures performance targets are met from day one. Astro's zero-JS-by-default architecture means the site ships minimal client-side JavaScript, which is ideal for a content/booking site. Full source code ownership means no vendor lock-in — components can be freely modified.

The template's interior design aesthetic needs customization toward travel/experiences, but the structural patterns (project showcases, team profiles, blog, services) map directly to Helgro's content model.

## Consequences

### Positive
- Development starts from a working, production-quality baseline rather than zero
- Lighthouse Performance 100, Accessibility 98, SEO 100 out of the box
- 66 pre-built components with consistent prop APIs reduce ad-hoc styling
- Content collections with Zod schemas provide type-safe content management
- Astro SSG means near-zero client-side JS — fast loads on any device

### Negative
- Component naming follows Sandstone conventions (e.g., "fundations" directory), which may confuse future contributors
- Template's editorial design is architecture-focused — needs visual customization (colors, copy, imagery) for travel brand
- Keen Slider and Fuse.js are template dependencies that may not be needed long-term
- Template updates from Lexington Themes require manual merge (no automated update mechanism)

### Neutral
- Inter font is a good default for multilingual content (Nordic + English)
- OKLCH color system is forward-looking but requires understanding of perceptual color space for customization
