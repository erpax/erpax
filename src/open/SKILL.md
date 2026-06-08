---
name: open
description: "Use when reasoning about the permitting boundary state in erpax — fiscal period open (postable), draft editable, session/stream open. The universal root of the open state; dual of close."
atomPath: open
coordinate: open · 5/round · 15170f1f
contentUuid: "3dc04c85-102a-589d-a419-6fd5aeb9a27d"
diamondUuid: "5a031943-91a4-85b6-b390-fa1584bf26f3"
uuid: "15170f1f-a4df-85c7-b89c-9524a6502760"
horo: 5
bonds:
  in:
    - accounting
    - atom
    - base
    - begin
    - close
    - decompression
    - defence
    - duality
    - education
    - flow
    - identity
    - law
    - shred
    - versions
    - whole
    - workflow
  out:
    - accounting
    - atom
    - base
    - begin
    - close
    - decompression
    - defence
    - duality
    - education
    - flow
    - identity
    - law
    - shred
    - versions
    - whole
    - workflow
typography:
  partition: open
  bondDegree: 49
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - begin
    - close
    - flow
    - identity
    - law
    - versions
  matrix:
    - accounting
    - atom
    - base
    - begin
    - close
    - decompression
    - defence
    - duality
    - education
    - flow
    - identity
    - law
    - shred
    - versions
    - whole
    - workflow
  backlinks:
    - accounting
    - atom
    - base
    - begin
    - close
    - decompression
    - defence
    - duality
    - education
    - flow
    - identity
    - law
    - shred
    - versions
    - whole
    - workflow
signatures:
  computationUuid: "e7af388e-8991-8d5a-b907-9c256ea4a5fb"
  stages:
    - stage: path
      stageUuid: "7bc13519-daad-8c61-b601-88e9482cee3c"
    - stage: trinity
      stageUuid: "6b18f44c-0e61-8022-b6f5-00a923de2f2a"
    - stage: boundary
      stageUuid: "e748ca7f-11d1-82b7-a3a5-48fe85abeccb"
    - stage: links
      stageUuid: "8203dd67-8643-8ca5-b58d-9f6f2a49b8ab"
    - stage: horo
      stageUuid: "8014c058-f78c-8776-b6d7-fe39b6487e43"
    - stage: seal
      stageUuid: "b9583b91-bfc0-82d1-8f65-238c97f8f53e"
    - stage: uuid
      stageUuid: "06b697eb-d330-8794-b89b-66ec4ae4be9a"
version: 2
---
# open — the permitting state (postable · editable)

`open` is the universal root of the **permitting boundary**: a fiscal period is *open* = postable ([[accounting]]); a draft is editable until it seals ([[versions]]; [[identity]] freeze-on-seal); a session / stream is open. Dual of [[close]]: open admits change, close forbids it. The transition is timestamp-driven — *derived*, not stored ([[begin]]). What is open can still [[flow]].

**Law — [[law]]: open is the permitting boundary — what is open admits change (postable · editable · still able to [[flow]]); the dual of [[close]], and the transition is timestamp-derived, never stored.**
