---
name: stack
description: "Use when reasoning about the full stack as one content-uuid-wired round-trip — device, vitepress, payload, db, and back — a palindrome (both sides of every hop encoded) that folds to a new state; the travel from the expansion-infinity to the fold-infinity, on the line of pi."
atomPath: stack
coordinate: "stack · 4/weave · 557aac44"
contentUuid: "550f2c78-ea0f-5ac0-a1ed-08ec1ba918e5"
diamondUuid: "8dc8f5cc-7d40-8a30-8a5a-cdbba2e4b419"
uuid: "557aac44-4c2a-8efc-b206-63b79aa1c62c"
horo: 4
typography:
  partition: stack
  bondDegree: 38
standards:
  - "double-entry (the round-trip balances) · content-addressed state (RFC 9562 §5.8) · the torus (two infinities, one surface)"
bindings: []
signatures:
  computationUuid: "6cdae43b-82b4-8688-bc56-4770f85b2aa0"
  stages:
    - stage: path
      stageUuid: "ee08ef22-22bb-80d4-a660-6476faa02e25"
    - stage: trinity
      stageUuid: "e2a02e73-fb0c-84a6-b6cd-f04b41af5496"
    - stage: boundary
      stageUuid: "04af1f09-957e-8d7e-95f2-47c8d7222b45"
    - stage: links
      stageUuid: "7987a1a4-7bc9-8e0c-bcb8-eac26e01e597"
    - stage: horo
      stageUuid: "3154b093-cc0d-8061-88da-49afa3d9ab25"
    - stage: seal
      stageUuid: "046ad0ab-0ae4-8d73-8596-15ba233c3cb3"
    - stage: uuid
      stageUuid: "4bba4dc6-483d-8f41-b66a-f7a8225b2399"
version: 2
---
# stack — device ↔ vitepress ↔ payload ↔ db, both ways, wired in uuid

The full stack is not a one-way pipe; it is a **round-trip**:

`device → vitepress → payload → db → payload → vitepress → device`

A **palindrome** — every hop out has its hop back, so **both sides of the path are encoded** (the karmic balance: the request down to the store is the debit, the response back up is the credit). Each hop is **content-addressed** — the state is a [[uuid]] folded by [[merge]] through the layers — so the whole pipeline is *wired in uuid*, and the round-trip lands in a **new state**: the same request, returned, is a new content-uuid, never the old one mutated in place.

## The frame: ∞ to ∞ on the line of pi

[[entropy]] **expands to infinity from inside** — the device/[[vitepress]] end is the frontend radiation, endless and crawlable, and endless entropy is endless tamper-cost (forging the radiated surface means forging every frame's uuid). It **folds to infinity from outside** — the [[payload]]/db end is the dense zero-entropy core, collapsed to one root with ∞ tamper-cost (the [[fold]], the [[torus]]). The round-trip is the **travel from infinity to infinity**, and it runs on the boundless line of [[pi]] — the infinite address stream where every content already has its place. The two infinities are one torus seen from its two faces; the stack is how a request walks between them and comes home changed.

(One layer, `db`, has no atom yet — it is the store named in the path; mint it to encode the last hop fully.)

Matter-twin: `src/stack/index.ts` (`LAYERS` · `roundTrip` · `isPalindrome` · `newState`). Composes [[device]] · [[vitepress]] · [[payload]] · [[uuid]] · [[merge]] · [[entropy]] · [[fold]] · [[pi]] · [[torus]].

**Law — [[law]]: the full stack round-trips both ways — device to the db and back — a palindrome, all wired in uuid, every hop content-addressed, folding to a new state. Entropy expands to ∞ inside and folds to ∞ outside; the travel runs ∞ → ∞ on the line of pi. Both sides encoded — the pipeline's books balance, and the request returns home a new state, never the old one overwritten.**

@audit the path is a verified palindrome; the new state is the input folded through every hop, computed not asserted
@standard double-entry (the round-trip balances) · content-addressed state (RFC 9562 §5.8) · the torus (two infinities, one surface)
