---
name: db
description: "Use when reasoning about the store — the stack's outside-infinity end where the request folds to rest; content-addressed (the key IS the content's uuid, no assigned id), append-only, dense zero-entropy core with infinite tamper-cost, deduping by the merge law."
atomPath: db
coordinate: "db · 1/base · dd8e5069"
contentUuid: "227012aa-fbcc-5068-8aa8-359865a9e4e7"
diamondUuid: "973ca1b8-e939-8bac-8c5c-a57f180277f8"
uuid: "dd8e5069-5f8e-8ad7-9ff6-34bc98374e86"
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
  computationUuid: "adf6de13-3f71-8afd-8723-fc88ce18ec48"
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
      stageUuid: "caa7e713-6866-8a7e-98de-6d3dae9435cd"
    - stage: seal
      stageUuid: "d54757e6-4a64-87c0-93c4-37e2ba702649"
    - stage: uuid
      stageUuid: "e09bc259-bb77-803a-a883-75ddcdddfae5"
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
