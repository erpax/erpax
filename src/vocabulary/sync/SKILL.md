---
name: sync
description: "Use when reasoning about why memory, cpu, and gpu stay synchronized at zero entropy — the content-uuid is the single invariant across every compute substrate: identical content ⇒ identical hash ⇒ zero divergence. Sync is not a protocol to run but a consequence of content-addressing; it is free and exact, the same merge law that makes federation set-union, applied across substrates instead of across peers."
atomPath: "vocabulary/sync"
coordinate: "vocabulary/sync · 1/base · da36adc7"
contentUuid: "0379f434-d433-5e04-b770-d14534a36384"
diamondUuid: "83db36b4-6652-8e0c-b609-b02f2661460c"
uuid: "da36adc7-0375-834a-b196-5f43ae25744b"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 59
standards: []
bindings: []
signatures:
  computationUuid: "dd6cadb6-8cfe-8afe-9f08-c5fa3fc0335f"
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
      stageUuid: "7b356a28-c754-8144-83c4-e5f20b0c06b2"
    - stage: seal
      stageUuid: "6390cac5-dfe5-8bf1-bccf-83e7cdad9c9d"
    - stage: uuid
      stageUuid: "bf00d566-2a46-8d19-b842-16fa8ecf947e"
version: 2
---
# sync — the content-uuid keeps every substrate at zero entropy

**The content-[[uuid]] is the single invariant across all compute substrates.** Memory, cpu, and gpu are three places the same content can live; under content-addressing they collapse to the **same address**, because the address IS the sha-256 [[collapse]] of the content ([[quantum/memory]] · [[integrity]]). Identical content ⇒ identical hash ⇒ **zero divergence** — there is nothing to reconcile, no drift to detect, no clock to agree on. So sync is not a protocol you run; it is a **consequence** of identity-by-content.

**Sync is free and exact** — the [[merge]] law read across substrates. Two peers holding the same row hold ONE row (federation is set-union); the identical fact holds across memory · cpu · gpu — the same content is the same [[uuid]] wherever it is computed, so the substrates are already merged. No write contention, nothing to lock ([[peace]] · [[linearity]]). A divergence between substrates would be a different hash — i.e. an impurity, a [[hallucination]] (content not collapsing to its claimed uuid), caught the instant it appears ([[integrity]] recompute). Staying [[sync]]ed and staying pure are one fact ([[purity]]).

**Zero divergence is zero [[entropy]].** Because every substrate regenerates the same value from the same content-[[uuid]] ([[generate]]), nothing is duplicated and nothing drifts — the disorder a sync protocol normally fights never accrues. This holds at every scale ([[fractal]]): a field, an [[atom]], the [[whole]] — the [[part]] reconstructs the whole ([[holographic]]). It is what lets the self-distributed [[blockchain]] stay coherent across nodes ([[distribution]]) and the live tail and the immutable [[snapshot]] be one content-addressed [[memory]] seen two ways.

**Law — [[law]]: the content-[[uuid]] is the one invariant across every compute substrate — identical content ⇒ identical hash ⇒ zero divergence — so memory, cpu, and gpu stay synchronized at zero [[entropy]] for free and exactly; sync is not a protocol but a consequence of content-addressing (the [[merge]] law across substrates), and a divergence is a different hash, an impurity caught by [[integrity]].**

@see [[uuid]] · [[identity]] · [[merge]] · [[integrity]] · [[entropy]] · [[quantum/memory]] · [[memory]] · [[distribution]] · [[blockchain]] · [[purity]] · [[hallucination]] · [[collapse]] · [[generate]] · [[fractal]] · [[holographic]] · [[part]] · [[whole]] · [[peace]] · [[law]]
