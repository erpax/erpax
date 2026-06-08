---
name: description
description: "Use when capturing free-form explanatory text — line item description, finding description, audit observation, notes. Rich or plain text; never a metadata bag (prefer explicit fields + tags for structured data)."
atomPath: description
coordinate: description · 2/share · 97f6b2d3
contentUuid: "1fcee3ec-4bc4-5821-9e93-d982655d5a8a"
diamondUuid: "3cbb75b8-ae71-8923-a5a8-93b5d7e02baf"
uuid: "97f6b2d3-c65b-8a14-aa51-41faca1d17d2"
horo: 2
bonds:
  in:
    - audit
    - context
    - disambiguating
    - fields
    - lodging
    - original
    - target
    - unit
  out:
    - audit
    - context
    - disambiguating
    - fields
    - lodging
    - original
    - target
    - unit
typography:
  partition: description
  bondDegree: 25
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - audit
    - fields
  matrix:
    - audit
    - context
    - disambiguating
    - fields
    - lodging
    - original
    - target
    - unit
  backlinks:
    - audit
    - context
    - disambiguating
    - fields
    - lodging
    - original
    - target
    - unit
signatures:
  computationUuid: "e28fb853-8673-881f-92f4-637a238a309d"
  stages:
    - stage: path
      stageUuid: "cd0f5dbe-5788-8e1d-87d3-b31c1388bce6"
    - stage: trinity
      stageUuid: "adaafa58-146a-8b6f-b48f-9a7e83ede527"
    - stage: boundary
      stageUuid: "e2fe6885-f629-82df-b907-407edb26333f"
    - stage: links
      stageUuid: "e7da4390-d2de-88a6-a082-15092fde95a1"
    - stage: horo
      stageUuid: "a6c34245-97bd-89fc-ae81-2f900ed02103"
    - stage: seal
      stageUuid: "2d6ccff9-3560-8e7c-8eba-faa7b4e47701"
    - stage: uuid
      stageUuid: "ebfcbecf-24cc-8d84-b89b-c0ce6973813d"
version: 2
---
# description

Use when capturing free-form explanatory text — line item description, finding description, audit observation, notes. Rich or plain text; never a metadata bag (prefer explicit fields + tags for structured data).

Composes: [[fields]] · [[audit]].
