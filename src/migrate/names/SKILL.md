---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: migrate/names
coordinate: migrate/names · 4/weave · f110c1ca
contentUuid: "dc2db8de-3186-55bd-84a1-b8ec6d6545c5"
diamondUuid: "7dbea59e-4669-8707-a393-544b10f19fd9"
uuid: "f110c1ca-404e-8697-9c61-0b7a3f166eb8"
horo: 4
bonds:
  in:
    - collapse
    - merge
    - migrate
    - quaternary
    - test
  out:
    - collapse
    - merge
    - migrate
    - quaternary
    - test
typography:
  partition: migrate
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - collapse
    - merge
    - migrate
    - quaternary
    - test
  matrix:
    - collapse
    - merge
    - migrate
    - quaternary
    - test
  backlinks:
    - collapse
    - merge
    - migrate
    - quaternary
    - test
signatures:
  computationUuid: "4f425a79-a0ee-81a9-8ce9-571da2972db6"
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
      stageUuid: "b884b8a8-b2d3-807e-af4e-12a8d9fee378"
    - stage: seal
      stageUuid: "d533d475-cddc-8658-ba7f-030b404de35d"
    - stage: uuid
      stageUuid: "4dfdcef2-5ccc-849d-b269-9668822a1d1c"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
