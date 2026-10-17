# Migration risks and required backend decisions

## Missing or broken legacy references

| Reference | Where used | Status / action required |
| --- | --- | --- |
| `assets/js/language.js` | `src/tours.html` | Missing. Do not recreate its unknown behavior; replace with the Next locale architecture. |
| `assets/images/slides/1.png` | `src/lavora-con-noi.html` | Missing. Obtain original image or approve a replacement. |
| `assets/images/slides/2.png` | `src/partner.html` | Missing. Obtain original image or approve a replacement. |
| `assets/documents/Programma.pdf` | `src/percorsi-lingua-italiana.html` | Missing. Obtain source document. |
| `assets/documents/Seminari.pdf` | `src/percorsi-lingua-italiana.html` | Missing. Obtain source document. |
| `assets/documents/Rassegna_Stampa_TerraMare.pdf` | `src/storia-visione.html` | Missing. Obtain source document. |
| `footer con allegati/Codice Etico Incantour.pdf` | `src/footer.html` | Missing. Obtain compliance document. |
| `footer con allegati/Termini e Condizioni Pacchetti Turistici.pdf` | `src/footer.html` | Missing. Obtain terms document. |
| `assets/images/default-tour.jpg` | legacy `api.js` fallback | Missing. CMS image fallback needs an approved asset. |
| `assets/images/default-blog.jpg` | legacy `api.js` fallback | Missing. CMS image fallback needs an approved asset. |
| `assets/images/hero-bg.jpg` | legacy stylesheet | Missing. The stylesheet rule is unused by the current page markup but must not be relied on. |
| `/src/login.html`, `/login` | navigation / TerraMare | Missing. Confirm whether login belongs to WordPress, another product, or should be removed. |
| `/src/novita-eventi.html`, `/src/racconti-viaggio.html` | navigation | Missing. Confirm whether these should become blog filters, external pages, or be removed. |

## WordPress endpoints found

The legacy configuration points to `https://staging.incantour.it/wordpress`; that staging URL is recorded as evidence only and is not baked into the Next application.

| Endpoint or base | Use |
| --- | --- |
| `/wp-json` | Legacy nonce discovery (the expected nonce response is undocumented). |
| `/wp-json/wp/v2/tour_package?_embed` | Tour list. |
| `/wp-json/wp/v2/tour_package/{id}?_embed` | Tour detail. |
| `/wp-json/wp/v2/posts?per_page={n}&_embed` | Blog list / related-post filtering. |
| `/wp-json/wp/v2/posts/{id}?_embed` | Blog post detail. |
| `/wp-json/tourism/v1/submit-booking` | Legacy non-payment booking submission. |
| `/wp-json/tourism/v1/submit-gift-voucher` | Gift-voucher submission. |
| `/wp-json/incantour/v1/contact-request` | Contact form. |
| `/wp-json/incantour/v1/wedding-request` | Wedding form and legacy fallback for contact/roots. |
| `/wp-json/incantour/v1/group-request` | Group-travel form. |
| `/wp-json/incantour/v1/roots-request` | Roots-tourism form. |
| `/wp-json/incantour/v1/faqs` | FAQ data. |
| `/wp-content/themes/twentytwentyfive/process-booking.php` | Stripe booking payment intent endpoint. Source is absent. |
| `/wp-content/themes/twentytwentyfive/process-donation.php` | Stripe donation payment intent endpoint. Source is absent. |
| `{wcStoreApiBase}/cart/add-item`, `{wcStoreApiBase}/cart/checkout` | WooCommerce direct checkout. `wcStoreApiBase` is never defined in legacy config. |

## Explicitly unresolved integration details

- `functions.php` is present but empty, and neither payment PHP file is in the supplied source. Their authentication, validation, data schema, payment-intent semantics, and webhook handling are unknown.
- The custom API spans both `tourism/v1` and `incantour/v1`; a single environment base cannot safely be assumed to cover both. Confirm ownership, allowed methods, payload contracts, authentication, CORS, rate limiting, and spam protection before enabling migrated forms.
- The legacy Stripe publishable key is a test key. Do not reuse it for production. Confirm production Stripe account, server-side intent creation, webhooks, idempotency behavior, and PCI responsibilities.
- `WORDPRESS_WOOCOMMERCE_STORE_API_BASE` is intentionally blank in `.env.example`. Do not invent the missing `wcStoreApiBase`; WooCommerce checkout remains an explicit integration TODO.
- ACF fields used by templates include `type`, `category`, `Price`, `Duration`, `Location`, `Tags`, and potentially gallery/description fields. Confirm field names and formats against the live CMS before rendering content pages.
- The true production public origin, WordPress production origin, media host allowlist, social-preview assets, legal-document URLs, and translation editorial workflow require confirmation.
- Legacy pages inject remote HTML with `innerHTML`. The Next WordPress client sanitizes CMS HTML before it can be rendered; any additional allowed tags/embeds should be explicitly approved.
