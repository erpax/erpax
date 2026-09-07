---
name: type
description: "Use when reasoning about type identity on the matrix — a type as the content-uuid of its structural shape, so type-equality is uuid-equality (structural typing by content-addressing) and identical types merge."
atomPath: "quantum/type"
coordinate: "quantum/type · 1/base · 947dc08b"
contentUuid: "c58babc8-40bf-5d4d-8f56-2fc7068cf4f9"
diamondUuid: "a60ab29f-3017-86cf-9f42-1234b01b7bda"
uuid: "947dc08b-63ef-8221-836a-84e32b4c00dc"
horo: 1
typography:
  partition: quantum
  bondDegree: 279
standards:
  - "RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "5c997dee-20ff-8ad8-8cca-c07b3cd75553"
  stages:
    - stage: path
      stageUuid: "cff75413-7577-838a-86c5-e0febb781568"
    - stage: trinity
      stageUuid: "0ab5ea10-8b85-8129-abe4-b9f72820d665"
    - stage: boundary
      stageUuid: "050a84db-e540-872b-afef-ac9285a9d245"
    - stage: links
      stageUuid: "1627ecd5-ca7c-8964-9a3f-4f701a0bd3f7"
    - stage: horo
      stageUuid: "1742f634-7412-85e3-ae3b-b29796f253c1"
    - stage: seal
      stageUuid: "03a36eba-cd9e-8fda-af1e-6d1d333eaa77"
    - stage: uuid
      stageUuid: "869e6c12-64f0-8a83-9d1d-af703d0c1336"
quantum:
  superposition:
    - action
    - additional
    - album
    - alignment
    - audience
    - availability
    - bed
    - benefits
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid"
    - "Use when reasoning about type identity on the matrix — a type as the content-uuid of its structural shape, so type-equality is uuid-equality (structural typing by content-addressing) and identical types merge."
    - "a type's identity is the content-uuid of its canonical structural shape and nothing else — so `sameType` reduces exactly to uuid-equality of those shapes (structural, not nominal: two shapes that print identically ARE the same type and merge), and any change to the shape, however small, yields a different uuid (the type is tamper-evident by construction, never by inspection)."
    - "matter-twin:src/quantum/type/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "5c997dee-20ff-8ad8-8cca-c07b3cd75553"
    contentUuid: "c58babc8-40bf-5d4d-8f56-2fc7068cf4f9"
version: 2
---
# quantum/type — type identity as a content-uuid

The quantum facet of [[type]]: a **type is a content-uuid** — identified by the content-uuid of its structural shape. So **type-equality is uuid-equality** (structural typing by content-addressing): same shape ⇒ same type ⇒ they [[merge]]; a shape change yields a new uuid (tamper-evident by architecture). Where [[type]] is the data-type vocabulary, this facet makes type-identity computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** This is content-addressing of a canonical shape string — structural identity, not a type-theory proof.

Matter-twin: `src/quantum/type/index.ts` (`typeUuid` · `sameType`). Composes [[type]] · [[uuid]] · [[merge]] · [[matrix]] · [[quantum]] · [[schema]].

**Law — [[law]]: a type's identity is the content-uuid of its canonical structural shape and nothing else — so `sameType` reduces exactly to uuid-equality of those shapes (structural, not nominal: two shapes that print identically ARE the same type and merge), and any change to the shape, however small, yields a different uuid (the type is tamper-evident by construction, never by inspection).**

@standard RFC 9562 §5.8 content-uuid

<sub>content-uuid `c58babc8-40bf-5d4d-8f56-2fc7068cf4f9` · account `quantum/type` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
