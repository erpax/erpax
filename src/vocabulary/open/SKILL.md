---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 2/share · dfffa2a4"
contentUuid: "fef316dc-2a44-5aa8-aeaf-05e4c68a0556"
diamondUuid: "97ce3f74-3d88-8788-b562-79cb96b8309d"
uuid: "dfffa2a4-4e44-887b-b44b-3d9bf35841a3"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "daae6536-8c9c-874d-abcf-8e01bf4b113e"
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
      stageUuid: "8965aa67-95d5-8b39-a40f-548a8f92746a"
    - stage: seal
      stageUuid: "a9349a49-543d-8249-acf8-77a5d00e7253"
    - stage: uuid
      stageUuid: "c7d2de4c-2770-841a-9b68-107e7bedba85"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
