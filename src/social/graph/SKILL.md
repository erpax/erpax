---
name: graph
description: "Use when reasoning about graph — holds directed edges. asks whether the opposite edge exists, and derives the relation: two mutual follows ARE a friendship, and nothing writes a \"friends\" row to say so."
atomPath: "social/graph"
coordinate: "social/graph · 7/descent · fe2a9382"
contentUuid: "1ed608ea-5342-5635-84ea-6e70f10c883a"
diamondUuid: "5310b2a5-1317-8e2e-a5e2-f624d9df3cb7"
uuid: "fe2a9382-b830-8ccc-bea2-d6c48b381012"
horo: 7
typography:
  partition: social
  bondDegree: 42
standards:
  - "W3C ActivityStreams 2.0 Follow/Accept reciprocity"
bindings: []
signatures:
  computationUuid: "f7d31af7-4f3e-8cce-bbeb-dec7ecde7523"
  stages:
    - stage: path
      stageUuid: "25f65add-d0c0-8de0-8100-62d8fe77f442"
    - stage: trinity
      stageUuid: "0be3c91f-d976-823d-9e8e-89a127e7d881"
    - stage: boundary
      stageUuid: "42fb695c-3cd6-8238-8cc2-325049002daa"
    - stage: links
      stageUuid: "8c7dd8dc-b631-86a9-8ddb-d3b15b36ba50"
    - stage: horo
      stageUuid: "e8eea49e-10b5-8f37-bc43-bc1d871bca13"
    - stage: seal
      stageUuid: "f5e0ea77-f0ad-8065-aec8-7cd71740f1ca"
    - stage: uuid
      stageUuid: "c0fa6108-6a2d-86a5-abdc-4c4577e643c4"
version: 2
---
# social/graph — reciprocity is computed from the two edges, never stored as a third state

`connections` holds directed edges. `isReciprocal` asks whether the opposite edge exists, and
`resolveReciprocity` derives the relation: two mutual follows ARE a friendship, and nothing
writes a "friends" row to say so.

A stored third state is a copy of an answer, and copies go stale the moment one side unfollows.

Composes: [[law]].
