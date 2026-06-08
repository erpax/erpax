---
name: css
description: "Use when a stylesheet is imported, stubbed, or reasoned about in build or typegen — CSS is the form facet of the styling/visual dimension (glyph ⊕ style), a complete diamond atom: each file content-addressed and sealed; Node must recognize .css as a valid diamond surface, never ERR_UNKNOWN_FILE_EXTENSION off-ring escape."
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

Composes: [[diamond]] · [[atom]] · [[dimension]] · [[typography]] · [[primitive]] · [[component]] · [[seal]] · [[purity]] · [[gate]]

@see [[diamond]] · [[typography]] · [[primitive]] · [[component]] · [[dimension]]
