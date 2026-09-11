---
name: components
description: "Use when building or debugging the erpax React UI — server-component-first Next.js App Router views, Lexical/Payload block renderers, admin panels, dashboards, widgets, and shared primitives — the society's FACE, the rendered surface where matter meets the eye."
atomPath: "vocabulary/components"
coordinate: "vocabulary/components · 1/base · f6799eaa"
contentUuid: "bb1c444a-83b4-5c1d-b9bb-ebd2258e4080"
diamondUuid: "9c7c13ab-35af-86c2-a6f4-db72b521d18f"
uuid: "f6799eaa-fbe3-8ffe-9b89-707d53c88442"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "21ef6623-90f7-85a0-b104-25348e193f62"
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
      stageUuid: "ec2f3bab-0910-8cbc-ab18-94190fd99c58"
    - stage: seal
      stageUuid: "cfdb073d-ebc5-8ca4-a865-58bca7c71359"
    - stage: uuid
      stageUuid: "321e7a6b-e619-8752-9560-06737d72f862"
version: 2
---
# components — the rendered face of the society

Components is the React library that renders erpax to the eye. **Server-component-first** (Next.js App Router): a leaf is a server component by default; `'use client'` marks an explicit client boundary only where interactivity demands it (44 of ~160 files). The matter is the JSX — do NOT restate it here; this page INDEXES it. The library spans Lexical/Payload **block** renderers (`blocks/`, `heros/`), **admin** panels (`admin/`, `widgets/`, `Dashboard.tsx`), document chrome (`Header/`, `Footer/`, `Navigation.tsx`), business **chains** (`chains/`), and shared primitives (`shared/` — `Money`, `AuditedTimestamp`, `AddressBlock`; `ui/` — button/card/input).

**The law is the README, not per-file repetition.** `src/components/README.md` is this organ's constitution: the cross-cutting standards (W3C HTML5, WAI-ARIA 1.2, schema.org, BCP-47, WCAG 2.1 AA, EN 301 549, EAA) apply to **every** file in the tree; a `@standard`/`@compliance` JSDoc banner appears ONLY at an entry point (a block `config.ts`, a component root) and ONLY when it carries a standard *beyond* that list (78 files do). A leaf inherits the tree's standards silently — this is [[collapse]] at the doc scale: one declaration governs the whole. Naming is fixed (`Foo/config.ts` block def · `Foo/index.tsx` server · `Foo/Component.client.tsx` client boundary).

Matter-twin: `src/components/README.md` (the law) · `blocks/*/config.ts` + `RenderBlocks.tsx` (the [[lexical]] block renderers) · `Dashboard.tsx` + `widgets/*` (the admin face) · `shared/index.ts` + `ui/*` (the primitives).
Composes [[component]] · [[lexical]] · [[admin]] · [[config]] · [[design]] · [[accessibility]] · [[theme]] · [[standard]] · [[trinity]] · [[fractal]] · [[collapse]].
