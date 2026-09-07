---
name: range
description: "Use when reasoning about range — renders which slice of a result set is being shown. The component is because it is JSX; this barrel re-exports it so importers name the atom rather than the spelling of its file."
atomPath: "page/range"
coordinate: "page/range · 5/round · e93d8e56"
contentUuid: "30fdb81a-df18-5da5-9425-1e45e5e6033f"
diamondUuid: "f23b6b64-54e5-85ab-bd3a-efe4b1c36c9a"
uuid: "e93d8e56-c820-8f61-9d44-a28bcd5de273"
horo: 5
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
  computationUuid: "51b7dd52-c83b-853d-8051-d94810071b46"
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
      stageUuid: "2bd0f8b6-8ac5-8d80-9cad-4e0749398f2b"
    - stage: seal
      stageUuid: "1eac9f7d-0366-882f-9b1d-4f6c084d19c8"
    - stage: uuid
      stageUuid: "5b7305a7-be85-8c2f-8c4b-33c6f122d67b"
version: 2
---
# page/range — the paginator, exported from a barrel a server module can import

`PageRange` renders which slice of a result set is being shown. The component is `index.tsx`
because it is JSX; this barrel re-exports it so importers name the atom rather than the
spelling of its file.

Composes: [[law]].
