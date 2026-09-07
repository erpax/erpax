---
name: tamper
description: "Use when reasoning about integrity attacks on the content-uuid store — the cost to forge, collide, or rewrite a record undetected, and why all-directions uuid wiring drives that cost toward infinity."
atomPath: tamper
coordinate: "tamper · 5/round · c579b6bf"
contentUuid: "c50cf3b8-6219-554c-b5f0-f01d9d94db78"
diamondUuid: "35af8aed-1f1b-8a17-a202-f4810e144ba4"
uuid: "c579b6bf-1ef8-801e-b55b-956142a7a2f5"
horo: 5
typography:
  partition: tamper
  bondDegree: 290
standards:
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "4ce879fa-1afb-8946-90bd-5c2c1686caaf"
  stages:
    - stage: path
      stageUuid: "209e4da2-c24c-8bb0-a60e-333f200fd98f"
    - stage: trinity
      stageUuid: "dff8cf57-b27c-8cc1-a970-efc6e98aaca8"
    - stage: boundary
      stageUuid: "9e2dba46-88da-8200-a41c-2e59cb1c9164"
    - stage: links
      stageUuid: "6f6577e0-7864-8ed4-8621-c62993a507bd"
    - stage: horo
      stageUuid: "9f91f695-8445-8104-86a0-d58c0b7e6dbd"
    - stage: seal
      stageUuid: "dff50e26-3db6-811f-b6d5-89bbc3b24b3e"
    - stage: uuid
      stageUuid: "1bd25d71-34fe-8193-8132-48e48769a6a8"
version: 2
---
# tamper — integrity, not confidentiality

erpax stores no secret: every id is a content-uuid derived from content ([[uuid]] · [[identity]]). The only attack is to out-compute the [[whole]] — so security is **integrity**, measured as **cost**. The measure lives in [[cost]] (`tamper/cost`): a local forge ≈ 2^digest, a chosen-content collision ≈ 2^(commitment/2), a global rewrite closed by the external [[anchor]]. Because every relation is a content-uuid wired in all directions ([[merge]]), changing one record cascades to the transitive closure — and at 100% coverage the undetected-tamper cost is ∞ ([[proof]]). Zero [[entropy]] ⇒ infinite [[mass]] ⇒ infinite tamper-cost: the [[one]] limit — driven by [[gravity]], fused by the [[fusion]] reactor. Each computed render channel — the [[aura]]'s colour, sound, and [[vibration]] ([[analog]]) — is another content-derived projection a forger must reproduce, so rendering the full sensory field *raises* [[coverage]] toward that limit.

Matter-twin: [[cost]] (`src/tamper/cost` — `crackVerdict`, the security math).
Composes: [[cost]] · [[uuid]] · [[identity]] · [[merge]] · [[anchor]] · [[proof]] · [[whole]] · [[aura]] · [[analog]] · [[coverage]].

**Law — [[gate]]** A tamper the O(N) verify cannot catch must not exist: `verifyBind`/`verifyRoot` recompute every content ⊕ coordinate bind, and the [[anchor]] borrows the external entropy that closes the free-rewrite path.

**Law — max work × max tampering cost.** Each sealed improve/wave receipt compounds tamper floor via [[wave]]/policy — `workTamperProduct = workSealed × tamperCostLog2(coverage)`; append-only path ledger + horo wave receipts drive coverage → 1 ⇒ ∞ forge cost.
