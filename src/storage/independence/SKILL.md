---
name: independence
description: "Use when reasoning about independence — admits a store and recomputes the content-uuid from each one's bytes. Agreement means the object is intact everywhere; disagreement names which store is wrong, without trusting…"
atomPath: "storage/independence"
coordinate: "storage/independence · 7/descent · 3749c6c5"
contentUuid: "54e65e5d-9aef-5bb8-baa8-610f0704e484"
diamondUuid: "1ce7357e-fc9b-84a9-8ad3-8040462aa152"
uuid: "3749c6c5-870c-8070-8693-df71650e25ad"
horo: 7
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
  computationUuid: "92044524-a3ab-8d42-bd10-3da2ef8d7baa"
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
      stageUuid: "1cc30501-cfc4-8741-baf6-3f6aff434ebc"
    - stage: seal
      stageUuid: "e110ea00-1bd9-8a3d-a12c-66f58081e52e"
    - stage: uuid
      stageUuid: "e03f4c29-4b23-8123-9054-ea820b1eea3b"
version: 2
---
# storage/independence — an object belongs to no store, because its address is its content

`registerBackend` admits a store and `verifyAcrossBackends` recomputes the content-uuid from each
one's bytes. Agreement means the object is intact everywhere; disagreement names which store is
wrong, without trusting any of them.

`MEMORY_BACKEND` is the reference implementation the others are checked against.

Composes: [[uuid]] · [[law]].
