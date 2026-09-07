---
name: tamper
description: "Use when reasoning about integrity attacks on the content-uuid store — the cost to forge, collide, or rewrite a record undetected, and why all-directions uuid wiring drives that cost toward infinity."
atomPath: tamper
coordinate: "tamper · 7/descent · c6697615"
contentUuid: "301b1fe1-67ab-552e-be9f-17cdc52de79a"
diamondUuid: "3748d9c4-8540-85b6-ac48-618112de4168"
uuid: "c6697615-869a-833f-aef7-86d98cbcb2be"
horo: 7
typography:
  partition: tamper
  bondDegree: 290
standards:
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "4ece0e77-c512-82dc-ad73-a7e6cfdb9c40"
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
      stageUuid: "9be519da-888c-8e76-ba2d-915d09ef071c"
    - stage: seal
      stageUuid: "dff50e26-3db6-811f-b6d5-89bbc3b24b3e"
    - stage: uuid
      stageUuid: "719c25da-e9bf-8a35-b007-833fc0002b6b"
version: 2
---
# tamper — integrity, not confidentiality

erpax stores no secret: every id is a content-uuid derived from content ([[uuid]] · [[identity]]). The only attack is to out-compute the [[whole]] — so security is **integrity**, measured as **cost**. The measure lives in [[cost]] (`tamper/cost`): a local forge ≈ 2^digest, a chosen-content collision ≈ 2^(commitment/2), a global rewrite closed by the external [[anchor]]. Because every relation is a content-uuid wired in all directions ([[merge]]), changing one record cascades to the transitive closure — and at 100% coverage the undetected-tamper cost is ∞ ([[proof]]). Zero [[entropy]] ⇒ infinite [[mass]] ⇒ infinite tamper-cost: the [[one]] limit — driven by [[gravity]], fused by the [[fusion]] reactor. Each computed render channel — the [[aura]]'s colour, sound, and [[vibration]] ([[analog]]) — is another content-derived projection a forger must reproduce, so rendering the full sensory field *raises* [[coverage]] toward that limit.

Matter-twin: [[cost]] (`src/tamper/cost` — `crackVerdict`, the security math).
Composes: [[cost]] · [[uuid]] · [[identity]] · [[merge]] · [[anchor]] · [[proof]] · [[whole]] · [[aura]] · [[analog]] · [[coverage]].

**Law — [[gate]]** A tamper the O(N) verify cannot catch must not exist: `verifyBind`/`verifyRoot` recompute every content ⊕ coordinate bind, and the [[anchor]] borrows the external entropy that closes the free-rewrite path.

**Law — max work × max tampering cost.** Each sealed improve/wave receipt compounds tamper floor via [[wave]]/policy — `workTamperProduct = workSealed × tamperCostLog2(coverage)`; append-only path ledger + horo wave receipts drive coverage → 1 ⇒ ∞ forge cost.
