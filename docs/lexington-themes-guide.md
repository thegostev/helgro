# Lexington Themes / Sandstone — Working Guide

Quick reference for customizing the Sandstone template with Claude Code.

**Docs**: https://lexingtonthemes.com/documentation/
- [Getting Started](https://lexingtonthemes.com/documentation/getting-started)
- [Architecture](https://lexingtonthemes.com/documentation/architecture)
- [Components](https://lexingtonthemes.com/documentation/components#link)
- [Content Collections](https://lexingtonthemes.com/documentation/content)
- [SEO](https://lexingtonthemes.com/documentation/seo)
- [CMS (PagesCMS)](https://lexingtonthemes.com/documentation/cms)

**Demo**: https://lexingtonthemes.com/viewports/sandstone

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Astro (SSG) | 5.15.6 |
| Styling | Tailwind CSS | v4.1.17 |
| Plugins | @tailwindcss/forms, /typography, scrollbar-hide | — |
| Content | Astro Content Collections (Markdown) | — |
| SEO | @astrolib/seo | 1.0.0-beta.8 |
| Extras | Keen Slider (carousels), Fuse.js (search) | — |
| Fonts | Inter (variable, 100-900) | — |
| Colors | OKLCH color space (grayscale base palette) | — |

---

## File Structure

```
helgro/src/
├── components/
│   ├── fundations/           # Atomic/foundation components
│   │   ├── containers/       #   Wrapper.astro (layout container)
│   │   ├── elements/         #   Button, Text, Kicker, RollingLink
│   │   ├── icons/            #   ArrowRight, Search, DotsThree, etc.
│   │   └── scripts/          #   KeenSlider, FuseJS, client-side JS
│   ├── global/               # Navigation, Footer, Search
│   ├── landing/              # Hero, Intro, ProjectPreview, Stats, Services,
│   │                         #   Philosophy, Process, Testimonials, BlogPreview
│   ├── projects/             # Project card components
│   ├── blog/                 # Blog-specific components
│   ├── team/                 # Team member components
│   ├── services/             # Service display components
│   └── assets/               # Logo, BigLogo, Ticker
├── content/                  # Markdown content collections
│   ├── posts/                #   Blog articles (4 posts)
│   ├── projects/             #   Portfolio projects (6 projects)
│   ├── team/                 #   Team members with profiles
│   ├── services/             #   Service offerings
│   ├── legal/                #   Privacy, cookies, terms, copyright
│   └── config.ts             #   Collection schemas & validation
├── layouts/                  # Page templates
│   ├── BaseLayout.astro      #   Root layout (nav + footer)
│   ├── BlogLayout.astro      #   Blog post detail
│   ├── ProjectsLayout.astro  #   Projects gallery
│   ├── ServicesLayout.astro
│   ├── TeamLayout.astro
│   └── LegalLayout.astro
├── pages/                    # File-based routing
│   ├── index.astro           #   Landing page (composes landing/* components)
│   ├── projects/             #   index + [...slug].astro
│   ├── blog/                 #   index + posts/[...slug] + tags/*
│   ├── services/
│   ├── team/                 #   index + [...slug].astro
│   ├── legal/                #   [...slug].astro
│   ├── studio.astro
│   ├── contact.astro
│   ├── 404.astro
│   ├── rss.xml.js
│   └── system/               #   Design system reference pages
├── styles/
│   └── global.css            #   Tailwind theme, colors, fonts, animations
└── images/
```

---

## Component Architecture

### Hierarchy

```
Pages (src/pages/)
  └── Layouts (src/layouts/)
        └── Global components (Navigation, Footer, Search)
        └── Page-specific components (landing/*, blog/*, projects/*)
              └── Foundation components (Button, Text, Wrapper, Icons)
```

### Foundation Components (src/components/fundations/)

**Wrapper** (`containers/Wrapper.astro`) — Responsive layout container
- Props: `variant` (`standard` | `prose` | `wide` | `narrow` | `paddingless`), `class`, `id`
- Standardizes max-width, padding, and content centering

**Button** (`elements/Button.astro`) — Interactive button element
- Variants: `default` (dark), `muted` (light), `none` (unstyled)
- Sizes: `xs`, `sm`, `base`, `md`, `lg`, `xl` (32px–56px height)
- Slots: `left-icon`, `right-icon` for icon placement
- Props: `variant`, `size`, `gap`, `onlyIconSize`, `class`, plus all HTML button attrs

**Text** (`elements/Text.astro`) — Typography utility
- Display variants (responsive): `display6XL` through `displayXS`
- Body variants: `textXL`, `textLG`, `textBase`, `textSM`, `textXS`
- Tag options: `h1`–`h6`, `p`, `span`, `strong`, `em`, `small`, `a`, `blockquote`
- Props: `tag`, `variant`, `class`, `id`, `href`, `ariaLabel`, `style`

**Kicker** (`elements/Kicker.astro`) — Small label/tag above headings

**Icons** (`icons/`) — SVG icon components (ArrowRight, Search, DotsThree, DotsNine, etc.)

### Global Components (src/components/global/)

- **Navigation** — Fixed header, collapsible mobile menu (animated height transition)
- **Footer** — Video background with team list and company bio
- **Search** — Fuse.js-powered client-side search overlay

### Landing Page Composition (src/components/landing/)

The index page composes these sections in order:
1. Hero — Full-screen video background + animated ticker
2. Intro — Introduction text
3. ProjectPreview — Featured projects carousel (Keen Slider)
4. Stats — Statistics display
5. ServicesPreview — Service highlights
6. Philosophy — Company values/mission
7. Process — How-it-works steps
8. Testimonials — Client testimonials (Keen Slider carousel)
9. BlogPreview — Recent blog posts

---

## Content Collections

Defined in `src/content/config.ts`. Each collection maps to a `src/content/<name>/` directory with Markdown files.

| Collection | Key Fields | Notes |
|-----------|------------|-------|
| **posts** | title, pubDate, description, team (author), image {url, alt}, tags[] | Blog articles |
| **projects** | title, client, location, year, status (concept\|in-progress\|built), area, cover, gallery[] | Portfolio items |
| **team** | name, role, bio, image, socials {twitter, website, linkedin, email} | Team profiles |
| **services** | title, description, image | Service offerings |
| **legal** | page, pubDate | Legal pages |

**Querying content** in page files:
```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('posts');
const sorted = posts.sort((a, b) => b.data.pubDate - a.data.pubDate);
---
```

**Adding content**: Create a new `.md` file in the collection directory with matching frontmatter schema. The dynamic `[...slug].astro` routes auto-generate detail pages.

---

## Tailwind v4 Theming

Theme config lives in `src/styles/global.css` inside a `@theme {}` block.

### Color System (OKLCH grayscale)
```css
@theme {
  --color-base-50:  oklch(0.985 0 0);  /* near-white */
  --color-base-100: oklch(0.97 0 0);
  --color-base-200: oklch(0.922 0 0);
  --color-base-300: oklch(0.87 0 0);
  --color-base-400: oklch(0.708 0 0);
  --color-base-500: oklch(0.556 0 0);
  --color-base-600: oklch(0.439 0 0);
  --color-base-700: oklch(0.371 0 0);
  --color-base-800: oklch(0.269 0 0);
  --color-base-900: oklch(0.205 0 0);
  --color-base-950: oklch(0.145 0 0);  /* near-black */
}
```

Usage in components: `bg-base-50`, `text-base-900`, etc.

To add brand colors, add new `--color-<name>-<shade>` variables inside `@theme {}`.

### Font Setup
- Inter variable font with extensive OpenType features (ligatures, slashed zero, tabular numbers, alternate glyphs)
- Configured in both `@theme { --font-sans }` and `:root { font-feature-settings }`

### Animations
Custom keyframes for marquee/ticker effects: `marquee`, `rightMarquee`, `slowMarquee`, `bouncingMarquee`.

### Tailwind v4 Gotcha
Arbitrary values with ambiguous types need explicit data type hints:
- `text-[var(--size)]` → compiles to `color:` (wrong)
- `text-[length:var(--size)]` → compiles to `font-size:` (correct)

---

## SEO

Uses `@astrolib/seo` via `<AstroSeo />` component in `<BaseHead>`.

Key props: `title`, `description`, `canonical`, `openGraph` (url, title, description, images), `twitter` (handle, site, cardType).

By default only configured on index — copy to individual pages for per-page meta.

---

## Customization Workflow for Claude Code

### Common Tasks

| Task | What to Edit |
|------|-------------|
| Change colors | `src/styles/global.css` → `@theme {}` block |
| Change fonts | `src/styles/global.css` → `--font-sans` + `:root` font-feature-settings |
| Edit page content | `src/content/<collection>/*.md` frontmatter + body |
| Add a blog post | New `.md` in `src/content/posts/` with schema fields |
| Add a project | New `.md` in `src/content/projects/` with schema fields |
| Modify navigation | `src/components/global/Navigation.astro` |
| Modify footer | `src/components/global/Footer.astro` |
| Edit landing sections | `src/components/landing/<Section>.astro` |
| Change page layout | `src/layouts/<Layout>.astro` |
| Add a new page | New `.astro` in `src/pages/` (file-based routing) |
| Adjust component styling | Edit the component's Tailwind classes directly |
| Add a new collection | Add schema to `src/content/config.ts`, create directory |
| Modify SEO | Edit `<AstroSeo>` props in BaseHead or individual pages |

### Approach

1. **Read before editing** — Always read the target component/file first to understand existing patterns
2. **Follow the hierarchy** — Pages compose layouts, layouts compose components, components use foundations
3. **Use existing foundations** — Button, Text, Wrapper, Link have rich prop APIs; use them instead of raw HTML
4. **Tailwind classes inline** — All styling is via Tailwind utility classes in component templates, no separate CSS files per component
5. **Content via collections** — Never hardcode content that belongs in a collection; add/edit Markdown files instead
6. **Test with `npm run dev`** — Dev server at localhost:4321; check changes before building
7. **Build with `npm run build`** — Output to `dist/`, preview with `npm run preview`

### Dev Commands
```bash
cd "1 - Code/Helgro/helgro"
npm run dev        # Start dev server (localhost:4321)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```
