---
name: range
description: "Use when reasoning about range — renders which slice of a result set is being shown. The component is because it is JSX; this barrel re-exports it so importers name the atom rather than the spelling of its file."
atomPath: "page/range"
coordinate: "page/range · 4/weave · df7285b4"
contentUuid: "3b307ff3-6c27-56e7-acb6-c1a289ee064a"
diamondUuid: "3bb1c6a9-f801-8961-b3b3-0fb2fcd76567"
uuid: "df7285b4-3569-80d8-a7d2-3093333c934e"
horo: 4
typography:
  partition: page
  bondDegree: 3
standards:
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "ECMA-402 internationalization-api Intl.NumberFormat"
  - "WCAG-2.1 §1.3.1 info-and-relationships"
bindings: []
signatures:
  computationUuid: "c278b179-f2b3-82fd-b40b-2da337ecb042"
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
      stageUuid: "d3f65a46-7647-8040-a672-4f4644425885"
    - stage: seal
      stageUuid: "1eac9f7d-0366-882f-9b1d-4f6c084d19c8"
    - stage: uuid
      stageUuid: "a1b65136-4e50-8b9f-9209-f09b6bd7798b"
version: 2
---
# page/range — the paginator, exported from a barrel a server module can import

`PageRange` renders which slice of a result set is being shown. The component is `index.tsx`
because it is JSX; this barrel re-exports it so importers name the atom rather than the
spelling of its file.

Composes: [[law]].
