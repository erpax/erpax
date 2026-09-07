---
name: graph
description: "Use when reasoning about graph — holds directed edges. asks whether the opposite edge exists, and derives the relation: two mutual follows ARE a friendship, and nothing writes a \"friends\" row to say so."
atomPath: "social/graph"
coordinate: "social/graph · 2/share · 62620ce2"
contentUuid: "d4921e4e-b9b7-5636-b02d-d44eaec1cda5"
diamondUuid: "320ac39f-6eac-8429-80b7-5025a74a1960"
uuid: "62620ce2-9991-8619-b650-48e7a7161d8b"
horo: 2
typography:
  partition: social
  bondDegree: 42
standards:
  - "W3C ActivityStreams 2.0 Follow/Accept reciprocity"
bindings: []
signatures:
  computationUuid: "d545f24d-2212-8368-be94-915f3e30caa5"
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
      stageUuid: "503695e0-1ae3-8ab4-a1f8-6dee667b1196"
    - stage: seal
      stageUuid: "f5e0ea77-f0ad-8065-aec8-7cd71740f1ca"
    - stage: uuid
      stageUuid: "fbac93fd-4c50-8b3b-950d-043f4dd994e2"
version: 2
---
# social/graph — reciprocity is computed from the two edges, never stored as a third state

`connections` holds directed edges. `isReciprocal` asks whether the opposite edge exists, and
`resolveReciprocity` derives the relation: two mutual follows ARE a friendship, and nothing
writes a "friends" row to say so.

A stored third state is a copy of an answer, and copies go stale the moment one side unfollows.

Composes: [[law]].
