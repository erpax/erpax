---
name: matter
description: "Use when confirming a real change rather than the uuid substrate — the payload ⊗ vitepress ⊗ build lane, scoped to the files a turn touched or --full across the corpus."
atomPath: "confirm/matter"
coordinate: "confirm/matter · 7/descent · 427c50ac"
contentUuid: "dc19abd7-5a12-5644-a031-718f69b485f0"
diamondUuid: "dd9edd88-a954-817f-b44a-35d94721aade"
uuid: "427c50ac-1ad4-81d2-9428-0486675f6ab9"
horo: 7
typography:
  partition: confirm
  bondDegree: 106
standards: []
bindings: []
signatures:
  computationUuid: "1894689d-ed2f-8cfe-bb43-ea9f9361d35c"
  stages:
    - stage: path
      stageUuid: "2043f170-53e2-8735-b119-c92da5208b2a"
    - stage: trinity
      stageUuid: "e2d9ef13-935c-85ad-8153-ad956a783767"
    - stage: boundary
      stageUuid: "4a321eeb-2686-8375-bae3-8256c4735472"
    - stage: links
      stageUuid: "cc08238a-bb1e-87d8-bba6-433ca945f9ff"
    - stage: horo
      stageUuid: "c6b88654-6da8-8e03-86d8-7fe511896737"
    - stage: seal
      stageUuid: "a372aabd-0f90-84ee-b03e-0220437f71a0"
    - stage: uuid
      stageUuid: "27b28aa8-5fad-8769-9e3d-e060293e57e2"
version: 2
---
# confirm/matter — the lane that needs the app

[[confirm]]/uuid proves the substrate without Payload. This is the other half: the checks that only mean something against the built application — Payload types, the VitePress docs twin, the build gate — run scoped to the files a turn actually touched, or `--full` across the corpus.

Scoping is the point. A hook that re-checked everything on every write would cost more than the defect it catches, and a gate that costs too much is a gate that gets skipped ([[rules]]). `scopeFiles` narrows to the changeset; `--full` is the deliberate whole-corpus pass the push gate runs.

`outsideMatter` refuses to judge files outside the repo root (a temp path is not this corpus), and `touchesStandardBanner` decides whether the statutory index must be re-emitted — the citation trace has to stay resolvable ([[rules]]/reference).

Composes: [[confirm]] · [[gate]] · [[rules]].
