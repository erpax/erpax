---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: "migrate/names"
coordinate: "migrate/names · 8/crest · a12d9fa0"
contentUuid: "a2bbc2fe-183f-5126-a978-077e7b6a045c"
diamondUuid: "a3284735-b482-8cfd-8448-25cacc87d411"
uuid: "a12d9fa0-62ef-8a95-a9fb-6e927dc5cc22"
horo: 8
typography:
  partition: migrate
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "bcff7b57-595d-80f6-b4ee-ebc8e0f6be7f"
  stages:
    - stage: path
      stageUuid: "e6ad76bf-0ae6-8c6d-9d62-4f468d81f200"
    - stage: trinity
      stageUuid: "90e66b46-0d3d-8931-b0a1-66ff197dc440"
    - stage: boundary
      stageUuid: "96f0fd34-6cc7-8701-8500-a4ddb398a57c"
    - stage: links
      stageUuid: "3779a7f3-d537-8f54-8a2f-fdc235976ac8"
    - stage: horo
      stageUuid: "f8f261e2-85b8-8133-b627-8fa8fe69841b"
    - stage: seal
      stageUuid: "bc2d3f4a-1321-85f0-b465-02d7dc13706e"
    - stage: uuid
      stageUuid: "8769c563-c5d9-81e7-9779-c1568991a42f"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
