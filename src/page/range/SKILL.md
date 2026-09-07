---
name: range
description: "Use when reasoning about range — renders which slice of a result set is being shown. The component is because it is JSX; this barrel re-exports it so importers name the atom rather than the spelling of its file."
atomPath: "page/range"
coordinate: "page/range · 2/share · 04539613"
contentUuid: "a2c0c45f-654c-55b9-87b4-ab56472f1e10"
diamondUuid: "1bb2d756-8e65-8eb8-a79d-e8af74d02fc3"
uuid: "04539613-0885-8262-92f2-e6e05e7a12fa"
horo: 2
typography:
  partition: page
  bondDegree: 37
standards:
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "ECMA-402 internationalization-api Intl.NumberFormat"
  - "WCAG-2.1 §1.3.1 info-and-relationships"
bindings: []
signatures:
  computationUuid: "a6d923d7-f917-82f3-ad56-20e23b0d12d9"
  stages:
    - stage: path
      stageUuid: "faa0a054-6615-8d52-83b5-e900280b2107"
    - stage: trinity
      stageUuid: "5b1d16c6-e523-8261-bed7-a50d3fcd9f8a"
    - stage: boundary
      stageUuid: "8d38f059-6584-8012-847e-305014f3626a"
    - stage: links
      stageUuid: "08dd9b8c-fc01-8034-bd52-7a8001b50c94"
    - stage: horo
      stageUuid: "cf2a942e-1b7b-8b01-a7bb-0197b6a89d75"
    - stage: seal
      stageUuid: "1eac9f7d-0366-882f-9b1d-4f6c084d19c8"
    - stage: uuid
      stageUuid: "fd86bbd3-c1c4-86f9-a93a-e2d4ddbc9321"
version: 2
---
# page/range — the paginator, exported from a barrel a server module can import

`PageRange` renders which slice of a result set is being shown. The component is `index.tsx`
because it is JSX; this barrel re-exports it so importers name the atom rather than the
spelling of its file.

Composes: [[law]].
