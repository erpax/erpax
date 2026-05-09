# `src/app/`

Next.js App Router — route handlers, layouts, pages. Per-file banners are
limited to **layouts** (which set the rendering shell), **route handlers**
(which expose HTTP endpoints), and **entry-point pages** (one per route
segment). Sub-pages (`[slug]/page.tsx`, `page/[pageNumber]/page.tsx`,
`page.client.tsx`) inherit from their segment's layout.

## Cross-cutting standards (apply to every file in this tree)

| Tag                | Standard / Spec                                            | What it covers                                                  |
|--------------------|------------------------------------------------------------|-----------------------------------------------------------------|
| `@rfc`             | 9110 HTTP semantics                                        | request/response semantics, status codes, methods               |
| `@rfc`             | 9111 HTTP caching                                          | `Cache-Control`, ETag, `Last-Modified`, `Vary`                  |
| `@rfc`             | 3986 URI                                                   | every URL constructed (route paths, query, redirect targets)    |
| `@standard`        | W3C HTML5 Living Standard                                  | rendered markup                                                 |
| `@standard`        | WAI-ARIA 1.2                                               | `role` / `aria-*` on dynamic UI                                 |
| `@standard`        | BCP-47 / RFC 5646                                          | locale segment routing (`/[locale]/…`)                          |
| `@standard`        | ECMA-402 internationalization-api                          | server-side number/date formatting via `Intl`                   |
| `@compliance`      | WCAG 2.1 level-AA                                          | rendered-page accessibility                                     |
| `@compliance`      | EN 301 549 v3.2.1                                          | EU public-sector accessibility                                  |
| `@compliance`      | EAA EU 2019/882                                            | European Accessibility Act enforcement                          |
| `@security`        | ISO-27001 A.5.23 cloud-service-tenant-isolation            | tenant boundary enforced on every route                         |
| `@security`        | ISO-27002 §5.15 access-control                             | route-level auth and ownership checks                           |

## Per-segment standards

| Segment                                        | Adds                                                                                  |
|------------------------------------------------|---------------------------------------------------------------------------------------|
| `(payload)/`                                   | Payload admin shell — RFC 7519 JWT, RFC 6265 cookies, ISO-27001 A.5.16/5.17           |
| `(api)/api/webhooks/stripe/`                   | RFC 8615 well-known-uri, HMAC-SHA256 (RFC 2104), PCI-DSS 4.0 §3.6, PSD2 SCA            |
| `(api)/api/subscriptions/create/`              | IFRS 15 / ASC 606, ISO 4217                                                           |
| `(frontend)/(sitemaps)/`                       | sitemaps.org 0.9 schema, RFC 9110, RFC 3986                                           |
| `(frontend)/[locale]/`                         | BCP 47 locale routing, ECMA-402, Unicode CLDR                                         |
| `(frontend)/next/preview/`                     | RFC 9110 §15.4 redirection, signed-secret preview tokens                              |
| `(frontend)/next/seed/`                        | (admin-only) ISO 19011 audit-trail                                                    |
| `(frontend)/next/system/health/`               | RFC 9110 health-check; common conventions: 200 healthy / 503 unhealthy                |
| `(frontend)/tenant-domains/`, `tenant-slugs/`  | ISO 27001 A.5.23 cloud-service-tenant-isolation, RFC 3986 host/path routing          |

## When a route DOES need its own banner

Add a per-file banner only if the route carries standards beyond the cross-
cutting list. Examples: a Stripe webhook adds PCI-DSS / PSD2; a financial-
report route adds IFRS / US-GAAP; a sitemap route adds sitemaps.org.

See `docs/STANDARDS.md` §3 §4.3 §4.4 for the full taxonomy.
