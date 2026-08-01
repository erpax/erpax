---
name: export
description: "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
atomPath: "quantum/export"
coordinate: "quantum/export · 1/base · bee6db07"
contentUuid: "459f267e-11c3-53c6-b8a0-84580416919d"
diamondUuid: "7718c77f-3529-8302-b46a-ae964d96b094"
uuid: "bee6db07-c9dc-8b64-9bda-aa897e2b807b"
horo: 1
typography:
  partition: quantum
  bondDegree: 12
standards:
  - "an atom's only public code-face is index.ts"
bindings: []
signatures:
  computationUuid: "0aa435da-d4a9-8b41-bb56-12d671a06b5b"
  stages:
    - stage: path
      stageUuid: "dc07680b-0eb6-8c39-a896-fe69cdfa6db4"
    - stage: trinity
      stageUuid: "83e60ebe-4787-844e-9a0c-0a64ddc8a660"
    - stage: boundary
      stageUuid: "65b210ee-e044-8e13-9c40-b78f7d82fd7b"
    - stage: links
      stageUuid: "be8902dc-f15e-8192-a350-3e69d8d83e2c"
    - stage: horo
      stageUuid: "6203ed2c-bfc3-8031-818d-262687b0c4b0"
    - stage: seal
      stageUuid: "3bf68295-0002-88a6-af26-a464f6020ba0"
    - stage: uuid
      stageUuid: "c030ffc6-07a7-819e-92be-b5fe08193f9d"
quantum:
  superposition:
    - law
    - quantum
    - superposition
  collapse:
    - "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
    - "an atom's only public code-face is index.ts"
    - "export set = parseTsExports / skillExportName — computed live"
    - "quantum computed export — the public facet is algorithmically derived from source and content-addressed; every cross-atom symbol must be reachable from the atom's index barrel."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "0aa435da-d4a9-8b41-bb56-12d671a06b5b"
    contentUuid: "459f267e-11c3-53c6-b8a0-84580416919d"
version: 2
---
# quantum/export — quantum **computed** export

The quantum twin of [[exported]] ([[convention]]/exported): **export is what this file/diamond exposes to the lattice** — the `index.ts` re-exports (code facet), the SKILL.md atom name (form facet), the test surface.

**Computed, never authored:** `parseTsExports` derives named/`default`/`export *` symbols from TS; SKILL export = frontmatter `name:` or folder leaf. The boundary organ hashes `{ filePath, imports, exports }` into `boundaryUuid` — same bytes ⇒ same address; change one export ⇒ boundary flips.

An importer can entangle at `@/x` only if this atom **exports** through its index what is consumed ([[duality]] with quantum import).

Composes [[quantum/boundary]] · [[convention]]/exported · [[tamper]]/import · [[entanglement]].

**Law — [[law]]: quantum computed export — the public facet is algorithmically derived from source and content-addressed; every cross-atom symbol must be reachable from the atom's index barrel.**

@audit export set = parseTsExports / skillExportName — computed live
@standard an atom's only public code-face is index.ts

<sub>content-uuid `459f267e-11c3-53c6-b8a0-84580416919d` · account `quantum/export` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
