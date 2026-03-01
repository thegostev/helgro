# Helgro — Development Guide

Step-by-step guide to turn the Sandstone template into a live booking site. Each step is a separate PR with a clear scope and verification checklist.

---

## Development Workflow

Every change follows this cycle:

```
1. Create branch    → git checkout -b pr/short-description
2. Make changes     → edit files
3. Preview locally  → npm run dev (localhost:4321, instant hot reload)
4. Verify           → check the pages listed in the PR's verification checklist
5. Commit & push    → git add . && git commit -m "description" && git push -u origin pr/short-description
6. Open PR          → gh pr create (or GitHub web UI)
7. Merge to main    → Cloudflare Pages auto-deploys to production
```

### Local Preview Commands

```bash
cd helgro
npm run dev          # Dev server with hot reload → http://localhost:4321
npm run build        # Test production build (catches errors dev mode misses)
npm run preview      # Serve the production build locally
```

**Tip**: Keep `npm run dev` running in a terminal while editing. Changes appear in the browser within 1 second. Run `npm run build` before each PR to catch build errors.

---

## How to Check Changes

After every edit, verify locally:

1. **Visual check** — Open `http://localhost:4321` and navigate to the pages you changed
2. **Build check** — Run `npm run build` to confirm no errors
3. **Mobile check** — Use browser DevTools responsive mode (toggle device toolbar) to verify mobile layout
4. **Link check** — Click through navigation links to verify nothing is broken

---

## PR Sequence

Work through these PRs in order. Each builds on the previous.

---

### PR 1: Config Fixes & Cleanup

**Why**: Fix known template debt before adding real content.

**Files to change**:
| File | Change |
|------|--------|
| `astro.config.mjs` | Fix site URL: `sandsonte-astro` → your actual domain (e.g., `helgro.com` or `helgro.pages.dev`) |
| `src/components/global/Navigation.astro` | Remove "Buy Sandstone" link. Remove "Overview" link (design system page). Update social links (LinkedIn, Instagram) to your actual URLs or remove Behance |
| `src/components/global/Footer.astro` | Update mission statement text. Update any hardcoded company references |
| `src/pages/contact.astro` | Replace `sandstone@exmaple.com` with your email. Replace phone number. Update social handles |
| `src/pages/studio.astro` | Replace "We are a collaborative team of interior designers..." intro text with Helgro description |
| `src/pages/404.astro` | Update error page text if needed |
| `src/components/fundations/head/BaseHead.astro` | Update default SEO title/description if hardcoded |

**Verify locally**:
- [ ] `npm run dev` → navigate to every page: `/`, `/projects`, `/services`, `/studio`, `/contact`, `/blog`, `/team`
- [ ] No broken links in navigation (desktop and mobile menu)
- [ ] Contact page shows your real email and social links
- [ ] `npm run build` succeeds with no errors

---

### PR 2: Branding & Visual Identity

**Why**: Replace template visual identity with Helgro brand.

**Files to change**:
| File | Change |
|------|--------|
| `src/styles/global.css` | Add brand accent color to `@theme {}` block (e.g., `--color-accent-500: oklch(...)`) if needed. Adjust base palette if grayscale doesn't fit brand |
| `src/components/assets/Logo.astro` | Replace SVG/content with Helgro logo |
| `src/components/assets/BigLogo.astro` | Replace large logo variant used in Hero section |
| `public/hero.mp4` | Replace with Helgro video (Gdańsk/Tricity footage) or remove video backgrounds if not needed |
| `src/components/fundations/head/Favicons.astro` | Replace favicon with Helgro icon |
| `src/components/assets/Ticker.astro` | Update ticker text from architecture references to travel/experience keywords |

**Verify locally**:
- [ ] Logo appears correctly on all pages (navigation, footer, hero)
- [ ] Favicon shows in browser tab
- [ ] Video plays on hero/footer (if kept) or sections look clean without video
- [ ] Ticker text is relevant to Helgro
- [ ] Colors feel consistent across all pages
- [ ] `npm run build` succeeds

---

### PR 3: Team Content

**Why**: Replace placeholder team with real people. Small, focused content PR.

**Files to change**:
| File | Change |
|------|--------|
| `src/content/team/*.md` | Delete `sofia-ramirez.md` and `jordan-smith.md`. Create new files for your actual team members |
| `src/images/team/` | Replace `1.png`, `2.png` with real team photos |

**Content template** for each team member (`src/content/team/firstname-lastname.md`):
```yaml
---
name: "Your Name"
role: "Your Role"
bio: |
  Bio paragraph 1.

  Bio paragraph 2.
image:
  url: "/src/images/team/yourname.jpg"
  alt: "Your Name headshot"
socials:
  linkedin: "https://linkedin.com/in/yourprofile"
  email: "you@helgro.com"
---

Optional longer bio content in Markdown below the frontmatter.
```

**Verify locally**:
- [ ] `/team` page shows real team members with photos
- [ ] Clicking a team card opens the detail page with bio and social links
- [ ] Footer dynamically shows updated team member names
- [ ] `npm run build` succeeds (Zod schema validates all fields)

---

### PR 4: Services Content

**Why**: Define what Helgro actually offers.

**Files to change**:
| File | Change |
|------|--------|
| `src/content/services/*.md` | Replace all 6 placeholder services with real Helgro experiences/services |
| `src/images/services/` | Replace placeholder images with real photos |
| `src/components/landing/ServicesPreview.astro` | Update any hardcoded section heading/intro text |

**Content template** (`src/content/services/N.md`):
```yaml
---
title: "Weekend Kayaking Tour"
description: "Explore Gdańsk's waterways on a guided kayak tour through the historic Motława River."
image:
  url: "/src/images/services/kayaking.jpg"
  alt: "Group kayaking on the Motława River in Gdańsk"
---

Detailed service description in Markdown. Include what's included,
duration, meeting point, what to bring, etc.
```

**Verify locally**:
- [ ] `/services` page lists all real services with correct images
- [ ] Each service card links to a detail page with full description
- [ ] Landing page ServicesPreview section shows correct services
- [ ] `npm run build` succeeds

---

### PR 5: Experiences/Projects Content

**Why**: Showcase actual experiences (the "projects" collection = Helgro experiences).

**Files to change**:
| File | Change |
|------|--------|
| `src/content/projects/*.md` | Replace all 6 placeholder projects with real Helgro experiences |
| `src/images/projects/` | Replace cover images and gallery images with real photos |
| `src/components/landing/ProjectPreview.astro` | Update any hardcoded heading text |

**Content template** (`src/content/projects/N.md`):
```yaml
---
title: "Old Town Gdańsk Walking Tour"
pubDate: 2026-03-01
client: "Weekend Explorers"
location: "Gdańsk Old Town"
year: "2026"
status: "built"
area: "3 hours"
cover:
  url: "/src/images/projects/oldtown/cover.jpg"
  alt: "Neptune Fountain in Gdańsk Old Town"
gallery:
  - url: "/src/images/projects/oldtown/1.jpg"
    alt: "St. Mary's Church interior"
  - url: "/src/images/projects/oldtown/2.jpg"
    alt: "Mariacka Street amber shops"
---

Detailed experience description. What guests will see, itinerary highlights,
what makes this experience special.
```

**Note**: The `client`, `location`, `year`, `status`, `area` fields were designed for architecture projects. You can repurpose them (e.g., `area` → duration, `client` → audience type) or update the schema in `src/content/config.ts` to rename fields.

**Verify locally**:
- [ ] `/projects` page shows all experiences with real covers
- [ ] Clicking an experience opens detail page with gallery images
- [ ] Gallery images load and display correctly
- [ ] Landing page ProjectPreview carousel shows real experiences
- [ ] Left sidebar index on `/projects` lists all experience titles
- [ ] `npm run build` succeeds

---

### PR 6: Landing Page Sections

**Why**: Update all hardcoded text on the landing page.

**Files to change**:
| File | Change |
|------|--------|
| `src/components/landing/Hero.astro` | Update headline and any hardcoded text |
| `src/components/landing/Intro.astro` | Replace "Multidisciplinary interior design studio" text |
| `src/components/landing/Stats.astro` | Update statistics (e.g., "50 completed projects" → your real numbers) |
| `src/components/landing/Philosophy.astro` | Replace studio philosophy with Helgro's mission/values |
| `src/components/landing/Process.astro` | Update "how it works" steps to match Helgro's booking flow |
| `src/components/landing/Testimonials.astro` | Replace placeholder testimonials with real ones (or remove if none yet) |
| `src/images/testimonials/` | Replace avatar images if using real testimonials |

**Verify locally**:
- [ ] `/` landing page reads as a coherent Helgro story top to bottom
- [ ] All 9 sections have real content (no architecture/interior design references remain)
- [ ] Stats are accurate
- [ ] Testimonials are real or section is cleanly removed
- [ ] Mobile layout looks good (Hero, Stats, Process sections are responsive)
- [ ] `npm run build` succeeds

---

### PR 7: Blog Content (optional — can defer)

**Why**: SEO value + content marketing for Nordic audience.

**Files to change**:
| File | Change |
|------|--------|
| `src/content/posts/*.md` | Replace placeholder blog posts with real articles |
| `src/images/blog/` | Replace cover images |

If deferring blog: you can keep the placeholder posts or delete them and hide the blog link from navigation.

**Verify locally**:
- [ ] `/blog` page lists posts with real titles and cover images
- [ ] Individual post pages render correctly with author link
- [ ] Tags page works (`/blog/tags`)
- [ ] RSS feed generates (`/rss.xml`)

---

### PR 8: Cal.com Booking Integration

**Why**: Enable actual booking — the core business function.

**Prerequisites** (do these before coding):
1. Create a Cal.com account at https://cal.com
2. Create an Event Type (e.g., "Weekend Experience Consultation" or specific experience types)
3. Set up availability, duration, and any required fields
4. Copy your booking URL (e.g., `cal.com/yourusername/weekend-tour`)
5. (Optional) Connect Stripe in Cal.com settings for paid bookings

**Approach — Cal.com Inline Embed**:

Cal.com provides auto-generated embed snippets. The simplest approach for Astro:

**Step 1**: Create a booking component `src/components/BookingEmbed.astro`:
```astro
---
interface Props {
  calLink: string;  // e.g., "yourusername/weekend-tour"
}
const { calLink } = Astro.props;
---

<div id="cal-embed" class="w-full min-h-[600px]"></div>

<script define:vars={{ calLink }}>
  // Cal.com embed loader
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-embed",
    calLink: calLink,
    layout: "month_view",
  });
  Cal("ui", {
    styles: { branding: { brandColor: "#000000" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
</script>
```

**Step 2**: Use the component in a page. Either:

**Option A** — Add to contact page (`src/pages/contact.astro`):
```astro
import BookingEmbed from "@/components/BookingEmbed.astro";
<!-- In the template: -->
<BookingEmbed calLink="yourusername/weekend-tour" />
```

**Option B** — Create a dedicated booking page (`src/pages/book.astro`):
```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import Wrapper from "@/components/fundations/containers/Wrapper.astro";
import Text from "@/components/fundations/elements/Text.astro";
import BookingEmbed from "@/components/BookingEmbed.astro";
---
<BaseLayout>
  <Wrapper variant="standard">
    <Text tag="h1" variant="display2XL">Book an Experience</Text>
    <BookingEmbed calLink="yourusername/weekend-tour" />
  </Wrapper>
</BaseLayout>
```

**Step 3**: Add booking CTA buttons across the site:
- Navigation: Add "Book Now" link to nav items in `Navigation.astro`
- Landing page: Add CTA button in Hero or Process section
- Service detail pages: Add booking link per service

**Files to change**:
| File | Change |
|------|--------|
| New: `src/components/BookingEmbed.astro` | Cal.com embed component |
| `src/pages/contact.astro` or new `src/pages/book.astro` | Add booking embed |
| `src/components/global/Navigation.astro` | Add "Book Now" link |
| `src/components/landing/Hero.astro` | Add CTA button linking to `/book` or `/contact` |
| `src/components/landing/Process.astro` | Add booking CTA at the end of process steps |

**Verify locally**:
- [ ] Booking page/section loads and shows Cal.com calendar
- [ ] Can select a date and see available time slots
- [ ] Booking form submits (test with your own email)
- [ ] "Book Now" links in navigation and hero work
- [ ] Mobile: Cal.com embed is responsive and usable
- [ ] `npm run build` succeeds (the embed script loads client-side, no build impact)

---

### PR 9: SEO & Meta Tags

**Why**: Ensure every page has unique, keyword-targeted meta tags for Nordic search.

**Files to change**:
| File | Change |
|------|--------|
| `src/components/fundations/head/Seo.astro` or `BaseHead.astro` | Update default site title, description |
| `src/pages/index.astro` | Add page-specific `<AstroSeo>` with Open Graph image, Nordic travel keywords |
| `src/pages/contact.astro` | Add page-specific SEO |
| `src/pages/studio.astro` | Add page-specific SEO |
| Content files frontmatter | Ensure `title` and `description` are keyword-rich for each post/project/service |

**Verify locally**:
- [ ] View page source on each page → confirm unique `<title>` and `<meta name="description">`
- [ ] Open Graph tags present (check with browser DevTools → Elements → `<head>`)
- [ ] `npm run build` succeeds
- [ ] Sitemap generates at `/sitemap-index.xml`

---

### PR 10: Legal Pages & Final Polish

**Why**: Required legal compliance and final cleanup.

**Files to change**:
| File | Change |
|------|--------|
| `src/content/legal/*.md` | Update privacy policy, terms, cookies policy with real business details |
| Any remaining placeholder text across components | Final sweep for "Sandstone", "interior design", "architecture" references |

**Verify locally**:
- [ ] `/legal/privacy`, `/legal/terms`, `/legal/cookies` show correct business info
- [ ] Search the codebase for "sandstone" (case-insensitive) — no template references remain
- [ ] Full navigation test: click every link on every page
- [ ] `npm run build` succeeds
- [ ] Run Lighthouse on `npm run preview` output — Performance ≥95, SEO 100, Accessibility ≥98

---

## Adding Photos

Images are stored in the repo and optimized by Astro at build time.

### Step-by-step

1. **Prepare image**: Resize to reasonable dimensions (max 2000px wide). JPG for photos, PNG for graphics with transparency. WebP also supported
2. **Add to repo**: Place in the appropriate subdirectory:
   ```
   src/images/
   ├── blog/           ← blog post cover images
   ├── projects/       ← experience covers and gallery photos
   │   └── oldtown/    ← subdirectory per experience for gallery
   ├── services/       ← service card images
   ├── team/           ← headshots
   └── testimonials/   ← testimonial avatars
   ```
3. **Reference in content**: Use the path in Markdown frontmatter:
   ```yaml
   image:
     url: "/src/images/team/yourname.jpg"
     alt: "Descriptive alt text for accessibility"
   ```
4. **Astro handles the rest**: At build time, Astro automatically:
   - Converts to optimal format (WebP/AVIF)
   - Generates responsive `srcset` for different screen sizes
   - Optimizes file size
   - Adds `width`/`height` attributes to prevent layout shift

### Image Guidelines

- **Alt text is required** — write descriptive text, not `#_` or empty strings
- **File naming**: lowercase, hyphens, no spaces (e.g., `old-town-walk.jpg`)
- **Size budget**: Keep source images under 1MB each. Astro compresses at build time, but smaller sources = faster builds
- **Gallery images**: Create a subdirectory per project (e.g., `src/images/projects/kayaking/`)

---

## Content Writing Guide

When replacing placeholder content, write for the Nordic traveler audience:

### Tone
- Professional but warm
- Concise — Nordic readers appreciate directness
- Practical — include what's included, duration, meeting point

### Per Collection

| Collection | What to Write | Key SEO Terms |
|-----------|---------------|---------------|
| **projects** (experiences) | What the experience is, what guests see/do, what makes it unique, gallery of real photos | "Gdańsk weekend", "Tricity experience", specific attraction names |
| **services** | What you offer, who it's for, what's included, pricing hint | "weekend trip Gdańsk", "guided tour Tricity" |
| **team** | Brief bio, role, why you're passionate about Gdańsk/Tricity | Personal connection to the city |
| **posts** (blog) | Travel tips, hidden gems, seasonal guides, culture insights | "things to do in Gdańsk", "Sopot weekend" |
| **legal** | Standard privacy/terms with your real business name and contact info | N/A |

### Frontmatter Checklist

Every content file must have:
- [ ] `title` — unique, descriptive, under 60 characters (for SEO)
- [ ] `description` — 1-2 sentences, under 160 characters (for SEO meta description)
- [ ] `image.alt` — descriptive alt text (for accessibility, not `#_`)
- [ ] All required schema fields (see `src/content/config.ts` for each collection)

---

## Quick Reference

| What | Where |
|------|-------|
| Start dev server | `cd helgro && npm run dev` |
| Test build | `npm run build` |
| Content files | `src/content/{posts,projects,team,services,legal}/` |
| Images | `src/images/` |
| Page templates | `src/pages/` |
| Layouts | `src/layouts/` |
| Navigation links | `src/components/global/Navigation.astro` |
| Global styles/colors | `src/styles/global.css` |
| SEO defaults | `src/components/fundations/head/Seo.astro` |
| Content schemas | `src/content/config.ts` |
| Full component reference | `docs/lexington-themes-guide.md` |
| Architecture | `ARCHITECTURE.md` |
| Project conventions | `CLAUDE.md` |
