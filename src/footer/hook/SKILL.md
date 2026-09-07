---
name: hook
description: "Use when reasoning about hook — clears the cached pages when the global changes, so an edit is visible without a deploy. A cache with no invalidation is a copy of an answer, and copies go stale."
atomPath: "footer/hook"
coordinate: "footer/hook · 7/descent · 99f1fb07"
contentUuid: "253f13a2-019c-5874-82b1-f6cfa33763da"
diamondUuid: "31bda3ca-95d4-8c6c-8c41-b4b1dc66916e"
uuid: "99f1fb07-4e84-84ef-9ec1-a0a797ec7111"
horo: 7
typography:
  partition: footer
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "1bef1d20-d42f-8f3d-8fe0-6fc6ceface4c"
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
      stageUuid: "bd4723fa-f167-862b-8cd4-5017b41255b4"
    - stage: seal
      stageUuid: "14b5eeda-a694-88a1-b0f6-d19f68986147"
    - stage: uuid
      stageUuid: "27a0f3c8-0efa-8f46-9504-5442218b9f7b"
version: 2
---
# footer/hook — editing the footer invalidates the pages that render it

`revalidateFooter` clears the cached pages when the global changes, so an edit is visible without a
deploy. A cache with no invalidation is a copy of an answer, and copies go stale.

Composes: [[law]].
