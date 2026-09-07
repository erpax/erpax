---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 7/descent · 161ec1d4"
contentUuid: "49c9439d-b73b-5063-8c00-b05092342759"
diamondUuid: "d019a03f-b5e2-8f39-b509-62b347137265"
uuid: "161ec1d4-96c2-80db-ad75-ab247f1f5e51"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 47
standards: []
bindings: []
signatures:
  computationUuid: "9fff101c-bbdf-8abd-b494-547fd2d1c9d5"
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
      stageUuid: "c2887e7e-1e10-82ad-bf46-732c6d1a4960"
    - stage: seal
      stageUuid: "a9349a49-543d-8249-acf8-77a5d00e7253"
    - stage: uuid
      stageUuid: "1f862439-2cbe-8e5b-8537-e5a7660683f1"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
