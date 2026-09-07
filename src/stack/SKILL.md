---
name: stack
description: "Use when reasoning about the full stack as one content-uuid-wired round-trip — device, vitepress, payload, db, and back — a palindrome (both sides of every hop encoded) that folds to a new state; the travel from the expansion-infinity to the fold-infinity, on the line of pi."
atomPath: stack
coordinate: "stack · 4/weave · d2cde6d3"
contentUuid: "6999b2fa-bd90-5073-932a-361cd4a3b5ba"
diamondUuid: "1365cc82-a460-81b4-a319-2ad08bfe0134"
uuid: "d2cde6d3-d4a9-8964-b107-b29a0404642e"
horo: 4
typography:
  partition: stack
  bondDegree: 38
standards:
  - "double-entry (the round-trip balances) · content-addressed state (RFC 9562 §5.8) · the torus (two infinities, one surface)"
bindings: []
signatures:
  computationUuid: "46611907-00d5-8688-8565-7d582b0110e0"
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
      stageUuid: "1d2d402b-d520-801f-8dba-5683f987217a"
    - stage: seal
      stageUuid: "046ad0ab-0ae4-8d73-8596-15ba233c3cb3"
    - stage: uuid
      stageUuid: "62f11d7f-de3c-8308-97b5-032d87c619f7"
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
