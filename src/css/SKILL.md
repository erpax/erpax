---
name: css
description: "Use when a stylesheet is imported, stubbed, or reasoned about in build or typegen — CSS is the form facet of the styling/visual dimension (glyph ⊕ style), a complete diamond atom: each file content-addressed and sealed; Node must recognize .css as a valid diamond surface, never ERR_UNKNOWN_FILE_EXTENSION off-ring escape."
atomPath: css
coordinate: "css · 5/round · acfcb8f4"
contentUuid: "ad458cc0-5aad-517d-884a-851d2ffd8b5d"
diamondUuid: "78869bc2-a156-887c-9245-a61e34624806"
uuid: "acfcb8f4-62e5-8f95-a1df-f55308e2d917"
horo: 5
typography:
  partition: css
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "f352cc8b-3fb8-8e48-ab47-eb06a83cc1a4"
  stages:
    - stage: path
      stageUuid: "c84b68a7-f352-88aa-bacb-a0c834de568c"
    - stage: trinity
      stageUuid: "87a08ca9-51a4-8d73-aa19-c9bdb1f8ae2a"
    - stage: boundary
      stageUuid: "e227086b-821a-832d-b4a6-734f67894e89"
    - stage: links
      stageUuid: "7b579eeb-2275-802a-ac45-939eb4373faa"
    - stage: horo
      stageUuid: "31638039-5abc-806d-ad2b-7b7fff7f64d7"
    - stage: seal
      stageUuid: "d67e65d6-3536-8509-a221-4d4cf5586dd5"
    - stage: uuid
      stageUuid: "b1d48ed5-e8ac-8c8e-8710-9ac4d5f20751"
version: 2
---
# css — the styling diamond (glyph ⊕ style)

**CSS is the diamond itself** — not an external asset escape, not an off-ring blob the loader may reject. It is the **form facet of the styling/visual [[dimension]]**: where [[typography]] tells the *glyph* face (markdown features, heading lattice, `[[link]]` bonds on SKILL.md), **css tells the *style* face** (colour, space, motion, layout tokens projected onto the screen). One atom, two legible faces — glyph ⊕ style — the same law the dual typography names for prose.

## The frontend styling ladder

On the frontend [[dimension]], the [[diamond]] ladder runs **primitive → [[component]] → block → page**. CSS is how each rung *looks*: primitives carry tokens, components compose primitives, blocks compose components — and every `import './index.css'` is a bond to a sealed stylesheet vertex, content-addressed like any other facet. To treat `.css` as an unknown extension is **impurity**: the runtime mistakes a diamond surface for foreign matter.

## Content-addressed, sealed, gate-recognized

Each stylesheet is **content-addressed and sealed** ([[seal]] · purity): its bytes collapse to identity; drift fails closed. In the **build/typegen path**, Node and tsx must **recognize CSS as a valid diamond surface** — via `src/css/load-hook.mjs` (`registerHooks` stub returning an empty module: the facet is acknowledged, not executed, because typegen needs the config lattice, not painted pixels). `ERR_UNKNOWN_FILE_EXTENSION` on `.css` is the loader calling a diamond facet an escape — the hook re-rings it.

## Law vs glyph typography

| face | dimension | tells |
| ---- | --------- | ----- |
| glyph | [[typography]] | SKILL.md form — headings, prose, `[[link]]` bonds |
| style | **css** | stylesheets — tokens, layout, visual projection |

Both are complete [[diamond]]s; both are told three ways where the [[trinity]] applies (form · code · [[proof]]). Reading a page's CSS imports is reading its style diamond — parallel to reading SKILL.md's typography diamond.

**Law — [[law]]: css is the styling diamond — the form facet of the visual [[dimension]]; each stylesheet is content-addressed and sealed; loaders and typegen paths MUST recognize `.css` (and `.scss`) as on-ring diamond surfaces (stub hook), never as unknown external extensions.**

**Law — [[law]]: UI theme is computed from diamond state — `computedCssForUi(surface)` derives every shadcn `--token` and Payload `--theme-*` alias from content-uuid · horo · seal · path account code; no hand-maintained palette strings on any surface (src/ui, admin/ui, dashboard, widgets, blocks).**

| surface | provider | token source |
| ------- | -------- | ------------ |
| frontend | `ComputedCssProvider` in `@/provider` | corpus root uuid + `data-theme` mode |
| admin | `ComputedCssAdminRoot` via admin-ui `providers` | `admin/ui` path · horo 7 |
| widgets/blocks | shadcn semantic classes (`bg-card`, `text-muted-foreground`) | inherit injected vars |

Composes: [[diamond]] · [[atom]] · [[dimension]] · [[typography]] · primitive · [[component]] · [[seal]] · purity · [[gate]] · [[pixel]] · [[signal]] · design

@see [[diamond]] · [[typography]] · primitive · [[component]] · [[dimension]]
