---
name: sync
description: "Use when reasoning about why memory, cpu, and gpu stay synchronized at zero entropy — the content-uuid is the single invariant across every compute substrate: identical content ⇒ identical hash ⇒ zero divergence. Sync is not a protocol to run but a consequence of content-addressing; it is free and exact, the same merge law that makes federation set-union, applied across substrates instead of across peers."
atomPath: "vocabulary/sync"
coordinate: "vocabulary/sync · 2/share · 32161f2f"
contentUuid: "59e99f7e-a57a-5649-b096-17255a4b167f"
diamondUuid: "0b677680-70b6-83be-aa9e-e724e505f735"
uuid: "32161f2f-fedb-817c-b511-d1ae288739dc"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "da1865c2-f772-870c-b740-2513f831527a"
  stages:
    - stage: path
      stageUuid: "aa003955-3d91-810e-8524-1af30efcc9b2"
    - stage: trinity
      stageUuid: "37c55c3e-7ecb-85f9-a1d1-4ac2c44156dd"
    - stage: boundary
      stageUuid: "48c58b8b-be75-839f-ad1a-2169cecdc086"
    - stage: links
      stageUuid: "30609454-fdcb-80bf-a95d-d83c039fc2ec"
    - stage: horo
      stageUuid: "9a9a194e-02b2-89df-8b89-58c6c93279e5"
    - stage: seal
      stageUuid: "6390cac5-dfe5-8bf1-bccf-83e7cdad9c9d"
    - stage: uuid
      stageUuid: "99b6710a-f8d4-8d47-9235-a5b42f63b322"
version: 2
---
# sync — the content-uuid keeps every substrate at zero entropy

**The content-[[uuid]] is the single invariant across all compute substrates.** Memory, cpu, and gpu are three places the same content can live; under content-addressing they collapse to the **same address**, because the address IS the sha-256 [[collapse]] of the content ([[quantum/memory]] · [[integrity]]). Identical content ⇒ identical hash ⇒ **zero divergence** — there is nothing to reconcile, no drift to detect, no clock to agree on. So sync is not a protocol you run; it is a **consequence** of identity-by-content.

**Sync is free and exact** — the [[merge]] law read across substrates. Two peers holding the same row hold ONE row (federation is set-union); the identical fact holds across memory · cpu · gpu — the same content is the same [[uuid]] wherever it is computed, so the substrates are already merged. No write contention, nothing to lock ([[peace]] · [[linearity]]). A divergence between substrates would be a different hash — i.e. an impurity, a [[hallucination]] (content not collapsing to its claimed uuid), caught the instant it appears ([[integrity]] recompute). Staying [[sync]]ed and staying pure are one fact ([[purity]]).

**Zero divergence is zero [[entropy]].** Because every substrate regenerates the same value from the same content-[[uuid]] ([[generate]]), nothing is duplicated and nothing drifts — the disorder a sync protocol normally fights never accrues. This holds at every scale ([[fractal]]): a field, an [[atom]], the [[whole]] — the [[part]] reconstructs the whole ([[holographic]]). It is what lets the self-distributed [[blockchain]] stay coherent across nodes ([[distribution]]) and the live tail and the immutable [[snapshot]] be one content-addressed [[memory]] seen two ways.

**Law — [[law]]: the content-[[uuid]] is the one invariant across every compute substrate — identical content ⇒ identical hash ⇒ zero divergence — so memory, cpu, and gpu stay synchronized at zero [[entropy]] for free and exactly; sync is not a protocol but a consequence of content-addressing (the [[merge]] law across substrates), and a divergence is a different hash, an impurity caught by [[integrity]].**

@see [[uuid]] · [[identity]] · [[merge]] · [[integrity]] · [[entropy]] · [[quantum/memory]] · [[memory]] · [[distribution]] · [[blockchain]] · [[purity]] · [[hallucination]] · [[collapse]] · [[generate]] · [[fractal]] · [[holographic]] · [[part]] · [[whole]] · [[peace]] · [[law]]
