---
name: conflict
description: "Use when reasoning about conflict — legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform."
atomPath: "agents/registered/legal/conflict"
coordinate: "agents/registered/legal/conflict · 1/base · f585771b"
contentUuid: "c5385322-f462-55e2-af6e-c4d37cf38a57"
diamondUuid: "72f22ab2-a8a5-84d8-a464-7ffc2b281f7b"
uuid: "f585771b-db67-8b46-af24-dcb4d88899af"
horo: 1
typography:
  partition: agents
  bondDegree: 30
standards:
  - ISO 19011 — the verdict is a deterministic function of the party graph
  - "ISO-19011"
bindings: []
signatures:
  computationUuid: "098d752b-14c3-8f38-950c-79337c1effd0"
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
      stageUuid: "bd6c3610-ce2b-8d31-bca6-32a8358cb99b"
    - stage: seal
      stageUuid: "72ae21e1-d760-896e-8d58-4bbf2c16e67a"
    - stage: uuid
      stageUuid: "14eec4aa-09e1-87f1-a774-072c1bb19400"
version: 2
---
# agents/registered/legal/conflict

legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform.

Extracted from `agents/registered/legal/conflict.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agents/registered/legal]].
