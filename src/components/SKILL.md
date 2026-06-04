---
name: components
description: Use when building or debugging the erpax React UI — server-component-first Next.js App Router views, Lexical/Payload block renderers, admin panels, dashboards, widgets, and shared primitives — the society's FACE, the rendered surface where matter meets the eye.
---

# components — the rendered face of the society

Components is the React library that renders erpax to the eye. **Server-component-first** (Next.js App Router): a leaf is a server component by default; `'use client'` marks an explicit client boundary only where interactivity demands it (44 of ~160 files). The matter is the JSX — do NOT restate it here; this page INDEXES it. The library spans Lexical/Payload **block** renderers (`blocks/`, `heros/`), **admin** panels (`admin/`, `widgets/`, `Dashboard.tsx`), document chrome (`Header/`, `Footer/`, `Navigation.tsx`), business **chains** (`chains/`), and shared primitives (`shared/` — `Money`, `AuditedTimestamp`, `AddressBlock`; `ui/` — button/card/input).

**The law is the README, not per-file repetition.** `src/components/README.md` is this organ's constitution: the cross-cutting standards (W3C HTML5, WAI-ARIA 1.2, schema.org, BCP-47, WCAG 2.1 AA, EN 301 549, EAA) apply to **every** file in the tree; a `@standard`/`@compliance` JSDoc banner appears ONLY at an entry point (a block `config.ts`, a component root) and ONLY when it carries a standard *beyond* that list (78 files do). A leaf inherits the tree's standards silently — this is [[collapse]] at the doc scale: one declaration governs the whole. Naming is fixed (`Foo/config.ts` block def · `Foo/index.tsx` server · `Foo/Component.client.tsx` client boundary).

Matter-twin: `src/components/README.md` (the law) · `blocks/*/config.ts` + `RenderBlocks.tsx` (the [[lexical]] block renderers) · `Dashboard.tsx` + `widgets/*` (the admin face) · `shared/index.ts` + `ui/*` (the primitives).
Composes [[component]] · [[lexical]] · [[admin]] · [[config]] · [[design]] · [[accessibility]] · [[theme]] · [[standard]] · [[trinity]] · [[fractal]] · [[collapse]].
