---
name: hook
description: "Use when reasoning about hook — clears the cached pages when the global changes, so an edit is visible without a deploy. A cache with no invalidation is a copy of an answer, and copies go stale."
atomPath: "footer/hook"
coordinate: "footer/hook · 7/descent · 2391e757"
contentUuid: "15fab5fc-7afc-5cfc-aa5b-3f4f78825cf6"
diamondUuid: "97708ffc-cea3-8975-9191-fa4ae0bb031e"
uuid: "2391e757-e7dd-8d4d-849b-82a4c004c88b"
horo: 7
typography:
  partition: footer
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "4f4b94c3-5d13-8d72-8a84-e998e0f66abb"
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
      stageUuid: "06577f28-d02f-8c15-a152-f97aed49d951"
    - stage: seal
      stageUuid: "14b5eeda-a694-88a1-b0f6-d19f68986147"
    - stage: uuid
      stageUuid: "0c3a1eff-96cf-8a4d-9d51-2f1a1d2edb8d"
version: 2
---
# footer/hook — editing the footer invalidates the pages that render it

`revalidateFooter` clears the cached pages when the global changes, so an edit is visible without a
deploy. A cache with no invalidation is a copy of an answer, and copies go stale.

Composes: [[law]].
