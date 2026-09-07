---
name: boundary
description: "Use when computing per-file quantum import/export boundaries — barrel entanglements and export facets derived from source bytes, content-addressed as boundaryUuid; drift is impurity; collapse rewrites deep escapes to raise tamper-cost."
atomPath: "quantum/boundary"
coordinate: "quantum/boundary · 1/base · 64b2636d"
contentUuid: "6e84c9e5-21f7-565d-b251-964d3bd75dcb"
diamondUuid: "fa751fb4-4566-8b47-a427-700da767f92c"
uuid: "64b2636d-5238-898f-8f9b-74626111b4c0"
horo: 1
typography:
  partition: quantum
  bondDegree: 49
standards:
  - "RFC 9562 §5.8 content-uuid — the boundary IS a number computed from content"
bindings: []
signatures:
  computationUuid: "916a78e9-a5bc-8987-88e2-d0d038cd59c8"
  stages:
    - stage: path
      stageUuid: "94f07d21-c4ca-8ade-822f-d6f8c52dc439"
    - stage: trinity
      stageUuid: "ca4f85e7-2664-822d-8c01-fc586cbea690"
    - stage: boundary
      stageUuid: "3b7185df-4336-812b-9150-10e93d6c8af9"
    - stage: links
      stageUuid: "5d3dc670-5c5d-84d9-9cfe-e37c944e3795"
    - stage: horo
      stageUuid: "1d10144a-6304-88c9-bd52-1ef228add715"
    - stage: seal
      stageUuid: "09c46605-1d0e-8fa0-9524-b1ce6d748b31"
    - stage: uuid
      stageUuid: "d4dfe36a-7c06-8e3f-ae0a-b6f338c0e07c"
quantum:
  superposition:
    - aura
    - convention
    - diamond
    - entanglement
    - export
    - exported
    - horo
    - import
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid — the boundary IS a number computed from content"
    - "Use when computing per-file quantum import/export boundaries — barrel entanglements and export facets derived from source bytes, content-addressed as boundaryUuid; drift is impurity; collapse rewrites deep escapes to raise tamper-cost."
    - "boundaries computed from live source via parse/walk — never hand-asserted"
    - "matter-twin:src/quantum/boundary/index.ts"
    - "quantum computed import/export — every file's boundary is algorithmically derived from its source bytes and content-addressed; imports are barrel entanglements only, exports are the public facet; drift between recomputation and stored boundary is impurity; deep escapes must collapse to `@/x` so tamper-cost rises."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "916a78e9-a5bc-8987-88e2-d0d038cd59c8"
    contentUuid: "6e84c9e5-21f7-565d-b251-964d3bd75dcb"
version: 2
---
# quantum/boundary — quantum **computed** import/export

Every file in the corpus has a **computed** boundary — never hand-drawn. The same law as content-[[uuid]], [[horo]] positions, typography bonds: **derived, never authored**.

- **Quantum import (TS)** — entanglement with another atom's public face: each `@/` import that resolves to a dir-with-`index.ts` (the barrel). Deep paths are **escapes** — off-ring entanglement that lowers [[tamper]]-cost ([[tamper]]/import).
- **Quantum export (TS)** — the emitted facet: named/`default`/`export *` symbols an `index.ts` barrel exposes; consumers entangle via `@/x` only ([[convention]]/[[exported]]).
- **Quantum import (SKILL.md)** — outgoing `[[wikilink]]` entanglements (code fences stripped, [[aura]] resolver).
- **Quantum export (SKILL.md)** — the atom's public name (frontmatter `name:` or folder leaf).

**Content-address:** `boundaryUuid = uuid({ filePath, imports: sorted, exports: sorted })`. Recompute on every gate; drift from a stored boundary = hallucination/tamper signal.

**Collapse** — mass-rewrite deep imports → nearest barrel (`planCollapse` · `applyCollapse`), then recompute boundaries; each wave must show escape count falling.

Matter-twin: `src/quantum/boundary/index.ts` (`computeBoundary` · `scanBoundaries` · `boundaryDigest` · `boundaryUuid` · `planCollapse` · `applyCollapse`). Composes [[quantum]] · [[quantum/import]] · [[quantum/export]] · [[tamper]]/import · [[integrity]]/content-uuid · [[aura]] · [[convention]]/import · [[convention]]/exported · [[entanglement]].

**Law — [[law]]: quantum computed import/export — every file's boundary is algorithmically derived from its source bytes and content-addressed; imports are barrel entanglements only, exports are the public facet; drift between recomputation and stored boundary is impurity; deep escapes must collapse to `@/x` so tamper-cost rises.**

@audit boundaries computed from live source via parse/walk — never hand-asserted
@standard RFC 9562 §5.8 content-uuid — the boundary IS a number computed from content

<sub>content-uuid `6e84c9e5-21f7-565d-b251-964d3bd75dcb` · account `quantum/boundary` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
