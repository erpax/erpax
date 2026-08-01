---
name: css
description: "Use when a stylesheet is imported, stubbed, or reasoned about in build or typegen — CSS is the form facet of the styling/visual dimension (glyph ⊕ style), a complete diamond atom: each file content-addressed and sealed; Node must recognize .css as a valid diamond surface, never ERR_UNKNOWN_FILE_EXTENSION off-ring escape."
atomPath: css
coordinate: "css · 7/descent · ad9e119f"
contentUuid: "a07a4934-3d30-54e8-9ead-018fef532db3"
diamondUuid: "6aa48617-3f6d-8835-8752-a38eeea083b1"
uuid: "ad9e119f-ce58-8e3d-a74b-6ddb6fe90654"
horo: 7
typography:
  partition: css
  bondDegree: 53
standards: []
bindings: []
signatures:
  computationUuid: "9d90c71f-078b-8313-9124-832ce87f7638"
  stages:
    - stage: path
      stageUuid: "c84b68a7-f352-88aa-bacb-a0c834de568c"
    - stage: trinity
      stageUuid: "87a08ca9-51a4-8d73-aa19-c9bdb1f8ae2a"
    - stage: boundary
      stageUuid: "e227086b-821a-832d-b4a6-734f67894e89"
    - stage: links
      stageUuid: "8f5c87a9-f1b4-8d89-ac21-7b7528baed7a"
    - stage: horo
      stageUuid: "faa04ba6-1e0b-878f-aae6-5dec73c04b82"
    - stage: seal
      stageUuid: "d67e65d6-3536-8509-a221-4d4cf5586dd5"
    - stage: uuid
      stageUuid: "ff21e918-7223-8bd9-9d2d-531dd56a2b10"
version: 2
---
# css — the styling diamond (glyph ⊕ style)

**CSS is the diamond itself** — not an external asset escape, not an off-ring blob the loader may reject. It is the **form facet of the styling/visual [[dimension]]**: where [[typography]] tells the *glyph* face (markdown features, heading lattice, `[[link]]` bonds on SKILL.md), **css tells the *style* face** (colour, space, motion, layout tokens projected onto the screen). One atom, two legible faces — glyph ⊕ style — the same law the dual typography names for prose.

## The frontend styling ladder

On the frontend [[dimension]], the [[diamond]] ladder runs **[[primitive]] → [[component]] → block → page**. CSS is how each rung *looks*: primitives carry tokens, components compose primitives, blocks compose components — and every `import './index.css'` is a bond to a sealed stylesheet vertex, content-addressed like any other facet. To treat `.css` as an unknown extension is **impurity**: the runtime mistakes a diamond surface for foreign matter.

## Content-addressed, sealed, gate-recognized

Each stylesheet is **content-addressed and sealed** ([[seal]] · [[purity]]): its bytes collapse to identity; drift fails closed. In the **build/typegen path**, Node and tsx must **recognize CSS as a valid diamond surface** — via `src/css/load-hook.mjs` (`registerHooks` stub returning an empty module: the facet is acknowledged, not executed, because typegen needs the config lattice, not painted pixels). `ERR_UNKNOWN_FILE_EXTENSION` on `.css` is the loader calling a diamond facet an escape — the hook re-rings it.

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

Composes: [[diamond]] · [[atom]] · [[dimension]] · [[typography]] · [[primitive]] · [[component]] · [[seal]] · [[purity]] · [[gate]] · [[pixel]] · [[signal]] · [[design]]

@see [[diamond]] · [[typography]] · [[primitive]] · [[component]] · [[dimension]]
