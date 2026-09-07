---
name: author
description: "Use when reasoning about author — turns populated authors into the sentence a reader expects: one is itself, two become \"A and B\", and three or more become \"A, B and C\" — no serial comma, decided once here rather…"
atomPath: "format/author"
coordinate: "format/author · 7/descent · b19fc04a"
contentUuid: "b71bb23c-e406-5ea9-bcc5-813950ae9361"
diamondUuid: "0d54677d-2a95-8425-b4e7-ef5b4b53a6f5"
uuid: "b19fc04a-1a02-8917-be5b-ec07e80924ff"
horo: 7
typography:
  partition: format
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "a72460e3-288d-8df7-a1b5-7e68e5146dc3"
  stages:
    - stage: path
      stageUuid: "f017d6df-9cd7-8bd7-9ffc-04ff9c6e755c"
    - stage: trinity
      stageUuid: "ff6ac5c5-c388-8cd7-a9b3-edd2a19948c6"
    - stage: boundary
      stageUuid: "20baf264-23c1-805d-b80e-90072b9f01cf"
    - stage: links
      stageUuid: "39401a5c-7b0c-8dda-8569-d04be9929b54"
    - stage: horo
      stageUuid: "c88cb782-5299-8ed9-b5f8-b3c0fc614776"
    - stage: seal
      stageUuid: "0f89df7d-15e5-82e9-83c9-2006424ecf34"
    - stage: uuid
      stageUuid: "4729ad14-2cde-8d81-a103-fd19d6279eb9"
version: 2
---
# format/author — a list of people is rendered by a grammar, not by a join

`formatAuthors` turns populated authors into the sentence a reader expects: one is itself, two
become "A and B", and three or more become "A, B and C" — no serial comma, decided once here
rather than argued in each template. An author carrying no name is dropped rather than rendered
as a gap in the list.

Composes: [[law]].
