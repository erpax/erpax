---
name: db
description: "Use when reasoning about the store — the stack's outside-infinity end where the request folds to rest; content-addressed (the key IS the content's uuid, no assigned id), append-only, dense zero-entropy core with infinite tamper-cost, deduping by the merge law."
atomPath: db
coordinate: "db · 8/crest · aa6d37c1"
contentUuid: "815264c0-6f99-5573-a155-c6dd7e8a1bdf"
diamondUuid: "191ba814-ea12-85a7-9cff-b5ad3db0ec35"
uuid: "aa6d37c1-6412-87b4-8f3e-d654d5a883f8"
horo: 8
typography:
  partition: db
  bondDegree: 27
standards:
  - "content-addressed storage (RFC 9562 §5.8 UUIDv8) · append-only (the akashic record)"
bindings: []
signatures:
  computationUuid: "ca2b3fe9-3f10-8b54-ac2f-f73b479823a7"
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
      stageUuid: "4cdb5ad1-be00-8823-af3d-ddbcf68a3da2"
    - stage: seal
      stageUuid: "d54757e6-4a64-87c0-93c4-37e2ba702649"
    - stage: uuid
      stageUuid: "989bc627-3b4b-8f14-bdea-b3c50c3173a0"
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
