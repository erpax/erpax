---
name: sync
description: "Use when reasoning about why memory, cpu, and gpu stay synchronized at zero entropy — the content-uuid is the single invariant across every compute substrate: identical content ⇒ identical hash ⇒ zero divergence. Sync is not a protocol to run but a consequence of content-addressing; it is free and exact, the same merge law that makes federation set-union, applied across substrates instead of across peers."
atomPath: "vocabulary/sync"
coordinate: "vocabulary/sync · 2/share · 259702eb"
contentUuid: "c80a8df8-4db4-5945-a699-95c7e961397d"
diamondUuid: "235f8490-be61-811a-ac2c-8649ec7279bd"
uuid: "259702eb-1a5c-866b-9841-43b266ac4dea"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 61
standards: []
bindings: []
signatures:
  computationUuid: "ab49029f-4389-883c-94e9-755d00407a7e"
  stages:
    - stage: path
      stageUuid: "aa003955-3d91-810e-8524-1af30efcc9b2"
    - stage: trinity
      stageUuid: "37c55c3e-7ecb-85f9-a1d1-4ac2c44156dd"
    - stage: boundary
      stageUuid: "6f9e1f36-2147-8fa5-aa2b-21508ed6ac48"
    - stage: links
      stageUuid: "a4806eab-ec28-8ce2-a44c-53ade0dfce59"
    - stage: horo
      stageUuid: "a8be0b13-cd54-8230-a8a6-c8d4c66ea5b6"
    - stage: seal
      stageUuid: "6390cac5-dfe5-8bf1-bccf-83e7cdad9c9d"
    - stage: uuid
      stageUuid: "d8e5e1ca-a641-8464-80ce-40838306b075"
version: 2
---
# sync — the content-uuid keeps every substrate at zero entropy

**The content-[[uuid]] is the single invariant across all compute substrates.** Memory, cpu, and gpu are three places the same content can live; under content-addressing they collapse to the **same address**, because the address IS the sha-256 [[collapse]] of the content ([[quantum/memory]] · [[integrity]]). Identical content ⇒ identical hash ⇒ **zero divergence** — there is nothing to reconcile, no drift to detect, no clock to agree on. So sync is not a protocol you run; it is a **consequence** of identity-by-content.

**Sync is free and exact** — the [[merge]] law read across substrates. Two peers holding the same row hold ONE row (federation is set-union); the identical fact holds across memory · cpu · gpu — the same content is the same [[uuid]] wherever it is computed, so the substrates are already merged. No write contention, nothing to lock (peace · [[linearity]]). A divergence between substrates would be a different hash — i.e. an impurity, a [[hallucination]] (content not collapsing to its claimed uuid), caught the instant it appears ([[integrity]] recompute). Staying [[sync]]ed and staying pure are one fact ([[purity]]).

**Zero divergence is zero [[entropy]].** Because every substrate regenerates the same value from the same content-[[uuid]] ([[generate]]), nothing is duplicated and nothing drifts — the disorder a sync protocol normally fights never accrues. This holds at every scale ([[fractal]]): a field, an [[atom]], the [[whole]] — the [[part]] reconstructs the whole ([[holographic]]). It is what lets the self-distributed [[blockchain]] stay coherent across nodes ([[distribution]]) and the live tail and the immutable snapshot be one content-addressed [[memory]] seen two ways.

**Law — [[law]]: the content-[[uuid]] is the one invariant across every compute substrate — identical content ⇒ identical hash ⇒ zero divergence — so memory, cpu, and gpu stay synchronized at zero [[entropy]] for free and exactly; sync is not a protocol but a consequence of content-addressing (the [[merge]] law across substrates), and a divergence is a different hash, an impurity caught by [[integrity]].**

@see [[uuid]] · [[identity]] · [[merge]] · [[integrity]] · [[entropy]] · [[quantum/memory]] · [[memory]] · [[distribution]] · [[blockchain]] · [[purity]] · [[hallucination]] · [[collapse]] · [[generate]] · [[fractal]] · [[holographic]] · [[part]] · [[whole]] · peace · [[law]]
