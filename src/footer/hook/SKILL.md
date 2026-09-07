---
name: hook
description: "Use when reasoning about hook — clears the cached pages when the global changes, so an edit is visible without a deploy. A cache with no invalidation is a copy of an answer, and copies go stale."
atomPath: "footer/hook"
coordinate: "footer/hook · 7/descent · 21b31c7b"
contentUuid: "df089927-cab6-5a50-b9f9-b5d2d1dcee18"
diamondUuid: "b2e8624e-9563-8212-8ea7-2b96e1350358"
uuid: "21b31c7b-6e17-8aa5-9afe-4ace63554ea3"
horo: 7
typography:
  partition: footer
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "5eddd417-1f35-8c16-913a-73f45677791b"
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
      stageUuid: "8e87f0dc-48f7-8704-a925-44032129e2e0"
    - stage: seal
      stageUuid: "14b5eeda-a694-88a1-b0f6-d19f68986147"
    - stage: uuid
      stageUuid: "38b69203-becd-8e3a-8963-0b9f9cd9ff6b"
version: 2
---
# footer/hook — editing the footer invalidates the pages that render it

`revalidateFooter` clears the cached pages when the global changes, so an edit is visible without a
deploy. A cache with no invalidation is a copy of an answer, and copies go stale.

Composes: [[law]].
