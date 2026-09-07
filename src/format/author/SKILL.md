---
name: author
description: "Use when reasoning about author — turns populated authors into the sentence a reader expects: one is itself, two become \"A and B\", and three or more become \"A, B and C\" — no serial comma, decided once here rather…"
atomPath: "format/author"
coordinate: "format/author · 7/descent · 360e51bc"
contentUuid: "b2618ee5-aede-5849-9836-1aa9d6a92ff7"
diamondUuid: "17135e29-c36c-8102-be79-07eba6d1cb55"
uuid: "360e51bc-0c40-81d8-a29e-06e40e262c06"
horo: 7
typography:
  partition: format
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "09ccf26a-4d93-8ec9-91fa-3484331f1223"
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
      stageUuid: "5352570d-9622-83ef-bb94-9906a17c6d7a"
    - stage: seal
      stageUuid: "0f89df7d-15e5-82e9-83c9-2006424ecf34"
    - stage: uuid
      stageUuid: "0b142275-2220-81f9-8818-ed79e31d2fe1"
version: 2
---
# format/author — a list of people is rendered by a grammar, not by a join

`formatAuthors` turns populated authors into the sentence a reader expects: one is itself, two
become "A and B", and three or more become "A, B and C" — no serial comma, decided once here
rather than argued in each template. An author carrying no name is dropped rather than rendered
as a gap in the list.

Composes: [[law]].
