---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: "migrate/names"
coordinate: "migrate/names · 5/round · d8ce7d2a"
contentUuid: "49a4b0ca-679a-5a7a-a111-f627cbf7542b"
diamondUuid: "64273368-9697-8766-ad03-f94031700614"
uuid: "d8ce7d2a-0421-8cf1-bca0-c8eb25fdae5b"
horo: 5
typography:
  partition: migrate
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "fb71745c-4a50-8d08-a175-e163469376b4"
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
      stageUuid: "37d53939-4e09-83ad-b2c5-a8db2ff7f6ce"
    - stage: seal
      stageUuid: "bc2d3f4a-1321-85f0-b465-02d7dc13706e"
    - stage: uuid
      stageUuid: "3a0664a8-579c-886d-a2e2-42c8031ae35f"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
