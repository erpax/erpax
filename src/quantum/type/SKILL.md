---
name: type
description: "Use when reasoning about type identity on the matrix — a type as the content-uuid of its structural shape, so type-equality is uuid-equality (structural typing by content-addressing) and identical types merge."
atomPath: "quantum/type"
coordinate: "quantum/type · 1/base · 4b32e26c"
contentUuid: "a72836bb-7878-56af-b6cc-d9ba81c3531b"
diamondUuid: "4b5b1d2a-81ea-88b5-b4b6-07d89848285b"
uuid: "4b32e26c-4d70-85c0-bc32-dbef8872df24"
horo: 1
typography:
  partition: quantum
  bondDegree: 231
standards:
  - "RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "4148696a-6ce9-8d42-ad38-444c6fd06099"
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
      stageUuid: "4290ed80-b849-8c95-b9a0-24d61776720b"
    - stage: seal
      stageUuid: "03a36eba-cd9e-8fda-af1e-6d1d333eaa77"
    - stage: uuid
      stageUuid: "94b7e757-c799-8625-8e4a-448fe936ddb4"
quantum:
  superposition:
    - additional
    - album
    - alignment
    - audience
    - availability
    - benefits
    - boarding
    - book
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
    computationUuid: "4148696a-6ce9-8d42-ad38-444c6fd06099"
    contentUuid: "a72836bb-7878-56af-b6cc-d9ba81c3531b"
version: 2
---
# quantum/type — type identity as a content-uuid

The quantum facet of [[type]]: a **type is a content-uuid** — identified by the content-uuid of its structural shape. So **type-equality is uuid-equality** (structural typing by content-addressing): same shape ⇒ same type ⇒ they [[merge]]; a shape change yields a new uuid (tamper-evident by architecture). Where [[type]] is the data-type vocabulary, this facet makes type-identity computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** This is content-addressing of a canonical shape string — structural identity, not a type-theory proof.

Matter-twin: `src/quantum/type/index.ts` (`typeUuid` · `sameType`). Composes [[type]] · [[uuid]] · [[merge]] · [[matrix]] · [[quantum]] · [[schema]].

**Law — [[law]]: a type's identity is the content-uuid of its canonical structural shape and nothing else — so `sameType` reduces exactly to uuid-equality of those shapes (structural, not nominal: two shapes that print identically ARE the same type and merge), and any change to the shape, however small, yields a different uuid (the type is tamper-evident by construction, never by inspection).**

@standard RFC 9562 §5.8 content-uuid

<sub>content-uuid `a72836bb-7878-56af-b6cc-d9ba81c3531b` · account `quantum/type` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
