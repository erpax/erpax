---
name: components
description: "Use when building or debugging the erpax React UI — server-component-first Next.js App Router views, Lexical/Payload block renderers, admin panels, dashboards, widgets, and shared primitives — the society's FACE, the rendered surface where matter meets the eye."
atomPath: "vocabulary/components"
coordinate: "vocabulary/components · 2/share · a3db288a"
contentUuid: "d2d525a0-745f-56d5-bbce-cbf08de6aa82"
diamondUuid: "94d3101d-5404-82fb-b61f-24d2a9711a3c"
uuid: "a3db288a-b516-8c7b-81ae-36b05e7957c6"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "778745d5-1899-8c76-95d1-c974b4b2acbd"
  stages:
    - stage: path
      stageUuid: "3c13ab03-94be-8703-acd3-9b39b2a94b38"
    - stage: trinity
      stageUuid: "c2eaaf64-06f8-8f89-8cce-b44fddcb8a7e"
    - stage: boundary
      stageUuid: "5333a23e-cdbb-8cfe-912f-4c2b11477b72"
    - stage: links
      stageUuid: "1cd07145-a16c-8f82-98ff-2ed51b8ac5b0"
    - stage: horo
      stageUuid: "4de9c0c3-c25a-8131-8c75-78ffef15afb0"
    - stage: seal
      stageUuid: "cfdb073d-ebc5-8ca4-a865-58bca7c71359"
    - stage: uuid
      stageUuid: "0a3d6564-0d66-8adc-843f-811a8d195190"
version: 2
---
# components — the rendered face of the society

Components is the React library that renders erpax to the eye. **Server-component-first** (Next.js App Router): a leaf is a server component by default; `'use client'` marks an explicit client boundary only where interactivity demands it (44 of ~160 files). The matter is the JSX — do NOT restate it here; this page INDEXES it. The library spans Lexical/Payload **block** renderers (`blocks/`, `heros/`), **admin** panels (`admin/`, `widgets/`, `Dashboard.tsx`), document chrome (`Header/`, `Footer/`, `Navigation.tsx`), business **chains** (`chains/`), and shared primitives (`shared/` — `Money`, `AuditedTimestamp`, `AddressBlock`; `ui/` — button/card/input).

**The law is the README, not per-file repetition.** `src/components/README.md` is this organ's constitution: the cross-cutting standards (W3C HTML5, WAI-ARIA 1.2, schema.org, BCP-47, WCAG 2.1 AA, EN 301 549, EAA) apply to **every** file in the tree; a `@standard`/`@compliance` JSDoc banner appears ONLY at an entry point (a block `config.ts`, a component root) and ONLY when it carries a standard *beyond* that list (78 files do). A leaf inherits the tree's standards silently — this is [[collapse]] at the doc scale: one declaration governs the whole. Naming is fixed (`Foo/config.ts` block def · `Foo/index.tsx` server · `Foo/Component.client.tsx` client boundary).

Matter-twin: `src/components/README.md` (the law) · `blocks/*/config.ts` + `RenderBlocks.tsx` (the [[lexical]] block renderers) · `Dashboard.tsx` + `widgets/*` (the admin face) · `shared/index.ts` + `ui/*` (the primitives).
Composes [[component]] · [[lexical]] · [[admin]] · [[config]] · design · [[accessibility]] · theme · [[standard]] · [[trinity]] · [[fractal]] · [[collapse]].
