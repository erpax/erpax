---
name: author
description: "Use when reasoning about author — turns populated authors into the sentence a reader expects: one is itself, two become \"A and B\", and three or more become \"A, B and C\" — no serial comma, decided once here rather…"
atomPath: "format/author"
coordinate: "format/author · 8/crest · bc3d03de"
contentUuid: "1e021dfe-b374-5eb4-be38-13a31030de8c"
diamondUuid: "0a27b912-92ab-84c3-9652-85be4e95a0ed"
uuid: "bc3d03de-01bf-867d-8939-97e1f0196ed7"
horo: 8
typography:
  partition: format
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "9302d0f3-fa98-8b63-a120-aad484987f86"
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
      stageUuid: "aa992c6b-515b-8c90-ad35-704c5a743286"
    - stage: seal
      stageUuid: "0f89df7d-15e5-82e9-83c9-2006424ecf34"
    - stage: uuid
      stageUuid: "f7a2176f-4134-889d-8410-f25a0cce1b09"
version: 2
---
# format/author — a list of people is rendered by a grammar, not by a join

`formatAuthors` turns populated authors into the sentence a reader expects: one is itself, two
become "A and B", and three or more become "A, B and C" — no serial comma, decided once here
rather than argued in each template. An author carrying no name is dropped rather than rendered
as a gap in the list.

Composes: [[law]].
