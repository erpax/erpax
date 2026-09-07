---
name: independence
description: "Use when reasoning about independence — admits a store and recomputes the content-uuid from each one's bytes. Agreement means the object is intact everywhere; disagreement names which store is wrong, without trusting…"
atomPath: "storage/independence"
coordinate: "storage/independence · 5/round · 7e553e3f"
contentUuid: "d6bfbf3e-a469-5917-98ec-6c76e1ae18ad"
diamondUuid: "32931343-1c43-8238-b7e5-d45caa7ab912"
uuid: "7e553e3f-2ff2-8372-9897-06e2d559f359"
horo: 5
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
  computationUuid: "057a50e5-f5fa-8931-b0fa-ccf542d6322f"
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
      stageUuid: "df5a65fd-53ea-8f7b-96ef-9715bb7e8946"
    - stage: seal
      stageUuid: "e110ea00-1bd9-8a3d-a12c-66f58081e52e"
    - stage: uuid
      stageUuid: "2fe8738b-b5cb-81de-9148-72b7e924f27d"
version: 2
---
# storage/independence — an object belongs to no store, because its address is its content

`registerBackend` admits a store and `verifyAcrossBackends` recomputes the content-uuid from each
one's bytes. Agreement means the object is intact everywhere; disagreement names which store is
wrong, without trusting any of them.

`MEMORY_BACKEND` is the reference implementation the others are checked against.

Composes: [[uuid]] · [[law]].
