# IncanTour Next.js Full Migration Audit & Completion Report

**Date:** October 18, 2026  
**Auditor:** Antigravity Engineering Pair  
**Application:** `web/` (Next.js 16 with Turbopack, React 19, TypeScript)  
**Baseline Source:** `legacy/` static site & WordPress staging environment  
**Build Status:** Production Build & Lint: **PASSED (0 Errors, 0 Warnings)**

---

## 1. Executive Summary

This comprehensive audit verifies that the legacy IncanTour website (`legacy/`) has been completely and accurately migrated to a modern, secure, and accessible Next.js 16 application under `web/`.

Every legacy page has been either:
1. **Fully Migrated** with rich typography, curated brand palettes, responsive design, and Italian copy preserved.
2. **Redirected** to preserve SEO rankings, prevent 404s, and map old `.html` bookmarks to canonical URLs.
3. **Explicitly Documented** where upstream backend scripts, WooCommerce parameters, or source PDFs were absent in the provided codebase.

All WordPress interactions are encapsulated server-side, with full input sanitization, honeypot spam protection, accessible client/server validation, and strict decoupling from browser code.

---

## 2. Complete Legacy Page Migration Matrix

| Legacy Page | Next.js Route | Type | Status & Key Enhancements |
| :--- | :--- | :--- | :--- |
| `legacy/index.html` | `/` | Static (5m reval) | Hero carousel with LCP eager loading, featured tour grid, travel categories, agency value pillars, testimonials, and SEO structured data. |
| `legacy/src/tours.html` | `/tours` | Static (5m reval) | Full catalog with category filters, duration/price badges, live search, and dynamic card layouts. |
| `legacy/src/tour-detail.html` | `/tours/[slug]` | Dynamic (SSR) | Dynamic route driven by WordPress custom post type `tour_package`, sanitized CMS rich text, ACF metadata, pricing, and booking CTA. |
| `legacy/src/booking.html` | `/prenota` | Dynamic (SSR) | Multi-step accessible booking engine with real-time price calculation, coupon discounts, guest selector, server validation, and proxy submission to `submit-booking`. |
| `legacy/src/blog.html` | `/blog` | Dynamic (SSR) | Post listings with categories, reading time, published dates, and pagination. |
| `legacy/src/blog-post.html` | `/blog/[slug]` | Dynamic (SSR) | Rich editorial post view with sanitized HTML, author info, related posts, and OpenGraph metadata. |
| `legacy/src/regala-un-viaggio.html` | `/regala-un-viaggio` | Static (1d reval) | Interactive gift voucher generator with live boarding-pass preview stub (barcode `INC-GFT-2026`, amount, dedication, occasion), WhatsApp assistance, and server proxy to `tourism/v1/submit-gift-voucher`. |
| `legacy/src/donate.html` | `/sostieni-incantour` | Static (1d reval) | Sustainable tourism donation page with one-time vs monthly toggle, presets (€10-€200), impact pillars, and accessible FAQ accordion. |
| `legacy/src/contatti.html` | `/contatti` | Static (5m reval) | Complete contact info (Calata Trinità Maggiore, 53), directions, email/phone, privacy-conscious lazy-loaded Google Map, and validated proxy submission to `contact-request`. |
| `legacy/src/terra-mare-tour.html` | `/terra-mare-tour` | Static (5m reval) | Flagship regional experience page with boat tours, archaeology excursions, itinerary schedule, and direct booking links. |
| `legacy/src/destination-wedding.html` | `/destination-wedding` | Static (5m reval) | Luxury wedding travel guide in Campania, venue curation, ceremony options, and tailored quote modal. |
| `legacy/src/wedding-planner.html` | `/wedding-planner` | Static (5m reval) | Wedding planning & travel coordinator services, vendor network, and custom request form. |
| `legacy/src/gruppi-a-tema.html` | `/gruppi-a-tema` | Static (5m reval) | Themed group departures (gastronomy, culture, trekking), group request form (`group-request`). |
| `legacy/src/viaggi-atipici.html` | `/viaggi-atipici` | Static (5m reval) | Experiential and off-the-beaten-path travel itineraries. |
| `legacy/src/crociere.html` | `/crociere` | Static (5m reval) | Mediterranean and luxury cruise packages with ship features, excursions, and custom inquiry. |
| `legacy/src/viaggi-di-nozze.html` | `/viaggi-di-nozze` | Static (5m reval) | Honeymoon curation and digital wedding list feature (`lista-nozze`). |
| `legacy/src/percorsi-lingua-italiana.html` | `/percorsi-lingua-italiana` | Static (5m reval) | Italian language immersion courses, academic seminars, and cultural workshops. |
| `legacy/src/turismo-radici.html` | `/turismo-radici` | Static (5m reval) | Roots and heritage tourism itineraries for Italian descendants worldwide (`roots-request`). |
| `legacy/src/storia-visione.html` | `/storia-visione` | Static (5m reval) | Company history, mission, ethical charter, and press releases. |
| `legacy/src/team.html` | `/team` | Static (5m reval) | Core leadership and certified tour guide profiles. |
| `legacy/src/partner.html` | `/partner` | Static (5m reval) | B2B agency portal, DMC partnerships, and co-marketing programs. |
| `legacy/src/lavora-con-noi.html` | `/lavora-con-noi` | Static (5m reval) | Careers and collaboration portal with open positions and CV submission. |
| `legacy/src/faq.html` | `/faq` | Static (5m reval) | Comprehensive FAQ accordion with instant client-side keyword search. |
| `legacy/src/navbar.html` | Component | Client | Replaced with responsive `SiteHeader` component supporting multi-level dropdowns, keyboard navigation (Escape, outside click), and scroll state styling. |
| `legacy/src/footer.html` | Component | Client | Replaced with `SiteFooter` matching exact legacy 4-column typography, legal registrations, floating language switcher, and WhatsApp widget. |

---

## 3. Missing Legacy Endpoints & Assets (Explicitly Documented)

In accordance with strict pair programming instructions, no missing backend scripts or broken references were silently invented or mocked as functional:

| Reference / Endpoint | Where Referenced | Status & Architecture Decision |
| :--- | :--- | :--- |
| `/wp-content/themes/twentytwentyfive/process-donation.php` | Legacy `donate.html` | **Missing from codebase.** Legacy attempted to submit to an unversioned theme file with a test Stripe key. In Next.js, submissions route through server-side `/api/forms/donation` with fallback to `donation-request`/`contact-request`. The UI clearly states that online card charging is in configuration and contributions are processed as confirmed pledges with official deductible receipts and bank coordinates (IBAN). |
| `/wp-content/themes/twentytwentyfive/process-booking.php` | Legacy `booking.html` | **Missing from codebase.** Booking submissions route through server-side `/api/forms/booking` to the verified WordPress REST endpoint `/wp-json/tourism/v1/submit-booking`. Instant credit card processing is clearly identified as pending merchant configuration. |
| `{wcStoreApiBase}` | Legacy `api.js` | **Undocumented.** The legacy config never initialized WooCommerce Store API. Direct checkout is intentionally held as an unresolved integration pending client store configuration. |
| `/src/login.html`, `/login` | `terra-mare-tour.html` / `navbar.html` | **Missing / Commented out.** In `navbar.html`, login was commented out. Redirects map `/src/login.html`, `/login.html`, and `/login` to `/contatti`. |
| `/src/novita-eventi.html`, `/src/racconti-viaggio.html` | `navbar.html` dropdown | **Missing in legacy.** Redirects map both `.html` and clean routes to `/blog`. |
| `footer con allegati/*.pdf` | Legacy `footer.html` | `Termini e Condizioni Pacchetti Turistici.pdf` and `Codice Etico Incantour.pdf` were missing from the legacy source directory. Retained in navigation links pointing to `/footer con allegati/` ready for document attachment. |

---

## 4. Redirects & URL Compatibility (`web/next.config.ts`)

Every legacy `.html` path, query-string structure, and clean route is covered by permanent 301 redirects in [next.config.ts](file:///e:/incantour-next/web/next.config.ts):

- `/index.html` &rarr; `/`
- `/src/tours.html`, `/tours.html`, `/tour` &rarr; `/tours`
- `/src/tour-detail.html`, `/tour-detail.html` &rarr; `/tours`
- `/tour/:slug*` &rarr; `/tours/:slug*`
- `/src/blog.html`, `/blog.html` &rarr; `/blog`
- `/src/blog-post.html`, `/blog-post.html`, `/blog-post` &rarr; `/blog`
- `/blog-post/:slug*` &rarr; `/blog/:slug*`
- `/src/booking.html`, `/booking.html`, `/booking` &rarr; `/prenota`
- `/src/contatti.html`, `/contatti.html` &rarr; `/contatti`
- `/src/crociere.html`, `/crociere.html` &rarr; `/crociere`
- `/src/destination-wedding.html`, `/destination-wedding.html` &rarr; `/destination-wedding`
- `/src/wedding-planner.html`, `/wedding-planner.html` &rarr; `/wedding-planner`
- `/src/gruppi-a-tema.html`, `/gruppi-a-tema.html` &rarr; `/gruppi-a-tema`
- `/src/viaggi-atipici.html`, `/viaggi-atipici.html` &rarr; `/viaggi-atipici`
- `/src/viaggi-di-nozze.html`, `/viaggi-di-nozze.html` &rarr; `/viaggi-di-nozze`
- `/src/percorsi-lingua-italiana.html`, `/percorsi-lingua-italiana.html` &rarr; `/percorsi-lingua-italiana`
- `/src/turismo-radici.html`, `/turismo-radici.html` &rarr; `/turismo-radici`
- `/src/storia-visione.html`, `/storia-visione.html` &rarr; `/storia-visione`
- `/src/team.html`, `/team.html` &rarr; `/team`
- `/src/partner.html`, `/partner.html` &rarr; `/partner`
- `/src/lavora-con-noi.html`, `/lavora-con-noi.html` &rarr; `/lavora-con-noi`
- `/src/faq.html`, `/faq.html` &rarr; `/faq`
- `/src/terra-mare-tour.html`, `/terra-mare-tour.html` &rarr; `/terra-mare-tour`
- `/src/regala-un-viaggio.html`, `/regala-un-viaggio.html` &rarr; `/regala-un-viaggio`
- `/src/donate.html`, `/donate.html`, `/donate` &rarr; `/sostieni-incantour`
- `/src/novita-eventi.html`, `/novita-eventi.html` &rarr; `/blog`
- `/src/racconti-viaggio.html`, `/racconti-viaggio.html` &rarr; `/blog`
- `/src/login.html`, `/login.html`, `/login` &rarr; `/contatti`

---

## 5. Security & Form Architecture

All user-submitted data follows a hardened, decoupled server proxy pattern:
1. **Server Route Handler:** `POST /api/forms/[form]` manages all form types (`booking`, `gift-voucher`, `donation`, `contact`, `wedding`, `lista-nozze`, `group`, `roots`).
2. **Endpoint Masking:** WordPress REST API endpoints (`/wp-json/tourism/v1/...`, `/wp-json/incantour/v1/...`) are never exposed to browser bundles.
3. **Spam Defense:** Silent honeypot detection traps bot submissions without alerting scrapers.
4. **Input Validation:** Strict type and format validation on both client and server before payloads are forwarded.
5. **Sanitization:** All remote HTML delivered by WordPress is sanitized using `sanitize-html` to prevent XSS.
6. **No Sensitive Logging:** Client forms do not log submitted passwords, donor amounts, or recipient credentials to browser console.

---

## 6. Accessibility & UX Quality Audit

- **Keyboard Navigation:** Full support for `Tab`, `Shift+Tab`, `Escape` (closes dropdowns and modals), and `Enter`/`Space` activation.
- **Focus States:** High-visibility amber/teal focus rings applied to all interactive elements.
- **Error Summaries:** Error summaries with focus management on validation failure, linked via `aria-describedby` and `aria-invalid`.
- **Motion Reduction:** `motion-reduce:animate-none` applied to the spinning spiral logo and animated elements.
- **Visual Parity:** Legacy footer matched exactly (`bg-gray-900`, `text-gray-300`, 4-column grid, `#E6A532` accents, floating language selector, WhatsApp button).
- **SEO & Structured Data:** Complete JSON-LD Schema.org types (`WebPage`, `TravelAgency`, `TouristTrip`, `Article`) across all pages.

---

## 7. Recommended Production Launch Checklist

Prior to pointing the production DNS to the Next.js deployment:

- [ ] **WordPress REST Endpoints:** Ensure the production WordPress installation enables the custom endpoints (`tourism/v1/submit-booking`, `tourism/v1/submit-gift-voucher`, `incantour/v1/contact-request`).
- [ ] **Environment Variables:** Set production `.env.production` values:
  - `WORDPRESS_URL=https://incantour.it/wordpress`
  - `WORDPRESS_REST_BASE=https://incantour.it/wordpress/wp-json/wp/v2`
  - `NEXT_PUBLIC_SITE_URL=https://incantour.it`
- [ ] **Payment Gateway Verification:** If automated online credit card processing is desired, implement a verified server-side Stripe/PayPal webhook handler rather than reusing the deprecated legacy test keys.
- [ ] **Source PDF Documents:** Upload the official signed copies of `Termini e Condizioni Pacchetti Turistici.pdf` and `Codice Etico Incantour.pdf` into `web/public/footer con allegati/`.
- [ ] **Search Console:** Submit `https://incantour.it/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
