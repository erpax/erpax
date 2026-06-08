---
name: css
description: "Use when a stylesheet is imported, stubbed, or reasoned about in build or typegen — CSS is the form facet of the styling/visual dimension (glyph ⊕ style), a complete diamond atom: each file content-addressed and sealed; Node must recognize .css as a valid diamond surface, never ERR_UNKNOWN_FILE_EXTENSION off-ring escape."
atomPath: css
coordinate: css · 7/descent · 8a1c42f7
contentUuid: "e0ce0973-81f2-567d-bead-835e403885cf"
diamondUuid: "1d5f0bef-9952-8911-af90-81ddd6189b6f"
uuid: "8a1c42f7-c013-85fe-988e-d73c65ff170d"
horo: 7
bonds:
  in:
    - atom
    - component
    - diamond
    - dimension
    - gate
    - law
    - primitive
    - proof
    - purity
    - seal
    - selector
    - trinity
    - typography
  out:
    - atom
    - component
    - diamond
    - dimension
    - gate
    - law
    - primitive
    - proof
    - purity
    - seal
    - selector
    - trinity
    - typography
typography:
  partition: css
  bondDegree: 41
  neighbors:
    - diamond
    - purity
standards: []
bindings: []
neighbors:
  wikilink:
    - atom
    - component
    - diamond
    - dimension
    - gate
    - law
    - primitive
    - proof
    - purity
    - seal
    - trinity
    - typography
  matrix:
    - atom
    - component
    - diamond
    - dimension
    - gate
    - law
    - primitive
    - proof
    - purity
    - seal
    - selector
    - trinity
    - typography
  backlinks:
    - atom
    - component
    - diamond
    - dimension
    - gate
    - law
    - primitive
    - proof
    - purity
    - seal
    - selector
    - trinity
    - typography
signatures:
  computationUuid: "392165c9-e7fe-8c46-9315-a0cb51fe11a8"
  stages:
    - stage: path
      stageUuid: "c84b68a7-f352-88aa-bacb-a0c834de568c"
    - stage: trinity
      stageUuid: "87a08ca9-51a4-8d73-aa19-c9bdb1f8ae2a"
    - stage: boundary
      stageUuid: "4921eda8-4945-8214-a08a-dd8c4d0eaa3b"
    - stage: links
      stageUuid: "0d189a3f-8ee8-8e2a-b4b0-3f7fcb9ca66c"
    - stage: horo
      stageUuid: "e86f6e41-2830-8407-b77a-ceff57beb223"
    - stage: seal
      stageUuid: "6842c71d-1c1d-86de-93e6-b856139a2dc4"
    - stage: uuid
      stageUuid: "b27b468d-3c5b-874c-9f0f-89359fc116c7"
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
