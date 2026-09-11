---
name: graph
description: "Use when reasoning about graph — holds directed edges. asks whether the opposite edge exists, and derives the relation: two mutual follows ARE a friendship, and nothing writes a \"friends\" row to say so."
atomPath: "social/graph"
coordinate: "social/graph · 1/base · aedd98e2"
contentUuid: "e305b539-4188-5d37-85bc-926f54ab2305"
diamondUuid: "dacf4f9e-f573-89f0-9a6a-79be0320d3e3"
uuid: "aedd98e2-bed9-8707-a74f-015af0f0076e"
horo: 1
typography:
  partition: social
  bondDegree: 42
standards:
  - "W3C ActivityStreams 2.0 Follow/Accept reciprocity"
bindings: []
signatures:
  computationUuid: "78524061-3591-89e3-89a8-6828e629cc17"
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
      stageUuid: "a71f2d1e-8de5-81cc-927e-ca52168d0966"
    - stage: seal
      stageUuid: "f5e0ea77-f0ad-8065-aec8-7cd71740f1ca"
    - stage: uuid
      stageUuid: "15caba2a-cb13-8ca0-a114-37d8c36ce1ee"
version: 2
---
# social/graph — reciprocity is computed from the two edges, never stored as a third state

`connections` holds directed edges. `isReciprocal` asks whether the opposite edge exists, and
`resolveReciprocity` derives the relation: two mutual follows ARE a friendship, and nothing
writes a "friends" row to say so.

A stored third state is a copy of an answer, and copies go stale the moment one side unfollows.

Composes: [[law]].
