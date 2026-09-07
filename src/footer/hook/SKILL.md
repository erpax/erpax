---
name: hook
description: "Use when reasoning about hook — clears the cached pages when the global changes, so an edit is visible without a deploy. A cache with no invalidation is a copy of an answer, and copies go stale."
atomPath: "footer/hook"
coordinate: "footer/hook · 8/crest · c1fd393d"
contentUuid: "fed0eeef-2dc7-5dd0-84a2-267145579b75"
diamondUuid: "05890154-9dae-8049-98b3-3b380d3ea373"
uuid: "c1fd393d-4400-8db2-a358-12a00cbda02c"
horo: 8
typography:
  partition: footer
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "fc86a5b5-c152-88a2-a9ca-80741e58168f"
  stages:
    - stage: path
      stageUuid: "31ea9c68-15bf-8b97-9624-74429b09432f"
    - stage: trinity
      stageUuid: "76f532fe-f1a4-8883-b4a9-08fced97ed67"
    - stage: boundary
      stageUuid: "02e0d0c1-32cb-87a0-9c30-ece6897a9e6b"
    - stage: links
      stageUuid: "85e5d32a-d8a3-88d9-b310-1c9b4d498d5a"
    - stage: horo
      stageUuid: "56632ece-bc2c-8339-9578-e686d7c8c732"
    - stage: seal
      stageUuid: "14b5eeda-a694-88a1-b0f6-d19f68986147"
    - stage: uuid
      stageUuid: "58995848-7c23-8571-bb53-fb1620addb9d"
version: 2
---
# footer/hook — editing the footer invalidates the pages that render it

`revalidateFooter` clears the cached pages when the global changes, so an edit is visible without a
deploy. A cache with no invalidation is a copy of an answer, and copies go stale.

Composes: [[law]].
