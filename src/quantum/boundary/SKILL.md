---
name: boundary
description: "Use when computing per-file quantum import/export boundaries — barrel entanglements and export facets derived from source bytes, content-addressed as boundaryUuid; drift is impurity; collapse rewrites deep escapes to raise tamper-cost."
atomPath: quantum/boundary
coordinate: quantum/boundary · 7/descent · ef382263
contentUuid: "9d24a0a2-2f6d-5adb-adf1-94c3f34792fd"
diamondUuid: "4b283bd7-1994-808c-ab8e-cab604dbcbc2"
uuid: "ef382263-1295-83c3-bec9-1382e2315450"
horo: 7
bonds:
  in:
    - aura
    - convention
    - diamond
    - entanglement
    - export
    - exported
    - horo
    - import
    - integrity
    - law
    - method
    - quantum
    - tamper
    - text
    - uuid
  out:
    - aura
    - convention
    - diamond
    - entanglement
    - export
    - exported
    - horo
    - import
    - integrity
    - law
    - method
    - quantum
    - tamper
    - text
    - uuid
typography:
  partition: quantum
  bondDegree: 49
  neighbors:
    - aura
    - tamper/import
standards:
  - "RFC 9562 §5.8 content-uuid — the boundary IS a number computed from content"
bindings: []
neighbors:
  wikilink:
    - aura
    - convention
    - entanglement
    - export
    - exported
    - horo
    - import
    - integrity
    - law
    - quantum
    - tamper
    - uuid
  matrix:
    - aura
    - convention
    - diamond
    - entanglement
    - export
    - exported
    - horo
    - import
    - integrity
    - law
    - method
    - quantum
    - tamper
    - text
    - uuid
  backlinks:
    - aura
    - convention
    - diamond
    - entanglement
    - export
    - exported
    - horo
    - import
    - integrity
    - law
    - method
    - quantum
    - tamper
    - text
    - uuid
signatures:
  computationUuid: "a2e81544-0ea7-87b9-afc0-7a62d4a9b50b"
  stages:
    - stage: path
      stageUuid: "94f07d21-c4ca-8ade-822f-d6f8c52dc439"
    - stage: trinity
      stageUuid: "ca4f85e7-2664-822d-8c01-fc586cbea690"
    - stage: boundary
      stageUuid: "58a956b8-d27b-8f2b-bcc7-b480f09368d3"
    - stage: links
      stageUuid: "5d3dc670-5c5d-84d9-9cfe-e37c944e3795"
    - stage: horo
      stageUuid: "241a9e17-7958-84fd-be9a-030d2f7f5e7c"
    - stage: seal
      stageUuid: "09c46605-1d0e-8fa0-9524-b1ce6d748b31"
    - stage: uuid
      stageUuid: "1ec72dc3-16e5-8e6b-abdc-9d2f40f3c536"
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
    computationUuid: "a2e81544-0ea7-87b9-afc0-7a62d4a9b50b"
    contentUuid: "9d24a0a2-2f6d-5adb-adf1-94c3f34792fd"
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

<sub>content-uuid `9d24a0a2-2f6d-5adb-adf1-94c3f34792fd` · account `quantum/boundary` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
