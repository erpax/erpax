---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: "migrate/names"
coordinate: "migrate/names · 4/weave · 1b392dd9"
contentUuid: "62b7d906-4f37-5449-9e64-812ff3b1ab40"
diamondUuid: "8edb4c0e-f40b-8380-a55b-45e46eba7a40"
uuid: "1b392dd9-9d7c-8bf5-b873-54852c34f92c"
horo: 4
typography:
  partition: migrate
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "244c40d4-9b07-8efe-b567-6bbe8d46fbe7"
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
      stageUuid: "084f7fe8-1473-8b39-ba2a-9a933e4a04a3"
    - stage: seal
      stageUuid: "bc2d3f4a-1321-85f0-b465-02d7dc13706e"
    - stage: uuid
      stageUuid: "3bff65ae-fba6-80f9-b5b9-ec06ef687562"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
