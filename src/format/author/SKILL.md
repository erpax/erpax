---
name: author
description: "Use when reasoning about author — turns populated authors into the sentence a reader expects: one is itself, two become \"A and B\", and three or more become \"A, B and C\" — no serial comma, decided once here rather…"
atomPath: "format/author"
coordinate: "format/author · 7/descent · b828ecc1"
contentUuid: "b2e11beb-3533-5404-811f-3a8fbb9d35d8"
diamondUuid: "5c0c1aa9-8712-8e5f-84a9-3aacb13075c5"
uuid: "b828ecc1-fc2a-8ecc-86cc-3f1838e54d1e"
horo: 7
typography:
  partition: format
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "f5fc4e80-ddae-8fe6-b34e-6b273c78faf2"
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
      stageUuid: "b9cbf51d-7282-8b38-b4e9-df85b2dedc87"
    - stage: seal
      stageUuid: "0f89df7d-15e5-82e9-83c9-2006424ecf34"
    - stage: uuid
      stageUuid: "679e5dd8-4466-8207-87b7-2611a586eadf"
version: 2
---
# format/author — a list of people is rendered by a grammar, not by a join

`formatAuthors` turns populated authors into the sentence a reader expects: one is itself, two
become "A and B", and three or more become "A, B and C" — no serial comma, decided once here
rather than argued in each template. An author carrying no name is dropped rather than rendered
as a gap in the list.

Composes: [[law]].
