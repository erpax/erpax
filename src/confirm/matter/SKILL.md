---
name: matter
description: "Use when confirming a real change rather than the uuid substrate — the payload ⊗ vitepress ⊗ build lane, scoped to the files a turn touched or --full across the corpus."
atomPath: "confirm/matter"
coordinate: "confirm/matter · 7/descent · 427c50ac"
contentUuid: "01b907fd-875e-5def-a6f5-209a1a16c050"
diamondUuid: "efe3bb0a-6825-852d-9857-52c4d2953161"
uuid: "427c50ac-1ad4-81d2-9428-0486675f6ab9"
horo: 7
typography:
  partition: confirm
  bondDegree: 106
standards: []
bindings: []
signatures:
  computationUuid: "c58f0296-ae0b-87b3-9afa-cd2f8e663afe"
  stages:
    - stage: path
      stageUuid: "2043f170-53e2-8735-b119-c92da5208b2a"
    - stage: trinity
      stageUuid: "e2d9ef13-935c-85ad-8153-ad956a783767"
    - stage: boundary
      stageUuid: "1349347d-939c-8399-b240-4154633d818c"
    - stage: links
      stageUuid: "cc08238a-bb1e-87d8-bba6-433ca945f9ff"
    - stage: horo
      stageUuid: "c6b88654-6da8-8e03-86d8-7fe511896737"
    - stage: seal
      stageUuid: "a372aabd-0f90-84ee-b03e-0220437f71a0"
    - stage: uuid
      stageUuid: "e2e76b64-caba-8199-9f1e-3bdf7a5f2717"
version: 2
---
# confirm/matter — the lane that needs the app

[[confirm]]/uuid proves the substrate without Payload. This is the other half: the checks that only mean something against the built application — Payload types, the VitePress docs twin, the build gate — run scoped to the files a turn actually touched, or `--full` across the corpus.

Scoping is the point. A hook that re-checked everything on every write would cost more than the defect it catches, and a gate that costs too much is a gate that gets skipped ([[rules]]). `scopeFiles` narrows to the changeset; `--full` is the deliberate whole-corpus pass the push gate runs.

`outsideMatter` refuses to judge files outside the repo root (a temp path is not this corpus), and `touchesStandardBanner` decides whether the statutory index must be re-emitted — the citation trace has to stay resolvable ([[rules]]/reference).

Composes: [[confirm]] · [[gate]] · [[rules]].
