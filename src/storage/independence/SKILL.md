---
name: independence
description: "Use when reasoning about independence — admits a store and recomputes the content-uuid from each one's bytes. Agreement means the object is intact everywhere; disagreement names which store is wrong, without trusting…"
atomPath: "storage/independence"
coordinate: "storage/independence · 1/base · e11968b5"
contentUuid: "2fa36a1a-ac57-51d1-8be2-166817ed9ea4"
diamondUuid: "0c3171dc-8a36-8d6e-9676-120a71e5505e"
uuid: "e11968b5-e706-87dc-b38e-aa2f2ddd845b"
horo: 1
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
  computationUuid: "8df0c373-a9b2-8da9-9432-61ad68962aaf"
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
      stageUuid: "b813dc49-427b-8135-8083-74b03a2403ae"
    - stage: seal
      stageUuid: "e110ea00-1bd9-8a3d-a12c-66f58081e52e"
    - stage: uuid
      stageUuid: "6eb58e4c-bb41-8dc2-9395-3e13e9c2d597"
version: 2
---
# storage/independence — an object belongs to no store, because its address is its content

`registerBackend` admits a store and `verifyAcrossBackends` recomputes the content-uuid from each
one's bytes. Agreement means the object is intact everywhere; disagreement names which store is
wrong, without trusting any of them.

`MEMORY_BACKEND` is the reference implementation the others are checked against.

Composes: [[uuid]] · [[law]].
