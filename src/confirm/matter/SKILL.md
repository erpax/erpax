---
name: matter
description: "Use when confirming a real change rather than the uuid substrate — the payload ⊗ vitepress ⊗ build lane, scoped to the files a turn touched or --full across the corpus."
atomPath: "confirm/matter"
coordinate: "confirm/matter · 2/share · 2dea2ab0"
contentUuid: "44157958-950b-5b10-8193-f69c743448e5"
diamondUuid: "1e790a04-d5d1-8d98-bd94-67283ec30510"
uuid: "2dea2ab0-c6e4-8977-b1a7-e46ba9dc38f8"
horo: 2
typography:
  partition: confirm
  bondDegree: 109
standards: []
bindings: []
signatures:
  computationUuid: "f7ab90bc-d540-868e-82e0-28efd23ecf85"
  stages:
    - stage: path
      stageUuid: "2043f170-53e2-8735-b119-c92da5208b2a"
    - stage: trinity
      stageUuid: "e2d9ef13-935c-85ad-8153-ad956a783767"
    - stage: boundary
      stageUuid: "1a1528f7-6d44-8996-a00f-19e5477a14b0"
    - stage: links
      stageUuid: "cc08238a-bb1e-87d8-bba6-433ca945f9ff"
    - stage: horo
      stageUuid: "a2239d07-d987-8ca6-9329-409b60889afe"
    - stage: seal
      stageUuid: "a372aabd-0f90-84ee-b03e-0220437f71a0"
    - stage: uuid
      stageUuid: "76e30d7e-8053-8365-848f-90bcfd96a94b"
version: 2
---
# confirm/matter — the lane that needs the app

[[confirm]]/uuid proves the substrate without Payload. This is the other half: the checks that only mean something against the built application — Payload types, the VitePress docs twin, the build gate — run scoped to the files a turn actually touched, or `--full` across the corpus.

Scoping is the point. A hook that re-checked everything on every write would cost more than the defect it catches, and a gate that costs too much is a gate that gets skipped ([[rules]]). `scopeFiles` narrows to the changeset; `--full` is the deliberate whole-corpus pass the push gate runs.

`outsideMatter` refuses to judge files outside the repo root (a temp path is not this corpus), and `touchesStandardBanner` decides whether the statutory index must be re-emitted — the citation trace has to stay resolvable ([[rules]]/reference).

Composes: [[confirm]] · [[gate]] · [[rules]].
