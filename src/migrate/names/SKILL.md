---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: "migrate/names"
coordinate: "migrate/names · 8/crest · eb877cc5"
contentUuid: "e307bb90-90bd-56c5-9db6-1cdeda416fb9"
diamondUuid: "dd948f48-528d-869a-8073-0b400b924dad"
uuid: "eb877cc5-fb57-82a7-9493-90cbd2a4f6af"
horo: 8
typography:
  partition: migrate
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "0282f45d-aefa-8279-a48b-cc7a700b8c48"
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
      stageUuid: "6e7ec7cd-df96-8c0d-9d13-53f8bb2a138f"
    - stage: seal
      stageUuid: "bc2d3f4a-1321-85f0-b465-02d7dc13706e"
    - stage: uuid
      stageUuid: "ad004515-e445-8144-a171-1785adbb7473"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
