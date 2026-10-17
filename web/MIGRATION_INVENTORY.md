# IncanTour legacy migration inventory

## Source audited

The requested `legacy/` folder is not present in this checkout. This inventory treats `../incan/` as the read-only legacy source because it contains the supplied `index.html`, `src/`, `assets/`, `slides/`, and `wp-content/` structure. No files in that source were changed.

## Route map

| Legacy source / URL | Proposed Next route | Purpose | Content type |
| --- | --- | --- | --- |
| `index.html` | `/` | Italian-first landing page, featured tours/posts, testimonials | Mixed: static shell + CMS lists |
| `src/tours.html` | `/tour` | Tour catalogue with type filters | CMS-powered |
| `src/tour-detail.html?id={id}` | `/tour/{id}` | Tour detail, quantity and booking handoff, related posts | CMS-powered / transactional handoff |
| `src/booking.html?tour={id}` | `/prenota?tour={id}` | Tour booking and Stripe payment | Transactional |
| `src/blog.html` | `/blog` | Blog index | CMS-powered |
| `src/blog-post.html?id={id}` | `/blog/{id}` | Blog post plus related tours | CMS-powered |
| `src/storia-visione.html` | `/storia-visione` | Company story and press material | Static |
| `src/team.html` | `/team` | Team presentation | Static |
| `src/contatti.html` | `/contatti` | Contact details, map, general contact form | Static + form |
| `src/faq.html` | `/faq` | Searchable FAQ | Static fallback + CMS-powered FAQ endpoint |
| `src/partner.html` | `/partner` | Partnership presentation | Static |
| `src/lavora-con-noi.html` | `/lavora-con-noi` | Careers / Maison Degas promotion | Static |
| `src/viaggi-di-nozze.html` | `/viaggi-di-nozze` | Honeymoon discovery, registry form, filtered tours/news | Mixed: static + CMS + form |
| `src/wedding-planner.html` | `/wedding-planner` | Wedding-planning offer and bespoke enquiry | Mixed: static + CMS + form |
| `src/destination-wedding.html` | `/destination-wedding` | Destination-wedding offer, registry CTA, tours/news | Mixed: static + CMS |
| `src/turismo-radici.html` | `/turismo-radici` | Roots-tourism enquiry, filtered tours/news | Mixed: static + CMS + form |
| `src/percorsi-lingua-italiana.html` | `/percorsi-lingua-italiana` | Language/culture programmes, downloads, form, tours/news | Mixed: static + CMS + form |
| `src/viaggi-atipici.html` | `/viaggi-atipici` | Alternative travel, filtered tours/news | Mixed: static + CMS |
| `src/terra-mare-tour.html` | `/terra-mare-tour` | TerraMare offer, filtered tours/news | Mixed: static + CMS |
| `src/crociere.html` | `/crociere` | Cruises, filtered tours/news | Mixed: static + CMS |
| `src/gruppi-a-tema.html` | `/gruppi-a-tema` | Themed group trips and enquiry form | Static + form |
| `src/regala-un-viaggio.html` | `/regala-un-viaggio` | Gift-voucher payment form | Transactional |
| `src/donate.html` | `/sostieni-incantour` | Donation form and Stripe payment | Transactional |
| `src/navbar.html` | React `SiteHeader` component (not a public page) | Iframe-injected global navigation | Shared fragment |
| `src/footer.html` | React `SiteFooter` component (not a public page) | Iframe-injected global footer | Shared fragment |

## Shared page families

| Family | Legacy members | Proposed shared pieces |
| --- | --- | --- |
| Marketing information | Story, team, partner, careers, contact | `PageHero`, `Section`, `Card`, `Container` |
| Tour discovery | Tour catalogue; cruises; weddings; roots; language; atypical; TerraMare | server-fetched tour grid, `TourCard`, filter controls |
| Editorial | Home featured posts, blog index, blog post, category news strips | `BlogCard`, server WordPress client, sanitized rich-text renderer |
| Enquiries | Contact, wedding planner, roots, groups, language, wedding registry | `FormField`, validation, server-side form proxy |
| Payment / checkout | Booking, gift voucher, donation | isolated client payment components and server-created intents; no legacy payment JS copied into React |

## Legacy dependencies and integrations

- Styling is primarily Tailwind's browser CDN plus Font Awesome CDN; `assets/css/style.css` supplies additional card, menu, animation, and responsive rules.
- Shared navigation and footer are inserted from `navbar.html` / `footer.html` through iframes that replace themselves with DOM content. The Next app replaces this with React components.
- Google Translate is loaded at runtime for Italian, English, and Spanish. The new architecture deliberately uses locale-ready content data and does **not** use Google Translate as primary SEO content.
- WordPress REST supplies `posts` and the custom `tour_package` post type, with `_embed` for featured media and ACF data.
- Stripe.js appears on booking, gift-voucher, and donation pages. Legacy pages embed a test publishable key and call undisclosed PHP endpoints; this must be re-integrated securely rather than copied.
- A Google Maps embed is used on the contact page.

## Asset preservation

All 56 files from `../incan/assets/` and all 13 files from `../incan/slides/` were copied unchanged to `public/assets/` and `public/slides/`. This includes image files, documents, CSS, and legacy JavaScript for historical reference; the new app does not execute the copied legacy scripts or use Tailwind's browser CDN.

## Redirect sequencing

`/index.html` already redirects permanently to `/`. The full mapping above is the redirect source of truth. Add a permanent redirect only when its target route ships; otherwise a legacy URL would be redirected to a Next 404. In the relevant migration batch, add exact `.html` redirects and query-aware redirects such as:

- `/src/tour-detail.html?id={id}` -> `/tour/{id}`
- `/src/blog-post.html?id={id}` -> `/blog/{id}`
- `/src/booking.html?tour={id}` -> `/prenota?tour={id}`

Query parameters must be preserved for `quantity`, `price`, and `subject` where the target flow still supports them. Canonical URLs should always use the new routes, not `.html` aliases.
