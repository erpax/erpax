# `src/components/`

React component library — Next.js App Router compatible, server-component
first. Per-component banners are limited to **entry points** (the `config.ts`
files for blocks/heros/Header/Footer, plus the root `index.tsx` of
self-contained components). Individual leaf JSX files inherit the standards
declared here unless they introduce new ones.

## Cross-cutting standards (apply to every file in this tree)

| Tag                      | Standard / Spec                                        | What it covers                                                |
|--------------------------|--------------------------------------------------------|---------------------------------------------------------------|
| `@standard`              | W3C HTML5 Living Standard                              | semantic markup, form elements, dialog, details/summary       |
| `@standard`              | WAI-ARIA 1.2                                           | role / aria-* attributes on dynamic UI                        |
| `@standard`              | W3C CSS Living Standard                                | layout, typography, color, motion                             |
| `@standard`              | schema.org Microdata / RDFa                            | structured data on Article, Product, BreadcrumbList, etc.     |
| `@standard`              | BCP-47 / RFC 5646                                      | every locale-aware string and `lang` attribute                |
| `@rfc`                   | 3986                                                   | every URL constructed in JSX (links, image src, form action)  |
| `@compliance`            | WCAG 2.1 level-AA                                      | success criteria — contrast, focus visibility, keyboard nav   |
| `@compliance`            | EN 301 549 v3.2.1                                      | EU public-sector accessibility (mirrors WCAG 2.1 AA)          |
| `@compliance`            | EAA EU 2019/882                                        | European Accessibility Act enforcement                         |

## When a component DOES need its own banner

Add a per-file banner only if the component carries standards beyond this
list. Examples:

- A component renders ISO 8601 timestamps via `<time datetime>` → cite
  ISO-8601-1:2019.
- A form block uses `<input type="email">` → cite RFC 5322.
- A media block embeds video → cite ISO/IEC 14496 (MPEG-4) / W3C HTML5
  Media-Source-Extensions.
- A schema.org-rich component (Product card, Article header) → cite the
  specific schema.org type.

## File-naming convention

- `Foo/config.ts` — Payload block / config definition (server-side).
- `Foo/index.tsx` — server component (default).
- `Foo/Component.client.tsx` — explicit client boundary.
- `Foo/Foo.module.css` — co-located CSS Module (when used).

See `docs/STANDARDS.md` §3 §4.3 for the full taxonomy.
