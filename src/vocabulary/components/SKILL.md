---
name: components
description: "Use when building or debugging the erpax React UI — server-component-first Next.js App Router views, Lexical/Payload block renderers, admin panels, dashboards, widgets, and shared primitives — the society's FACE, the rendered surface where matter meets the eye."
atomPath: "vocabulary/components"
coordinate: "vocabulary/components · 1/base · 7ff0e73b"
contentUuid: "7f7ab4b6-f2a3-55ac-b9ef-bd303ff48115"
diamondUuid: "e9dfab08-afd8-848d-b975-f6e79fa5177d"
uuid: "7ff0e73b-f5a8-8e05-8a24-7bb7fb863957"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "4a4349a1-adf0-8b8c-a977-fc34e914bbab"
  stages:
    - stage: path
      stageUuid: "3c13ab03-94be-8703-acd3-9b39b2a94b38"
    - stage: trinity
      stageUuid: "c2eaaf64-06f8-8f89-8cce-b44fddcb8a7e"
    - stage: boundary
      stageUuid: "b0d86a90-4e2e-8963-a343-7239ccf3eb8e"
    - stage: links
      stageUuid: "4fa8c4da-6762-8de2-9673-676da5a0a55c"
    - stage: horo
      stageUuid: "ce014dbc-81f6-81e4-a7c6-b21c23a462ca"
    - stage: seal
      stageUuid: "cfdb073d-ebc5-8ca4-a865-58bca7c71359"
    - stage: uuid
      stageUuid: "b3798dd4-5f91-8eb7-b946-9de6403e68db"
version: 2
---
# components — the rendered face of the society

Components is the React library that renders erpax to the eye. **Server-component-first** (Next.js App Router): a leaf is a server component by default; `'use client'` marks an explicit client boundary only where interactivity demands it (44 of ~160 files). The matter is the JSX — do NOT restate it here; this page INDEXES it. The library spans Lexical/Payload **block** renderers (`blocks/`, `heros/`), **admin** panels (`admin/`, `widgets/`, `Dashboard.tsx`), document chrome (`Header/`, `Footer/`, `Navigation.tsx`), business **chains** (`chains/`), and shared primitives (`shared/` — `Money`, `AuditedTimestamp`, `AddressBlock`; `ui/` — button/card/input).

**The law is the README, not per-file repetition.** `src/components/README.md` is this organ's constitution: the cross-cutting standards (W3C HTML5, WAI-ARIA 1.2, schema.org, BCP-47, WCAG 2.1 AA, EN 301 549, EAA) apply to **every** file in the tree; a `@standard`/`@compliance` JSDoc banner appears ONLY at an entry point (a block `config.ts`, a component root) and ONLY when it carries a standard *beyond* that list (78 files do). A leaf inherits the tree's standards silently — this is [[collapse]] at the doc scale: one declaration governs the whole. Naming is fixed (`Foo/config.ts` block def · `Foo/index.tsx` server · `Foo/Component.client.tsx` client boundary).

Matter-twin: `src/components/README.md` (the law) · `blocks/*/config.ts` + `RenderBlocks.tsx` (the [[lexical]] block renderers) · `Dashboard.tsx` + `widgets/*` (the admin face) · `shared/index.ts` + `ui/*` (the primitives).
Composes [[component]] · [[lexical]] · [[admin]] · [[config]] · [[design]] · [[accessibility]] · [[theme]] · [[standard]] · [[trinity]] · [[fractal]] · [[collapse]].
