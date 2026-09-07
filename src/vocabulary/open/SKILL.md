---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: "vocabulary/open"
coordinate: "vocabulary/open · 4/weave · faf9afb6"
contentUuid: "d9963a5c-091c-5152-a622-2735b6093395"
diamondUuid: "4a449cd6-a17c-8498-b4d2-7eab64fb1f89"
uuid: "faf9afb6-f834-8c16-9492-a610c1a21d9e"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 47
standards: []
bindings: []
signatures:
  computationUuid: "227d8f3a-176e-8bc8-a75d-0219e63d65eb"
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
      stageUuid: "3d421b8e-7dc6-830c-a4dd-025d299ed4c1"
    - stage: seal
      stageUuid: "a9349a49-543d-8249-acf8-77a5d00e7253"
    - stage: uuid
      stageUuid: "6d2985fc-f5de-8069-9b89-c23abcfae527"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
