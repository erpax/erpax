---
name: export
description: "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
atomPath: "quantum/export"
coordinate: "quantum/export · 2/share · a48a543a"
contentUuid: "6830353a-8d66-55cf-b48a-de4b8a8e504e"
diamondUuid: "4b963dca-b139-80eb-9dd2-15c554ed87ae"
uuid: "a48a543a-0cc0-800c-ba48-d89434d9d991"
horo: 2
typography:
  partition: quantum
  bondDegree: 12
standards:
  - "an atom's only public code-face is index.ts"
bindings: []
signatures:
  computationUuid: "4d7a2ef8-ddf3-8baa-949c-9fa6e796066e"
  stages:
    - stage: path
      stageUuid: "dc07680b-0eb6-8c39-a896-fe69cdfa6db4"
    - stage: trinity
      stageUuid: "83e60ebe-4787-844e-9a0c-0a64ddc8a660"
    - stage: boundary
      stageUuid: "56968401-ef7c-8369-b499-325456091862"
    - stage: links
      stageUuid: "be8902dc-f15e-8192-a350-3e69d8d83e2c"
    - stage: horo
      stageUuid: "c2e9914f-6f67-8daf-bbd4-778be9fffe48"
    - stage: seal
      stageUuid: "3bf68295-0002-88a6-af26-a464f6020ba0"
    - stage: uuid
      stageUuid: "48d486f6-2d0d-8ff6-a53c-61ae26dc4172"
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
    computationUuid: "4d7a2ef8-ddf3-8baa-949c-9fa6e796066e"
    contentUuid: "6830353a-8d66-55cf-b48a-de4b8a8e504e"
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

<sub>content-uuid `6830353a-8d66-55cf-b48a-de4b8a8e504e` · account `quantum/export` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
