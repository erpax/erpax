---
name: conflict
description: "Use when reasoning about conflict — legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform."
atomPath: "agents/registered/legal/conflict"
coordinate: "agents/registered/legal/conflict · 5/round · e90b0bd9"
contentUuid: "0beb2e7b-6335-537f-bb61-3f8cc32fd886"
diamondUuid: "9cae702b-93e4-80b1-a9a9-e9dde19a5087"
uuid: "e90b0bd9-852f-8f13-9b39-47efc0b91961"
horo: 5
typography:
  partition: agents
  bondDegree: 30
standards:
  - ISO 19011 — the verdict is a deterministic function of the party graph
  - "ISO-19011"
bindings: []
signatures:
  computationUuid: "ab970bca-c0b2-89e3-b68f-4fc8430e3aa8"
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
      stageUuid: "b0afdc2d-2e0f-8594-916f-17020f3d3476"
    - stage: seal
      stageUuid: "72ae21e1-d760-896e-8d58-4bbf2c16e67a"
    - stage: uuid
      stageUuid: "d961a2c8-d186-8169-b322-6153fe3e01a6"
version: 2
---
# agents/registered/legal/conflict

legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform.

Extracted from `agents/registered/legal/conflict.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agents/registered/legal]].
