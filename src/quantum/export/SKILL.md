---
name: export
description: "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
atomPath: quantum/export
coordinate: quantum/export · 7/descent · df7e40f1
contentUuid: "bc939934-990b-582c-b207-83d82468eedb"
diamondUuid: "df26c949-b3cd-8ada-8f16-27e0a093a216"
uuid: "df7e40f1-dbe2-8842-bdc2-8a5868426f93"
horo: 7
bonds:
  in:
    - law
    - quantum
  out:
    - law
typography:
  partition: quantum
  bondDegree: 12
  neighbors:
    - quantum/boundary
standards:
  - "an atom's only public code-face is index.ts"
bindings: []
neighbors:
  wikilink:
    - boundary
    - convention
    - duality
    - entanglement
    - exported
    - law
    - tamper
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "fa2249da-2cf7-872a-ba86-da27e1c7dfb2"
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
      stageUuid: "663c5aa1-f43d-846c-9580-db31104c5f14"
    - stage: seal
      stageUuid: "3bf68295-0002-88a6-af26-a464f6020ba0"
    - stage: uuid
      stageUuid: "806e941d-624f-8b19-ac81-3d6c09991e56"
quantum:
  superposition:
    - law
    - quantum
    - superposition
  collapse:
    - "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
    - "an atom's only public code-face is index.ts"
    - export set = parseTsExports / skillExportName — computed live
    - "quantum computed export — the public facet is algorithmically derived from source and content-addressed; every cross-atom symbol must be reachable from the atom's index barrel."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "fa2249da-2cf7-872a-ba86-da27e1c7dfb2"
    contentUuid: "bc939934-990b-582c-b207-83d82468eedb"
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

<sub>content-uuid `bc939934-990b-582c-b207-83d82468eedb` · account `quantum/export` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
