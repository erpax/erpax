---
name: db
description: "Use when reasoning about the store — the stack's outside-infinity end where the request folds to rest; content-addressed (the key IS the content's uuid, no assigned id), append-only, dense zero-entropy core with infinite tamper-cost, deduping by the merge law."
atomPath: db
coordinate: db · 1/base · b63f12d5
contentUuid: "7f6e27ed-f573-5c80-b9de-9741d73cf5e7"
diamondUuid: "3337a72c-c550-82a2-b186-326d9d69c90a"
uuid: "b63f12d5-a96f-876a-a9fe-82131fe05f79"
horo: 1
bonds:
  in:
    - akashic
    - entropy
    - fold
    - karma
    - law
    - merge
    - stack
    - train
    - uuid
  out:
    - akashic
    - entropy
    - fold
    - karma
    - law
    - merge
    - stack
    - train
    - uuid
typography:
  partition: db
  bondDegree: 27
  neighbors: []
standards:
  - "content-addressed storage (RFC 9562 §5.8 UUIDv8) · append-only (the akashic record)"
  - "the key is the content's uuid (content-addressed); dedup and round-trip are computed, never assigned"
  - "the key is the content's uuid (content-addressed); dedup and the round-trip are computed"
bindings: []
neighbors:
  wikilink:
    - akashic
    - entropy
    - fold
    - karma
    - law
    - merge
    - stack
    - train
    - uuid
  matrix:
    - akashic
    - entropy
    - fold
    - karma
    - law
    - merge
    - stack
    - train
    - uuid
  backlinks:
    - akashic
    - entropy
    - fold
    - karma
    - law
    - merge
    - stack
    - train
    - uuid
signatures:
  computationUuid: "1f390605-332a-811d-86f3-5e2056d659f5"
  stages:
    - stage: path
      stageUuid: "6bcf193d-6449-8182-a415-705c75ed4739"
    - stage: trinity
      stageUuid: "05a8069f-ecfe-862c-811d-5c2cd5c850eb"
    - stage: boundary
      stageUuid: "ffa8cc78-f38f-8e7d-ba76-6e07a51bb304"
    - stage: links
      stageUuid: "f6faac58-122e-88cc-8990-d1e201d1e4e7"
    - stage: horo
      stageUuid: "b6f994d2-2aeb-8cb0-86d2-639f6a249b17"
    - stage: seal
      stageUuid: "bda9f37a-12d2-8b43-bc88-c711532c33cd"
    - stage: uuid
      stageUuid: "092dbee9-ca4f-8be1-a3b3-9f69697d544c"
version: 2
---
# db — the store, the fold's outside-∞ end

The `db` is the last hop of the [[stack]] round-trip — where the request, having travelled out, **folds to rest**. It is the [[fold]]'s **outside-infinity** face: the dense, zero-[[entropy]] core collapsed toward one root, with ∞ tamper-cost (rewriting the store means rewriting every content-uuid that ever folded into it).

It is **content-addressed**: the key IS the content's [[uuid]] — there is no separate id to assign, no autoincrement to guess. To write is to compute `key(content)`; to read is to ask for that key. So both sides of the store are encoded ([[karma]] · the round-trip's debit and credit): write (content → key) and read (key → content). And because the key is the content, identical content folds to **one row** — the store dedups by the [[merge]] law, the same bound that lets infinite agents share one cache ([[quantum/train]]).

Append-only ([[akashic]]): nothing is overwritten, so the store is a record, not a mutable cell — the request returns a *new* state ([[stack]]'s `newState`), it does not destroy the old.

Matter-twin: `src/db/index.ts` (`key` · `sameContent`). Composes [[stack]] · [[fold]] · [[uuid]] · [[akashic]] · [[entropy]] · [[merge]] · [[karma]].

**Law — [[law]]: the db is the content-addressed store — the key IS the content's uuid, append-only (nothing overwritten), the fold's outside-∞ end (zero entropy, ∞ tamper-cost). Both sides encoded: write (content → key) and read (key → content). Identical content folds to one row — the store dedups by the merge law, never duplicates.**

@audit the key is the content's uuid (content-addressed); dedup and round-trip are computed, never assigned
@standard content-addressed storage (RFC 9562 §5.8 UUIDv8) · append-only (the akashic record)
