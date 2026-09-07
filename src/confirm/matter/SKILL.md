---
name: matter
description: "Use when confirming a real change rather than the uuid substrate — the payload ⊗ vitepress ⊗ build lane, scoped to the files a turn touched or --full across the corpus."
atomPath: "confirm/matter"
coordinate: "confirm/matter · 4/weave · 826588d6"
contentUuid: "b16e2209-24ad-5388-8ef7-da57b16aa05e"
diamondUuid: "ca1060b1-c54f-890d-bfcf-1b70dbed48d4"
uuid: "826588d6-7f80-89cd-9aa4-7652ad480e5d"
horo: 4
typography:
  partition: confirm
  bondDegree: 109
standards: []
bindings: []
signatures:
  computationUuid: "d99c2097-2024-855e-8e09-5e39d7a6dfc0"
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
      stageUuid: "c38393be-02d9-81fb-a5bd-d7e34afb3ca3"
    - stage: seal
      stageUuid: "a372aabd-0f90-84ee-b03e-0220437f71a0"
    - stage: uuid
      stageUuid: "7bc57d2e-fd4c-8286-a692-e64c1be8d546"
version: 2
---
# confirm/matter — the lane that needs the app

[[confirm]]/uuid proves the substrate without Payload. This is the other half: the checks that only mean something against the built application — Payload types, the VitePress docs twin, the build gate — run scoped to the files a turn actually touched, or `--full` across the corpus.

Scoping is the point. A hook that re-checked everything on every write would cost more than the defect it catches, and a gate that costs too much is a gate that gets skipped ([[rules]]). `scopeFiles` narrows to the changeset; `--full` is the deliberate whole-corpus pass the push gate runs.

`outsideMatter` refuses to judge files outside the repo root (a temp path is not this corpus), and `touchesStandardBanner` decides whether the statutory index must be re-emitted — the citation trace has to stay resolvable ([[rules]]/reference).

Composes: [[confirm]] · [[gate]] · [[rules]].
