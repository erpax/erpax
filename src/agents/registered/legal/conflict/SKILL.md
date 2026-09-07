---
name: conflict
description: "Use when reasoning about conflict — legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform."
atomPath: "agents/registered/legal/conflict"
coordinate: "agents/registered/legal/conflict · 5/round · 0c8667fc"
contentUuid: "f7a145dc-31fd-501b-b533-7d69fea42f8c"
diamondUuid: "e411bcc9-484b-8caf-83fd-8b6268e41a1b"
uuid: "0c8667fc-da9c-8d6c-a7d6-6d1d654588b4"
horo: 5
typography:
  partition: agents
  bondDegree: 30
standards:
  - ISO 19011 — the verdict is a deterministic function of the party graph
  - "ISO-19011"
bindings: []
signatures:
  computationUuid: "caa80bbe-5c8c-8e44-94a3-95e0cc801a98"
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
      stageUuid: "4189e2d2-efee-8beb-b67c-952a5e2d8aa2"
    - stage: seal
      stageUuid: "72ae21e1-d760-896e-8d58-4bbf2c16e67a"
    - stage: uuid
      stageUuid: "0070452b-486d-83bd-834e-53d2a2fe5da8"
version: 2
---
# agents/registered/legal/conflict

legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform.

Extracted from `agents/registered/legal/conflict.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agents/registered/legal]].
