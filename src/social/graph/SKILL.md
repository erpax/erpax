---
name: graph
description: "Use when reasoning about graph — holds directed edges. asks whether the opposite edge exists, and derives the relation: two mutual follows ARE a friendship, and nothing writes a \"friends\" row to say so."
atomPath: "social/graph"
coordinate: "social/graph · 4/weave · 3f6233d1"
contentUuid: "c264f588-4581-5fe7-9b27-ca86979660cc"
diamondUuid: "d0dc0609-2cc0-831a-9cae-3d9414b634eb"
uuid: "3f6233d1-372b-8cec-aa66-8fc3240efe29"
horo: 4
typography:
  partition: social
  bondDegree: 42
standards:
  - "W3C ActivityStreams 2.0 Follow/Accept reciprocity"
bindings: []
signatures:
  computationUuid: "b5ed8304-5748-8eb7-b579-768977a29e32"
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
      stageUuid: "91b96579-910d-8bd0-b2b1-c61379c36fe3"
    - stage: seal
      stageUuid: "f5e0ea77-f0ad-8065-aec8-7cd71740f1ca"
    - stage: uuid
      stageUuid: "18267fb6-63eb-85c8-9c8e-754aa58db221"
version: 2
---
# social/graph — reciprocity is computed from the two edges, never stored as a third state

`connections` holds directed edges. `isReciprocal` asks whether the opposite edge exists, and
`resolveReciprocity` derives the relation: two mutual follows ARE a friendship, and nothing
writes a "friends" row to say so.

A stored third state is a copy of an answer, and copies go stale the moment one side unfollows.

Composes: [[law]].
