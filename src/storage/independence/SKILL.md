---
name: independence
description: "Use when reasoning about independence — admits a store and recomputes the content-uuid from each one's bytes. Agreement means the object is intact everywhere; disagreement names which store is wrong, without trusting…"
atomPath: "storage/independence"
coordinate: "storage/independence · 4/weave · badd831f"
contentUuid: "30973a84-952c-54a5-bea8-aff8a19eba0a"
diamondUuid: "6cdfe337-5745-8a7d-ae4a-d355e73874e5"
uuid: "badd831f-b1ef-8294-b731-448c108ae66f"
horo: 4
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
  computationUuid: "c6f22dcd-8481-8277-a55c-b910afb48057"
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
      stageUuid: "4dfa0165-2daf-8a7c-83e9-c5186417c975"
    - stage: seal
      stageUuid: "e110ea00-1bd9-8a3d-a12c-66f58081e52e"
    - stage: uuid
      stageUuid: "c4628b66-ebb9-8310-8121-396bdd77914e"
version: 2
---
# storage/independence — an object belongs to no store, because its address is its content

`registerBackend` admits a store and `verifyAcrossBackends` recomputes the content-uuid from each
one's bytes. Agreement means the object is intact everywhere; disagreement names which store is
wrong, without trusting any of them.

`MEMORY_BACKEND` is the reference implementation the others are checked against.

Composes: [[uuid]] · [[law]].
