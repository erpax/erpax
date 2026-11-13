---
name: export
description: "Use when reasoning about quantum computed export — each file's public facet (index.ts symbols, SKILL atom name) derived from source, content-addressed; the producer dual of quantum import."
atomPath: "quantum/export"
coordinate: "quantum/export · 7/descent · 0c4a0f73"
contentUuid: "e081bbb3-cbc0-56f3-9568-ab348890a26c"
diamondUuid: "bb959fa0-ad06-88a6-802d-1856a7d235bb"
uuid: "0c4a0f73-a6a1-850a-8848-62b351df4ed1"
horo: 7
typography:
  partition: quantum
  bondDegree: 11
standards:
  - "an atom's only public code-face is index.ts"
bindings: []
signatures:
  computationUuid: "c9e8c63b-6d80-8681-b4af-3df7bba0d976"
  stages:
    - stage: path
      stageUuid: "dc07680b-0eb6-8c39-a896-fe69cdfa6db4"
    - stage: trinity
      stageUuid: "83e60ebe-4787-844e-9a0c-0a64ddc8a660"
    - stage: boundary
      stageUuid: "e7830ad1-8831-81a9-9663-e338b443d268"
    - stage: links
      stageUuid: "73987cc0-a90d-8664-94d4-4eecca3c013f"
    - stage: horo
      stageUuid: "ca02bdb0-b03b-88c7-986c-d50705fb9e84"
    - stage: seal
      stageUuid: "3bf68295-0002-88a6-af26-a464f6020ba0"
    - stage: uuid
      stageUuid: "70fc1957-766a-86c7-8d31-fbeb69012655"
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
    computationUuid: "c9e8c63b-6d80-8681-b4af-3df7bba0d976"
    contentUuid: "e081bbb3-cbc0-56f3-9568-ab348890a26c"
version: 2
---
# quantum/export — quantum **computed** export

The quantum twin of exported ([[convention]]/exported): **export is what this file/diamond exposes to the lattice** — the `index.ts` re-exports (code facet), the SKILL.md atom name (form facet), the test surface.

**Computed, never authored:** `parseTsExports` derives named/`default`/`export *` symbols from TS; SKILL export = frontmatter `name:` or folder leaf. The boundary organ hashes `{ filePath, imports, exports }` into `boundaryUuid` — same bytes ⇒ same address; change one export ⇒ boundary flips.

An importer can entangle at `@/x` only if this atom **exports** through its index what is consumed ([[duality]] with quantum import).

Composes [[quantum/boundary]] · [[convention]]/exported · [[tamper]]/import · [[entanglement]].

**Law — [[law]]: quantum computed export — the public facet is algorithmically derived from source and content-addressed; every cross-atom symbol must be reachable from the atom's index barrel.**

@audit export set = parseTsExports / skillExportName — computed live
@standard an atom's only public code-face is index.ts

<sub>content-uuid `e081bbb3-cbc0-56f3-9568-ab348890a26c` · account `quantum/export` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
