---
name: graph
description: "Use when reasoning about graph — holds directed edges. asks whether the opposite edge exists, and derives the relation: two mutual follows ARE a friendship, and nothing writes a \"friends\" row to say so."
atomPath: "social/graph"
coordinate: "social/graph · 5/round · 223432b7"
contentUuid: "084a6a0e-ecdd-51f5-827a-44f44c59d011"
diamondUuid: "ea49e7c9-e258-8271-a8e6-15b9a00844c1"
uuid: "223432b7-b886-8165-9ccc-3f6cdec13b2f"
horo: 5
typography:
  partition: social
  bondDegree: 42
standards:
  - "W3C ActivityStreams 2.0 Follow/Accept reciprocity"
bindings: []
signatures:
  computationUuid: "90af53a9-50da-8617-a497-c66ecefa8c05"
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
      stageUuid: "4bccda7a-06b8-820c-b31b-571ef7df5e6d"
    - stage: seal
      stageUuid: "f5e0ea77-f0ad-8065-aec8-7cd71740f1ca"
    - stage: uuid
      stageUuid: "8ffba211-866e-8571-a5c0-dc6e47fad07f"
version: 2
---
# social/graph — reciprocity is computed from the two edges, never stored as a third state

`connections` holds directed edges. `isReciprocal` asks whether the opposite edge exists, and
`resolveReciprocity` derives the relation: two mutual follows ARE a friendship, and nothing
writes a "friends" row to say so.

A stored third state is a copy of an answer, and copies go stale the moment one side unfollows.

Composes: [[law]].
