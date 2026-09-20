---
name: export
description: "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
atomPath: "quantum/export"
coordinate: "quantum/export · 5/round · 4ebdec50"
contentUuid: "3b771c40-3341-5af5-8b9a-8cf54c30e55a"
diamondUuid: "0fb56dbe-3735-8e20-a832-58409b6df786"
uuid: "4ebdec50-f6dd-85e6-a61e-60bb17fd2211"
horo: 5
typography:
  partition: quantum
  bondDegree: 12
standards:
  - "an atom's only public code-face is index.ts"
bindings: []
signatures:
  computationUuid: "fe062d67-5ad5-8fef-9e56-9eb57acf773a"
  stages:
    - stage: path
      stageUuid: "dc07680b-0eb6-8c39-a896-fe69cdfa6db4"
    - stage: trinity
      stageUuid: "83e60ebe-4787-844e-9a0c-0a64ddc8a660"
    - stage: boundary
      stageUuid: "e7830ad1-8831-81a9-9663-e338b443d268"
    - stage: links
      stageUuid: "be8902dc-f15e-8192-a350-3e69d8d83e2c"
    - stage: horo
      stageUuid: "00dd588e-fa1a-89e7-b315-2e09fefba00c"
    - stage: seal
      stageUuid: "3bf68295-0002-88a6-af26-a464f6020ba0"
    - stage: uuid
      stageUuid: "76c1234f-d1d1-8ac5-a776-9aec67b255c0"
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
    computationUuid: "fe062d67-5ad5-8fef-9e56-9eb57acf773a"
    contentUuid: "3b771c40-3341-5af5-8b9a-8cf54c30e55a"
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

<sub>content-uuid `3b771c40-3341-5af5-8b9a-8cf54c30e55a` · account `quantum/export` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
