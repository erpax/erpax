---
name: range
description: "Use when reasoning about range — renders which slice of a result set is being shown. The component is because it is JSX; this barrel re-exports it so importers name the atom rather than the spelling of its file."
atomPath: "page/range"
coordinate: "page/range · 2/share · ee8073b2"
contentUuid: "1a89c4a7-35de-5af4-b54f-0836646c528b"
diamondUuid: "0e246e8a-4340-8cde-af81-f74dba57577b"
uuid: "ee8073b2-5961-8898-9a24-20cc29b69b92"
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
  computationUuid: "633da743-6a27-87b2-92f4-c328a75526b5"
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
      stageUuid: "baa726ec-f783-8001-9053-557b5cf5371a"
    - stage: seal
      stageUuid: "1eac9f7d-0366-882f-9b1d-4f6c084d19c8"
    - stage: uuid
      stageUuid: "de85450f-b623-8513-b2ff-f3cf2db65d10"
version: 2
---
# page/range — the paginator, exported from a barrel a server module can import

`PageRange` renders which slice of a result set is being shown. The component is `index.tsx`
because it is JSX; this barrel re-exports it so importers name the atom rather than the
spelling of its file.

Composes: [[law]].
