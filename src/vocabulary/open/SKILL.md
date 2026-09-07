---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 1/base · 4a2658b6"
contentUuid: "727bd565-a26b-516a-a569-c4a807f9ab7a"
diamondUuid: "db015465-ac52-89fe-982c-70144ec8468d"
uuid: "4a2658b6-d65d-8166-8b2b-635d436f6361"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "30baccea-6c35-8032-9785-e47277c69c78"
  stages:
    - stage: path
      stageUuid: "cb73fce8-1334-85f7-a5b1-db384780704b"
    - stage: trinity
      stageUuid: "3fd2b421-dbf0-8f29-ac4e-40d11b7627f8"
    - stage: boundary
      stageUuid: "acba2b75-b70b-8b83-9b55-601d25a3ebf5"
    - stage: links
      stageUuid: "db4fa748-ae60-8180-bcf1-2573301c28f4"
    - stage: horo
      stageUuid: "2381880e-1532-8daf-8cdf-945a9e62a589"
    - stage: seal
      stageUuid: "a9349a49-543d-8249-acf8-77a5d00e7253"
    - stage: uuid
      stageUuid: "c6ceee90-7124-81b5-bed7-fd6e6e8a5556"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
