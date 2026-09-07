---
name: conflict
description: "Use when reasoning about conflict — legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform."
atomPath: "agents/registered/legal/conflict"
coordinate: "agents/registered/legal/conflict · 5/round · f56f454d"
contentUuid: "c82c68d6-a79d-51b1-ba63-70db2cfab2db"
diamondUuid: "9d7a9eeb-b4c9-85a2-8d5c-9e50f4fa2bba"
uuid: "f56f454d-1bce-8792-9344-0e650f633459"
horo: 5
typography:
  partition: agents
  bondDegree: 30
standards:
  - ISO 19011 — the verdict is a deterministic function of the party graph
  - "ISO-19011"
bindings: []
signatures:
  computationUuid: "4550fad0-99c8-8a63-8dcc-e82edcc53adb"
  stages:
    - stage: path
      stageUuid: "b6ecc5c2-88da-858a-8a4d-5f8fd51cefd4"
    - stage: trinity
      stageUuid: "e9d4850e-54d6-8e4a-97ca-4243c107b9f5"
    - stage: boundary
      stageUuid: "2ed61c38-3cae-8798-89b4-ff00d844222d"
    - stage: links
      stageUuid: "4275b08e-9d38-8236-8588-c5412927e339"
    - stage: horo
      stageUuid: "9f8266dd-8289-84a8-93b8-7678b7b6eec6"
    - stage: seal
      stageUuid: "72ae21e1-d760-896e-8d58-4bbf2c16e67a"
    - stage: uuid
      stageUuid: "1aa71a23-5a95-858e-8c9e-d18964400d4a"
version: 2
---
# agents/registered/legal/conflict

legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform.

Extracted from `agents/registered/legal/conflict.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agents/registered/legal]].
