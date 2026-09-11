---
name: css
description: "Use when a stylesheet is imported, stubbed, or reasoned about in build or typegen — CSS is the form facet of the styling/visual dimension (glyph ⊕ style), a complete diamond atom: each file content-addressed and sealed; Node must recognize .css as a valid diamond surface, never ERR_UNKNOWN_FILE_EXTENSION off-ring escape."
atomPath: css
coordinate: "css · 1/base · 9cdafc45"
contentUuid: "67fb68ae-c9e9-52c3-9ed7-3fa171867bb9"
diamondUuid: "ef96ce4f-f6af-8671-9cb0-d6d4a74632fe"
uuid: "9cdafc45-64c4-8106-b83f-f0d202657149"
horo: 1
typography:
  partition: css
  bondDegree: 56
standards: []
bindings: []
signatures:
  computationUuid: "acc47b6c-9009-821e-b219-1e7ff873d123"
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
      stageUuid: "55d419be-6a7b-8749-9e69-bbd7b449b088"
    - stage: seal
      stageUuid: "d67e65d6-3536-8509-a221-4d4cf5586dd5"
    - stage: uuid
      stageUuid: "f466dd68-1409-8160-8300-7454886f0b78"
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
