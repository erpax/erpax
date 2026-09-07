---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: "migrate/names"
coordinate: "migrate/names · 2/share · b65abc1e"
contentUuid: "beb6f325-6fb2-52d7-a0e9-43e27b59a5cb"
diamondUuid: "eed6cedd-d638-800b-afd7-479a9eedd694"
uuid: "b65abc1e-d954-85fe-ad23-8665811a20dd"
horo: 2
typography:
  partition: migrate
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "278654b2-4403-8007-b766-c94ace2d1174"
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
      stageUuid: "c7d08081-a365-8202-91bd-86dec3c15bce"
    - stage: seal
      stageUuid: "bc2d3f4a-1321-85f0-b465-02d7dc13706e"
    - stage: uuid
      stageUuid: "2bdf82e6-2a58-88d8-8ea6-e41a053efbe2"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
