---
name: hook
description: "Use when reasoning about hook — clears the cached pages when the global changes, so an edit is visible without a deploy. A cache with no invalidation is a copy of an answer, and copies go stale."
atomPath: "footer/hook"
coordinate: "footer/hook · 4/weave · 1590a6f5"
contentUuid: "9a9d1f53-bdab-59b8-8ef1-76d34963dfab"
diamondUuid: "32e90d31-edcb-843b-97ed-a898508cb75a"
uuid: "1590a6f5-0082-85c8-8199-5bf358df4abc"
horo: 4
typography:
  partition: footer
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "59305733-3bf8-861d-aa4d-0a21d6f2d63c"
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
      stageUuid: "6ec9ca0f-1a7d-8dc0-972d-ed0aea736d95"
    - stage: seal
      stageUuid: "14b5eeda-a694-88a1-b0f6-d19f68986147"
    - stage: uuid
      stageUuid: "a7dcf587-c533-8969-a8d0-07fc2abca3a1"
version: 2
---
# footer/hook — editing the footer invalidates the pages that render it

`revalidateFooter` clears the cached pages when the global changes, so an edit is visible without a
deploy. A cache with no invalidation is a copy of an answer, and copies go stale.

Composes: [[law]].
