---
name: matter
description: "Use when confirming a real change rather than the uuid substrate — the payload ⊗ vitepress ⊗ build lane, scoped to the files a turn touched or --full across the corpus."
atomPath: "confirm/matter"
coordinate: "confirm/matter · 4/weave · cfd97e71"
contentUuid: "2f83d415-b1cd-5bd5-8502-5c21fc4453a2"
diamondUuid: "4dfbcc27-8c4b-8161-8c97-c27bb5929607"
uuid: "cfd97e71-f26c-8822-8dff-1d1da2251307"
horo: 4
typography:
  partition: confirm
  bondDegree: 109
standards: []
bindings: []
signatures:
  computationUuid: "14574fee-9167-80b6-9497-5f6526d395bb"
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
      stageUuid: "d510ad29-4024-8f97-b521-34b21091e4d0"
    - stage: seal
      stageUuid: "a372aabd-0f90-84ee-b03e-0220437f71a0"
    - stage: uuid
      stageUuid: "8ead2019-d561-8bd4-81d8-95469eb24517"
version: 2
---
# confirm/matter — the lane that needs the app

[[confirm]]/uuid proves the substrate without Payload. This is the other half: the checks that only mean something against the built application — Payload types, the VitePress docs twin, the build gate — run scoped to the files a turn actually touched, or `--full` across the corpus.

Scoping is the point. A hook that re-checked everything on every write would cost more than the defect it catches, and a gate that costs too much is a gate that gets skipped ([[rules]]). `scopeFiles` narrows to the changeset; `--full` is the deliberate whole-corpus pass the push gate runs.

`outsideMatter` refuses to judge files outside the repo root (a temp path is not this corpus), and `touchesStandardBanner` decides whether the statutory index must be re-emitted — the citation trace has to stay resolvable ([[rules]]/reference).

Composes: [[confirm]] · [[gate]] · [[rules]].
