---
name: hook
description: "Use when reasoning about hook — clears the cached pages when the global changes, so an edit is visible without a deploy. A cache with no invalidation is a copy of an answer, and copies go stale."
atomPath: "footer/hook"
coordinate: "footer/hook · 1/base · 9e4aec91"
contentUuid: "0c3bb6bb-1bcc-525d-953d-9e0de276a139"
diamondUuid: "1797bdab-2599-84a9-8795-83e748ef77e9"
uuid: "9e4aec91-2daa-8adc-9fe0-183faec02fd9"
horo: 1
typography:
  partition: footer
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "e792b698-c719-8fb6-8596-5bda30744791"
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
      stageUuid: "0c635dd3-8d9f-8f46-8850-57739486974a"
    - stage: seal
      stageUuid: "14b5eeda-a694-88a1-b0f6-d19f68986147"
    - stage: uuid
      stageUuid: "2a52aeea-110e-8a30-baf3-760e43d21bff"
version: 2
---
# footer/hook — editing the footer invalidates the pages that render it

`revalidateFooter` clears the cached pages when the global changes, so an edit is visible without a
deploy. A cache with no invalidation is a copy of an answer, and copies go stale.

Composes: [[law]].
