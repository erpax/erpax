---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 7/descent · f9d6e565"
contentUuid: "520e91ea-790a-5e0c-a9bb-635f4f1ce030"
diamondUuid: "0ce37950-fc89-8fae-a9b8-553838158c05"
uuid: "f9d6e565-ad71-8289-b049-d2e2ab7fd8ab"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 47
standards: []
bindings: []
signatures:
  computationUuid: "f6b0dbc7-0b4f-80e9-ac2f-f22266da9d60"
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
      stageUuid: "7ca1a233-9ea4-8792-b3ff-21b9d97c38c0"
    - stage: seal
      stageUuid: "a9349a49-543d-8249-acf8-77a5d00e7253"
    - stage: uuid
      stageUuid: "173a9805-2f4f-8225-aa1b-3a254d191bf4"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
