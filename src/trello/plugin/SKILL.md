---
name: plugin
description: "Use when syncing an erpax collection's records to Trello cards — the Payload plugin whose afterChange/afterDelete hooks upsert a card per record, idempotently: the Trello card id is written back onto the doc and its presence decides create-vs-update, the write-back carries a context flag so the hook cannot re-enter into an unbounded loop, the card-id field is injected whether or not the plugin is enabled so schema never drifts on an env var, and a delete comments on the card rather than destroying data erpax does not own."
atomPath: "trello/plugin"
coordinate: "trello/plugin · 8/crest · cbb8882b"
contentUuid: "74314289-6740-5a23-9424-c4a082a95cac"
diamondUuid: "9880122a-c10a-8a5b-b339-233b4974d16a"
uuid: "cbb8882b-f187-8815-af4f-b0b9312f9faa"
horo: 8
bonds:
  in:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - trello
    - vitepress
    - worker
  out:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
typography:
  partition: trello
  bondDegree: 43
  neighbors:
    - diamond
standards:
  - "ISO/IEC 25010:2023 §5.3 co-existence (erpax shares Trello's namespace without detriment)"
bindings: []
neighbors:
  wikilink:
    - constitution
    - law
    - perspective
    - trello
  matrix:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
  backlinks:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
signatures:
  computationUuid: "bf4bebb3-a051-839f-ac34-966f1086591a"
  stages:
    - stage: path
      stageUuid: "a30b5ed9-87b1-8f57-8ac0-020cf2a59459"
    - stage: trinity
      stageUuid: "6b7c3afd-d3d1-8362-bb5d-57a1c04ab8f9"
    - stage: boundary
      stageUuid: "313c4d17-bc83-840f-a65a-4b4f4a8908ff"
    - stage: links
      stageUuid: "807184bd-2c3c-8e31-bbbe-4ef9582fe23c"
    - stage: horo
      stageUuid: "4f4bdb41-d1f7-8452-bbcb-381c56318113"
    - stage: seal
      stageUuid: "cdfbf8d1-025f-8e0c-a55a-4a0291fa28ed"
    - stage: uuid
      stageUuid: "377cb6fc-4d27-89d6-a1c1-ef10dd968685"
version: 2
---
# trello/plugin — the record and the card are one thing observed twice

A record and its Trello card are not two objects kept in step; they are **one thing with two faces** ([[perspective]]). The whole engineering question is therefore: what makes a second card **impossible**? The answer is the only one that survives a retry, a redeploy, or a queue replaying a message — the card id is written **back onto the record**, and its presence is what decides create-versus-update. `upsertCard` is where that decision is made, and it is decidable with no network at all, which is why the proof is a unit test rather than a staging environment.

## The three ways this class of plugin breaks

**The write-back re-triggers the hook.** Storing the card id is itself an update, so it re-enters `afterChange` — and a naive implementation writes to Trello again, which writes back again. The Payload `context` flag is the seam: a sync-originated update carries `trelloSync`, and the hook returns on it immediately. Without that, one save is an unbounded remote-write loop. The suite calls the hook a second time *with* the flag and asserts nothing was minted.

**The field appears and disappears with an env var.** The card-id field is injected **always**; only the hooks are conditional on `enabled` plus a client. A schema that changes shape when a credential is absent breaks the migration, not the feature — so a missing token yields an **inert plugin with a stable schema**, never a half-wired one.

**A mapping that matches nothing syncs nothing, forever.** A slug not present in the incoming config **throws** at wiring time. A silent no-op is the worse failure: it reports green while the integration does not exist.

## Deletion is a comment, not a delete

The client ships no delete method by design. A removed record leaves a **comment on its card**: erpax does not destroy data in a system it does not own, and a card that silently vanishes is unauditable from either side. The stale card is the honest residue — named here so it reads as a decision rather than an omission.

## The mapping

One `CardMapping` per collection: `slug` (which collection), `idList` (which Trello list its records become cards in), `name` and optional `desc` (doc → card text), and `cardField` (the doc field holding the card id, `trelloCardId` by default). A board is not addressed directly — a card belongs to a **list**, and the list is what a board's read returns.

| erpax | Trello |
| --- | --- |
| collection | board (indirectly — via the list it maps to) |
| record | card on `idList` |
| record field | card `name` · `desc` |
| `trelloCardId` on the record | the card's id — the sync key |
| record deleted | a comment on the card (never a remote delete) |

## Honest boundary

This proves the **decision** is idempotent — the same doc twice yields one card. It does not make the pair transactional: a Trello create that succeeds while the erpax write-back fails leaves a card whose id no record holds, and the next save mints a second. Closing that needs an outbox with a reconciliation pass, which this atom does not claim. The remote error **propagates** out of the hook rather than being swallowed, so such a save fails loudly — that is the boundary this atom does hold, not a repair.

**Law — [[law]]: a sync is idempotent or it is not a sync — the remote id lives on the record, its presence decides create-versus-update, and the write-back that stores it may never re-enter the hook that caused it.**

## Standards

- **ISO/IEC 25010:2023 §5.3** — co-existence: erpax shares Trello's namespace without detriment to either.

Composes: [[trello]] · [[constitution]] · [[perspective]] · [[law]].
