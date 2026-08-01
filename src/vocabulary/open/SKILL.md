---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 7/descent · dff32531"
contentUuid: "5416358f-746e-530c-aeb8-f2c184a653cd"
diamondUuid: "a9416c7c-d742-8a35-88f1-822de6e63b01"
uuid: "dff32531-49af-842c-9f6a-06ebd98e39f8"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "657ffa03-6fb4-8275-90c7-f3af22bb6002"
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
      stageUuid: "fd21ca2d-dca4-8dba-9d4b-30f86626233a"
    - stage: seal
      stageUuid: "2edfd041-a99a-8b46-827d-683e679f762a"
    - stage: uuid
      stageUuid: "1d6c766e-7bc9-82d3-8b50-d9c697f17a75"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
