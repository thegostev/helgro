# Helgro — Architecture & WBS Decomposition

Adapted from NASA/SP-20210023927 Work Breakdown Structure standard.

Three rules at every level:
- **100% Rule**: every piece of work appears somewhere in the decomposition
- **Mutual Exclusion Rule**: no work appears in two places
- **80-Hour Rule**: no atomic task (L4) exceeds ~30 minutes of AI execution time

---

## Level 0 — System

**Helgro**: Static booking website for Nordic travelers visiting Gdańsk and
Tricity. Ingests Markdown content and media assets at build time, generates
optimized static HTML, and serves it via Cloudflare Pages edge network.
Third-party embeds (Cal.com, Stripe) provide booking and payment flows
client-side.

**System boundary**:
- Inside: Astro SSG build pipeline, component library (66 .astro files),
  content collections (5 schemas), Tailwind CSS theming, SEO configuration,
  file-based routing, client-side search
- Outside: Cal.com (booking), Stripe (payments), Cloudflare Pages
  (hosting/CDN/builds), Sanity CMS (future content management), iCloud
  (development file sync), Lexington Themes (upstream template)

**Stakeholders**:
- Owner/operator: single developer (TPM) building and maintaining the site
- End users: Nordic travelers looking for weekend experiences in Gdańsk/Tricity
- Maintainer: owner, assisted by Claude Code

**Quality goals** (from ISO 25010, cascading to all levels):
1. **Performance** — Lighthouse score ≥95; TTFB <150ms from Nordic capitals
2. **SEO** — Meta tags, Open Graph, structured data (LocalBusiness); Nordic
   travel keyword targeting
3. **Accessibility** — WCAG 2.2 AA compliance; keyboard navigation; screen
   reader support
4. **Maintainability** — Content editable via Markdown without developer;
   clear component boundaries; no code duplication
5. **Security** — No API keys in client bundle; CSP headers configured

**Architectural style**: Static Site Generator (SSG) — all pages pre-rendered
at build time. Client-side JavaScript limited to interactive components
(carousels, search, mobile menu) and third-party embeds.

> **Quality coverage checkpoint (L0)**: Measurable targets —
> Performance: Lighthouse ≥95 on all pages.
> SEO: All pages have unique title + description + Open Graph tags.
> Accessibility: Lighthouse Accessibility ≥98.
> Maintainability: Adding a blog post requires only creating one .md file.
> Security: `npm run build` produces no client-side API key exposure.

---

## Level 1 — Subsystems

### S1: Presentation Layer

All visual components, layouts, pages, and styling that produce the site's
HTML output. This is the core of the SSG — everything the user sees.

- **Interface**: Astro build pipeline reads `.astro` components → outputs
  static HTML/CSS/JS to `dist/`
- **Data ownership**: component templates, layout templates, page routes,
  global CSS theme, static assets (images, videos, fonts)

### S2: Content Layer

Astro Content Collections that store all editorial content as Markdown files
with validated frontmatter schemas. Content is decoupled from presentation.

- **Interface**: `getCollection()` / `getEntry()` API at build time;
  `[...slug].astro` dynamic routes auto-generate detail pages
- **Data ownership**: Markdown files in `src/content/`, Zod schemas in
  `src/content/config.ts`, image assets referenced by content

### S3: Integration Layer

Third-party services and build-time integrations that extend the site beyond
static content: booking, payments, SEO, search, feeds.

- **Interface**: client-side embeds (Cal.com, Stripe), Astro integrations
  (sitemap, RSS, MDX), client-side JS (Fuse.js search)
- **Data ownership**: SEO metadata, RSS feed, sitemap.xml, search index
  (built client-side from all collections)

> **Quality coverage checkpoint (L1)**:
> S1: All components use foundation components (no raw `<button>`, `<a>` for
> styled elements). Responsive design tested at mobile/tablet/desktop.
> S2: Every content file validates against Zod schema at build time.
> Build fails on schema violation.
> S3: Cal.com/Stripe embeds must degrade gracefully if service unavailable.
> SEO component present on every page.

---

## Level 2 — Modules

### S1.M1: Foundation Components

Atomic design components that all other components build upon. Provides
consistent styling, sizing, and accessibility.

- **Public interface**: `<Button>`, `<Text>`, `<Wrapper>`, `<Kicker>` Astro
  components with documented prop APIs (variants, sizes, slots)
- **Internal data model**: Tailwind class maps keyed by variant/size props
- **Dependencies**: Tailwind CSS v4 (utility classes)

### S1.M2: Global Components

Components shared across all pages: navigation, footer, search overlay.

- **Public interface**: `<Navigation>`, `<Footer>`, `<Search>` — imported
  by BaseLayout, rendered on every page (unless hidden via props)
- **Internal data model**: Navigation links (hardcoded), team members
  (fetched from content collection in Footer), search index (built from
  all collections in Search)
- **Dependencies**: S1.M1 (foundations), S2.M1 (collection data for Footer/Search)

### S1.M3: Landing Page Sections

Nine section components composed by `index.astro` to form the landing page.

- **Public interface**: `<Hero>`, `<Intro>`, `<ProjectPreview>`, `<Stats>`,
  `<ServicesPreview>`, `<Philosophy>`, `<Process>`, `<Testimonials>`,
  `<BlogPreview>` — each self-contained section
- **Internal data model**: mix of hardcoded content and collection data
- **Dependencies**: S1.M1 (foundations), S1.M4 (collection components for
  previews), S1.M7 (animations/scripts for carousels)

### S1.M4: Collection Display Components

Card and list components for rendering content collection entries.

- **Public interface**: `<BlogCard>`, `<ProjectCard>`, `<ProjectCardBig>`,
  `<ServicesCard>`, `<TeamCard>` — accept `post` prop (collection entry)
- **Internal data model**: content entry data object (`entry.data` fields)
- **Dependencies**: S1.M1 (foundations), Astro `Image` component

### S1.M5: Layouts

Page template wrappers that provide consistent structure for different
content types.

- **Public interface**: `<BaseLayout>` (root — props: `hideNav`, `hideFooter`),
  `<BlogLayout>`, `<ProjectsLayout>`, `<ServicesLayout>`, `<TeamLayout>`,
  `<LegalLayout>` — each accepts `frontmatter` prop
- **Internal data model**: frontmatter metadata from content entries
- **Dependencies**: S1.M1 (foundations), S1.M2 (global components), S1.M6 (head components)

### S1.M6: Head & Meta Components

Components managing the HTML `<head>` section: meta tags, fonts, favicons,
SEO configuration.

- **Public interface**: `<BaseHead>`, `<Seo>`, `<Meta>`, `<Fonts>`,
  `<Favicons>` — composed inside BaseLayout's `<head>`
- **Internal data model**: site metadata, page-specific SEO props
- **Dependencies**: @astrolib/seo package

### S1.M7: Client-Side Scripts

Vanilla JavaScript and library wrappers for interactive features.

- **Public interface**: `<KeenSliderTestimonials>`, `<KeenSliderProjectCardScript>`,
  `<FuseJS>` — Astro script components loaded where needed
- **Internal data model**: DOM element references, slider state, search index
- **Dependencies**: Keen Slider (npm), Fuse.js (npm)

### S1.M8: Asset Components

Brand and decorative components.

- **Public interface**: `<Logo>`, `<BigLogo>`, `<Ticker>` (animated text marquee)
- **Internal data model**: SVG/image assets, animation CSS
- **Dependencies**: S1.M1 (foundations)

### S1.M9: Styling & Theme

Global CSS configuration defining the design system tokens.

- **Public interface**: CSS custom properties consumed via Tailwind classes
  (`bg-base-50`, `text-base-900`, etc.)
- **Internal data model**: OKLCH color palette (base-50 through base-950),
  Inter font configuration, custom keyframe animations (marquee variants)
- **Dependencies**: Tailwind CSS v4, @tailwindcss/forms, @tailwindcss/typography

### S2.M1: Collection Schemas

Zod schema definitions that validate all content at build time.

- **Public interface**: 5 schemas exported from `src/content/config.ts`
  (team, posts, projects, services, legal)
- **Internal data model**: Zod objects with typed fields (see Content
  Collections section below)
- **Dependencies**: Astro content layer, Zod

### S2.M2: Content Files

Markdown files organized by collection type.

- **Public interface**: frontmatter (validated by S2.M1) + Markdown body
  (rendered by Astro MDX)
- **Internal data model**: 4 blog posts, 6 projects, 2 team members,
  6 services, 5 legal pages (all placeholder content)
- **Dependencies**: image assets in `src/images/`

### S3.M1: SEO & Meta Integration

Build-time SEO using @astrolib/seo.

- **Public interface**: `<AstroSeo>` component props (title, description,
  canonical, openGraph, twitter)
- **Internal data model**: per-page SEO configuration
- **Dependencies**: @astrolib/seo package, S1.M6 (head components)

### S3.M2: Client-Side Search

Fuse.js-powered search across all content collections.

- **Public interface**: Search overlay triggered from Navigation; aggregates
  posts, projects, services, team, legal into a single searchable index
- **Internal data model**: flat array of `{title, description, slug, collection}`
  objects passed to Fuse.js
- **Dependencies**: Fuse.js (npm), S2.M1 (collection data)

### S3.M3: Feed & Sitemap

Automated RSS and sitemap generation.

- **Public interface**: `/rss.xml` endpoint (via `src/pages/rss.xml.js`),
  `sitemap.xml` (via @astrojs/sitemap integration)
- **Internal data model**: blog post collection data for RSS; all routes for sitemap
- **Dependencies**: @astrojs/rss, @astrojs/sitemap

### S3.M4: Booking Integration (not yet implemented)

Cal.com embed for scheduling weekend experiences.

- **Public interface**: TBD — likely an iframe or Cal.com web component
  embedded in a booking page or modal
- **Dependencies**: Cal.com account, scheduling API

### S3.M5: Payments Integration (not yet implemented)

Stripe checkout for booking payments (bundled with Cal.com or standalone).

- **Public interface**: TBD — Stripe Checkout redirect or embedded form
- **Dependencies**: Stripe account (requires business verification), Cal.com
  (if integrated via Cal.com payments)

> **Quality coverage checkpoint (L2)**:
> S1.M1: Foundation props documented; all components accept `class` for
> extension. Accessible (ARIA, focus management).
> S1.M2: Navigation mobile menu is keyboard-accessible (Escape to close).
> S1.M5: BaseLayout supports `hideNav`/`hideFooter` for special pages.
> S1.M9: Colors in OKLCH for perceptual uniformity.
> S2.M1: Zod schemas validated at build time — build fails on invalid content.
> S3.M2: Search fallback if Fuse.js fails to load.
> S3.M4/S3.M5: Not yet implemented — tracked as future work.

---

## Level 3 — Components

### S1.M1.C1: Button
- **File(s)**: `helgro/src/components/fundations/elements/Button.astro`
- **Interface contract**: Props `variant` (default/muted/none), `size` (xxs–xl),
  `iconOnly` (bool), `gap` (xs–lg), `isLink` (bool → renders `<a>` vs `<button>`),
  `class`. Slots: `left-icon`, default, `right-icon` (or `icon` for iconOnly)
- **Error taxonomy**: invalid variant/size silently falls back to empty class string

### S1.M1.C2: Text
- **File(s)**: `helgro/src/components/fundations/elements/Text.astro`
- **Interface contract**: Props `tag` (h1–h6, p, span, strong, em, small, a,
  blockquote), `variant` (17 variants: display6XL–displayXS, textXL–textXS),
  `class`, `href`, `ariaLabel`, `id`, `style`. Slots: `left-icon`, default,
  `right-icon`
- **Error taxonomy**: missing `tag` defaults to `<p>`; unknown variant applies
  no additional classes

### S1.M1.C3: Wrapper
- **File(s)**: `helgro/src/components/fundations/containers/Wrapper.astro`
- **Interface contract**: Props `variant` (standard/paddingless/wide/narrow/prose),
  `class`, `id`. Renders `<div>` with variant-specific max-width and padding
- **Error taxonomy**: unknown variant falls back to empty class

### S1.M1.C4: Kicker
- **File(s)**: `helgro/src/components/fundations/elements/Kicker.astro`
- **Interface contract**: Small label/tag above headings. Accepts default slot
  content and `class` prop

### S1.M1.C5: Icons
- **File(s)**: `helgro/src/components/fundations/icons/` — ArrowRight, ArrowLeft,
  DotsThree, DotsNine, Plus, Search
- **Interface contract**: SVG icon components, accept `class` prop for sizing/color

### S1.M2.C1: Navigation
- **File(s)**: `helgro/src/components/global/Navigation.astro`
- **Interface contract**: Self-contained. Fixed header (top-8, z-100). Logo link,
  mobile menu toggle (DotsNine/DotsThree icon), collapsible mobile menu with
  nav links + social links + contact info. Accessible: ARIA, Escape key, click-outside
- **Error taxonomy**: no data dependencies — always renders

### S1.M2.C2: Footer
- **File(s)**: `helgro/src/components/global/Footer.astro`
- **Interface contract**: Self-contained. Full-viewport video background.
  White card with Logo, dynamically fetched team members (role + name),
  mission statement, copyright with current year
- **Error taxonomy**: `getCollection("team")` failure would break build

### S1.M2.C3: Search
- **File(s)**: `helgro/src/components/global/Search.astro`
- **Interface contract**: Search overlay. Aggregates all 5 collections into
  Fuse.js search index at build time. Triggered from Navigation
- **Error taxonomy**: Fuse.js load failure → fallback to basic string filtering

### S1.M5.C1: BaseLayout
- **File(s)**: `helgro/src/layouts/BaseLayout.astro`
- **Interface contract**: Props `hideNav` (bool, default false), `hideFooter`
  (bool, default false). Renders HTML skeleton: `<head>` with BaseHead,
  `<body>` with conditional Navigation + `<main><slot/>` + conditional Footer + Search
- **Error taxonomy**: missing BaseHead or global.css import → broken rendering

### S1.M5.C2: BlogLayout
- **File(s)**: `helgro/src/layouts/BlogLayout.astro`
- **Interface contract**: Props `frontmatter` (post data). Looks up team member
  by `frontmatter.team` string. Renders hero image, title, date, author, description,
  then sticky prose content area
- **Error taxonomy**: team member not found → falls back to editorial team default

### S2.M1.C1: Content Schema Definitions
- **File(s)**: `helgro/src/content/config.ts`
- **Interface contract**: Exports 5 Zod-validated collection schemas:
  - `team`: name (str), role (str?), bio (str?), image {url, alt}, socials? {twitter?, website?, linkedin?, email?}
  - `posts`: title (str), pubDate (date), description (str), team (str), image {url, alt}, tags (str[])
  - `projects`: title (str), pubDate? (date), client? (str), location? (str), year? (str), status? (concept|in-progress|built), area? (str), cover? {url, alt}, gallery? [{url, alt?}]
  - `services`: title (str), description? (str), image? {url, alt}
  - `legal`: page (str), pubDate (date)
- **Error taxonomy**: schema validation failure → Astro build error with field-level message

---

## Dependency Map

```
                ┌─────────────────────────────────────────────────┐
                │           S1: Presentation Layer                 │
                │                                                 │
                │  S1.M6 Pages ──► S1.M5 Layouts                  │
                │                    │                            │
                │                    ├──► S1.M2 Global Components │
                │                    │      (Nav, Footer, Search) │
                │                    │                            │
                │                    └──► S1.M3 Landing Sections  │
                │                         S1.M4 Collection Cards  │
                │                              │                  │
                │                              ▼                  │
                │                    S1.M1 Foundations             │
                │                    (Button, Text, Wrapper)      │
                │                              │                  │
                │                              ▼                  │
                │                    S1.M9 Styling & Theme        │
                │                    (global.css, Tailwind)       │
                └────────────────────┬────────────────────────────┘
                                     │ reads at build time
                                     ▼
                ┌─────────────────────────────────────────────────┐
                │           S2: Content Layer                      │
                │                                                 │
                │  S2.M1 Schemas ──► S2.M2 Content Files          │
                │  (config.ts)       (Markdown + images)          │
                └────────────────────┬────────────────────────────┘
                                     │ consumed by
                                     ▼
                ┌─────────────────────────────────────────────────┐
                │           S3: Integration Layer                  │
                │                                                 │
                │  S3.M1 SEO     S3.M2 Search    S3.M3 Feeds     │
                │  (AstroSeo)    (Fuse.js)       (RSS, Sitemap)  │
                │                                                 │
                │  S3.M4 Booking (TBD)  S3.M5 Payments (TBD)     │
                └─────────────────────────────────────────────────┘
```

---

## Notes

- **Level 4 (Atomic Tasks)** are generated from this decomposition and tracked in `TASKS.md`, not in this file
- Update this document when modules are added, split, or merged
- Cross-reference ADRs in `docs/adr/` for technology decisions underlying this architecture
- **Known debt**: All content (S2.M2) is placeholder from the Sandstone template — needs full replacement
- **Known debt**: S3.M4 (Booking) and S3.M5 (Payments) are not yet implemented
- **Known debt**: Navigation links include template defaults ("Buy Sandstone") that need replacement
- **Known debt**: Site URL in astro.config.mjs has typo ("sandsonte")
