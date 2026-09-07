---
name: range
description: "Use when reasoning about range — renders which slice of a result set is being shown. The component is because it is JSX; this barrel re-exports it so importers name the atom rather than the spelling of its file."
atomPath: "page/range"
coordinate: "page/range · 2/share · dc3346f8"
contentUuid: "19897cf9-4f48-524f-ad50-c5d295bfbe9a"
diamondUuid: "0ab6a166-d01b-8c6f-82d1-9d261e563bf3"
uuid: "dc3346f8-dbef-87f0-aab7-4a855dd31093"
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
  computationUuid: "ce92404e-93a2-8c05-8668-8c6d66033572"
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
      stageUuid: "63ed1eaf-24cf-8675-9ce3-a1eaa2795e04"
    - stage: seal
      stageUuid: "1eac9f7d-0366-882f-9b1d-4f6c084d19c8"
    - stage: uuid
      stageUuid: "d7ae3fc4-fdcf-8799-8e96-bdf6c448acf8"
version: 2
---
# page/range — the paginator, exported from a barrel a server module can import

`PageRange` renders which slice of a result set is being shown. The component is `index.tsx`
because it is JSX; this barrel re-exports it so importers name the atom rather than the
spelling of its file.

Composes: [[law]].
