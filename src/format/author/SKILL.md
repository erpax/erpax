---
name: author
description: "Use when reasoning about author — turns populated authors into the sentence a reader expects: one is itself, two become \"A and B\", and three or more become \"A, B and C\" — no serial comma, decided once here rather…"
atomPath: "format/author"
coordinate: "format/author · 5/round · 9d179942"
contentUuid: "fa06fc1a-2e4f-5aab-83c1-c382dd002a2c"
diamondUuid: "656728c7-5447-87b0-b432-873cabc2f58b"
uuid: "9d179942-e0b9-8c4c-9cba-d1a96abc9e59"
horo: 5
typography:
  partition: format
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "7a01a13a-1610-871e-b3ad-e12a75658e33"
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
      stageUuid: "26c8f19a-a0b9-8429-a0ee-06f2c05cf334"
    - stage: seal
      stageUuid: "0f89df7d-15e5-82e9-83c9-2006424ecf34"
    - stage: uuid
      stageUuid: "1e952a65-2930-8776-87e6-8828d30182ec"
version: 2
---
# format/author — a list of people is rendered by a grammar, not by a join

`formatAuthors` turns populated authors into the sentence a reader expects: one is itself, two
become "A and B", and three or more become "A, B and C" — no serial comma, decided once here
rather than argued in each template. An author carrying no name is dropped rather than rendered
as a gap in the list.

Composes: [[law]].
