# 0002 Cloudflare Pages for Static Hosting

**Status:** Accepted
**Date:** 2026-02-28
**Project:** Helgro

## Context

Helgro is a static Astro site (SSG) that needs hosting with global CDN distribution. The primary audience is Nordic travelers (Sweden, Norway, Denmark, Finland), so edge server proximity to Scandinavian cities matters for TTFB. The site has no server-side runtime requirements — all pages are pre-rendered HTML.

Budget is minimal (personal project). Build frequency is moderate during development, low in production.

## Considered Options

### Option 1: Vercel
Astro-optimized hosting with automatic framework detection.
- Pros: First-class Astro support, preview deployments, generous free tier, good DX
- Cons: Edge network optimized for US (Nordic PoPs exist but fewer), free tier has 100GB bandwidth limit, vendor lock-in to Vercel-specific features if using Edge/Serverless later

### Option 2: Netlify
Static hosting with CI/CD and serverless functions.
- Pros: Mature platform, good free tier, build plugins ecosystem, branch deploys
- Cons: Fewer Nordic edge locations than Cloudflare, 300 build minutes/month on free tier, bandwidth limits (100GB)

### Option 3: Cloudflare Pages
Static site hosting on Cloudflare's global edge network.
- Pros: 300+ global PoPs including multiple Nordic locations (Stockholm, Helsinki, Copenhagen, Oslo), 500 builds/month free tier, unlimited bandwidth on free tier, integrated with Cloudflare CDN/DNS, fast builds
- Cons: 1 concurrent build on free tier, less mature platform than Vercel/Netlify, fewer framework-specific optimizations

## Decision Outcome

Chosen option: **Cloudflare Pages**, because Cloudflare has the densest Nordic edge network of all three options, delivering the lowest TTFB for the target audience. The unlimited bandwidth on the free tier eliminates cost concerns as traffic grows. 500 builds/month is adequate for development and production deployment cadence.

The 1-concurrent-build limitation is acceptable for a solo developer — builds don't queue frequently.

## Consequences

### Positive
- Sub-150ms TTFB from Nordic capitals via Cloudflare edge (Stockholm, Helsinki, Copenhagen, Oslo PoPs)
- Unlimited bandwidth on free tier — no surprise bills
- 500 builds/month — sufficient headroom for iterative development
- Cloudflare DNS integration simplifies custom domain setup
- Global edge caching means good performance worldwide (not just Nordic)

### Negative
- 1 concurrent build on free tier — parallel branch deploys queue
- Platform is less mature than Vercel for framework-specific features (no ISR, no Edge middleware on free tier)
- Debugging build failures is less ergonomic than Vercel/Netlify dashboards

### Neutral
- Git integration (push to main → auto-deploy) works the same as all three platforms
- Preview deployments available for branches (same as alternatives)
