---
name: names
description: "Use when collapsing each atom's test file to the canonical test.ts — the migrating skill that renames a single <Name>.test.ts to test.ts and flags multi-test folders for sub-atom collision."
atomPath: "migrate/names"
coordinate: "migrate/names · 4/weave · 93fa1461"
contentUuid: "99e97114-e2f8-5d0d-a722-1e323a07f4ae"
diamondUuid: "3c7423b6-7112-8aea-a044-f066b76b7b3c"
uuid: "93fa1461-e118-8217-8090-728235d7a4ac"
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
  computationUuid: "2032a2fd-ec6f-8bb1-b0b0-693cb97ae26f"
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
      stageUuid: "b28e8150-baeb-8f5e-8f2d-4848ddedb3bd"
    - stage: seal
      stageUuid: "bc2d3f4a-1321-85f0-b465-02d7dc13706e"
    - stage: uuid
      stageUuid: "502fc83b-6379-8496-8038-997cc079be9a"
version: 2
---
# names

The canonical-name migrating skill ([[migrate]] · [[quaternary]]): collide each atom's test file to the law's `test.ts` slot.

A folder with one `<Name>.test.ts` / `index.test.ts` is renamed to `test.ts` — computable, idempotent, content unchanged (imports are unaffected; the vitest glob already matches `test.ts`). A folder with **multiple** test files (or a `.tsx` test) is flagged, never silently dropped: each tested unit must [[collapse]] into its own sub-atom.

Zero manual work — `--apply` runs the deterministic plan; [[quaternary]]'s test verifies the queue shrank. [[test]] · [[merge]].
