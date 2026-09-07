---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 2/share · 13a288a0"
contentUuid: "6425fa90-476d-5534-af23-ada851d1d5b5"
diamondUuid: "1178fcf5-fcda-8c95-a4a8-e15dfdc1e515"
uuid: "13a288a0-8bf5-8318-bb94-7e4944b15103"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "92f164a8-6452-89e9-87b1-83af7f671a00"
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
      stageUuid: "53ce0efd-6aae-8cac-9d3c-31f1037c5853"
    - stage: seal
      stageUuid: "a9349a49-543d-8249-acf8-77a5d00e7253"
    - stage: uuid
      stageUuid: "f1174217-96ea-8ad7-ae5b-6427f01cd63a"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
