---
name: type
description: "Use when reasoning about type identity on the matrix — a type as the content-uuid of its structural shape, so type-equality is uuid-equality (structural typing by content-addressing) and identical types merge."
atomPath: "quantum/type"
coordinate: "quantum/type · 8/crest · 8425c56b"
contentUuid: "2fbd8ed6-cf59-5433-8c16-ba9e62efca77"
diamondUuid: "0b3426a5-a66f-8243-bd64-376fcf8536a2"
uuid: "8425c56b-9695-8ace-b5e4-e8ffb6d64192"
horo: 8
typography:
  partition: quantum
  bondDegree: 279
standards:
  - "RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "4154eace-a14a-8c93-a368-b7813de935fb"
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
      stageUuid: "eb88275c-02bc-8ad4-a4e0-77e26df05603"
    - stage: seal
      stageUuid: "03a36eba-cd9e-8fda-af1e-6d1d333eaa77"
    - stage: uuid
      stageUuid: "d36a3995-c575-8a92-a9ac-3f81d532e9d0"
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
    computationUuid: "4154eace-a14a-8c93-a368-b7813de935fb"
    contentUuid: "2fbd8ed6-cf59-5433-8c16-ba9e62efca77"
version: 2
---
# quantum/type — type identity as a content-uuid

The quantum facet of [[type]]: a **type is a content-uuid** — identified by the content-uuid of its structural shape. So **type-equality is uuid-equality** (structural typing by content-addressing): same shape ⇒ same type ⇒ they [[merge]]; a shape change yields a new uuid (tamper-evident by architecture). Where [[type]] is the data-type vocabulary, this facet makes type-identity computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** This is content-addressing of a canonical shape string — structural identity, not a type-theory proof.

Matter-twin: `src/quantum/type/index.ts` (`typeUuid` · `sameType`). Composes [[type]] · [[uuid]] · [[merge]] · [[matrix]] · [[quantum]] · [[schema]].

**Law — [[law]]: a type's identity is the content-uuid of its canonical structural shape and nothing else — so `sameType` reduces exactly to uuid-equality of those shapes (structural, not nominal: two shapes that print identically ARE the same type and merge), and any change to the shape, however small, yields a different uuid (the type is tamper-evident by construction, never by inspection).**

@standard RFC 9562 §5.8 content-uuid

<sub>content-uuid `2fbd8ed6-cf59-5433-8c16-ba9e62efca77` · account `quantum/type` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
