---
name: components
description: "Use when building or debugging the erpax React UI — server-component-first Next.js App Router views, Lexical/Payload block renderers, admin panels, dashboards, widgets, and shared primitives — the society's FACE, the rendered surface where matter meets the eye."
atomPath: components
coordinate: components · 1/base · df44f5d5
contentUuid: "4f9156a0-575b-50cb-9f14-095cf6a389ac"
diamondUuid: "5d6dd7ba-27ee-8570-b9bb-8b56736b4201"
uuid: "df44f5d5-6bb7-8a2e-8cb2-db2edd618901"
horo: 1
bonds:
  in:
    - accessibility
    - admin
    - collapse
    - component
    - config
    - dashboard
    - design
    - fractal
    - lexical
    - standard
    - theme
    - trinity
  out:
    - accessibility
    - admin
    - collapse
    - component
    - config
    - dashboard
    - design
    - fractal
    - lexical
    - standard
    - theme
    - trinity
typography:
  partition: components
  bondDegree: 36
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accessibility
    - admin
    - collapse
    - component
    - config
    - design
    - fractal
    - lexical
    - standard
    - theme
    - trinity
  matrix:
    - accessibility
    - admin
    - collapse
    - component
    - config
    - dashboard
    - design
    - fractal
    - lexical
    - standard
    - theme
    - trinity
  backlinks:
    - accessibility
    - admin
    - collapse
    - component
    - config
    - dashboard
    - design
    - fractal
    - lexical
    - standard
    - theme
    - trinity
signatures:
  computationUuid: "9a69a311-c99c-8d01-a112-32adc71f7a59"
  stages:
    - stage: path
      stageUuid: "a6038da7-fc5c-87b0-890e-570b9df1b648"
    - stage: trinity
      stageUuid: "2a1b3529-205a-8629-b287-4fd2cb08dd7e"
    - stage: boundary
      stageUuid: "5756408c-1432-86c6-9511-37ebb71ab616"
    - stage: links
      stageUuid: "70ca398f-7277-8349-b8a0-7485d5125d89"
    - stage: horo
      stageUuid: "7f9fe625-631b-8c03-adfc-dced98f7f853"
    - stage: seal
      stageUuid: "37151f00-5ed4-8032-8489-ac12400c6980"
    - stage: uuid
      stageUuid: "ad0b34e7-e585-8341-b413-262705046940"
version: 2
---
# components — the rendered face of the society

Components is the React library that renders erpax to the eye. **Server-component-first** (Next.js App Router): a leaf is a server component by default; `'use client'` marks an explicit client boundary only where interactivity demands it (44 of ~160 files). The matter is the JSX — do NOT restate it here; this page INDEXES it. The library spans Lexical/Payload **block** renderers (`blocks/`, `heros/`), **admin** panels (`admin/`, `widgets/`, `Dashboard.tsx`), document chrome (`Header/`, `Footer/`, `Navigation.tsx`), business **chains** (`chains/`), and shared primitives (`shared/` — `Money`, `AuditedTimestamp`, `AddressBlock`; `ui/` — button/card/input).

**The law is the README, not per-file repetition.** `src/components/README.md` is this organ's constitution: the cross-cutting standards (W3C HTML5, WAI-ARIA 1.2, schema.org, BCP-47, WCAG 2.1 AA, EN 301 549, EAA) apply to **every** file in the tree; a `@standard`/`@compliance` JSDoc banner appears ONLY at an entry point (a block `config.ts`, a component root) and ONLY when it carries a standard *beyond* that list (78 files do). A leaf inherits the tree's standards silently — this is [[collapse]] at the doc scale: one declaration governs the whole. Naming is fixed (`Foo/config.ts` block def · `Foo/index.tsx` server · `Foo/Component.client.tsx` client boundary).

Matter-twin: `src/components/README.md` (the law) · `blocks/*/config.ts` + `RenderBlocks.tsx` (the [[lexical]] block renderers) · `Dashboard.tsx` + `widgets/*` (the admin face) · `shared/index.ts` + `ui/*` (the primitives).
Composes [[component]] · [[lexical]] · [[admin]] · [[config]] · [[design]] · [[accessibility]] · [[theme]] · [[standard]] · [[trinity]] · [[fractal]] · [[collapse]].
