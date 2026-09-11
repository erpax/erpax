---
name: independence
description: "Use when reasoning about independence — admits a store and recomputes the content-uuid from each one's bytes. Agreement means the object is intact everywhere; disagreement names which store is wrong, without trusting…"
atomPath: "storage/independence"
coordinate: "storage/independence · 8/crest · 231a96d1"
contentUuid: "46f8d54a-9f0d-5b1b-84cb-1f7ca39febe9"
diamondUuid: "c144cde3-fe1c-8fbd-a232-99a3aef232f5"
uuid: "231a96d1-abcd-8308-ab65-882dbcff9f29"
horo: 8
typography:
  partition: storage
  bondDegree: 6
standards:
  - "ISO/IEC 27040:2024 — storage security (data integrity)"
  - "RFC 9562 §5.8 + RFC 8785 (content-derived uuids)"
  - "RFC-8785"
  - W3C Verifiable Data Registry conformance (storage layer)
bindings: []
signatures:
  computationUuid: "656c4236-9a0d-8b8b-894f-c0fba94c5236"
  stages:
    - stage: path
      stageUuid: "c998f0bb-dd5e-8f8a-a95f-7bdac2f39003"
    - stage: trinity
      stageUuid: "5df55f25-ddb7-8060-a807-fb98eb5086c2"
    - stage: boundary
      stageUuid: "e907ff25-7480-854a-8fce-beafc6850148"
    - stage: links
      stageUuid: "a49b427b-b57b-80a5-86a6-bd946f0f3769"
    - stage: horo
      stageUuid: "d8948f37-1d6c-80a6-b76c-5621813acbdb"
    - stage: seal
      stageUuid: "e110ea00-1bd9-8a3d-a12c-66f58081e52e"
    - stage: uuid
      stageUuid: "ab70780c-953a-825e-b2ea-16089bee9f20"
version: 2
---
# storage/independence — an object belongs to no store, because its address is its content

`registerBackend` admits a store and `verifyAcrossBackends` recomputes the content-uuid from each
one's bytes. Agreement means the object is intact everywhere; disagreement names which store is
wrong, without trusting any of them.

`MEMORY_BACKEND` is the reference implementation the others are checked against.

Composes: [[uuid]] · [[law]].
