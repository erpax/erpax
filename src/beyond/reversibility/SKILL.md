---
name: reversibility
description: "Use when a state transition needs a typed undo — reversibility computes the inverse of an AgentEffect (undo-create, undo-update, undo-emit, undo-audit) or reports cannot-invert with a reason, powering GDPR right-to-erasure, regulatory reversal and undo workflows without per-collection unwind code."
atomPath: "beyond/reversibility"
coordinate: "beyond/reversibility · 1/base · 2a0cf4ff"
contentUuid: "a4f94811-258b-547b-9e74-5e1d2232eb46"
diamondUuid: "32c9e69c-4971-8873-89b0-e83573d7fe33"
uuid: "2a0cf4ff-1821-826b-ae33-8f6e8ca9bd19"
horo: 1
typography:
  partition: beyond
  bondDegree: 13
standards:
  - "EU-2016/679"
  - "GDPR Art. 17 right-to-erasure"
  - "ISO 19011:2018 audit-evidence (reversal trail)"
  - "ISO 19011:2018 §6.4.6 audit-evidence (reversal trail)"
bindings: []
signatures:
  computationUuid: "320f7d27-690b-8da8-9788-4d6cbb140b84"
  stages:
    - stage: path
      stageUuid: "63efb5c9-e8e2-8d0f-abe1-5d147f5ec281"
    - stage: trinity
      stageUuid: "30f323e9-b78f-85b4-968c-aded1f831b12"
    - stage: boundary
      stageUuid: "613a18de-8929-87a8-9c4d-b2af00bdb35b"
    - stage: links
      stageUuid: "f78a7716-c860-8354-9915-6d73443a94c1"
    - stage: horo
      stageUuid: "bc16be82-c38c-8b44-a5e4-716c2fa32898"
    - stage: seal
      stageUuid: "8bc00171-9623-80a8-a69b-f8c786cdbcc8"
    - stage: uuid
      stageUuid: "dc4a5539-782e-89a6-8a02-8cdad99e9871"
version: 2
---
# beyond/reversibility — typed inverse of every state transition

Law 20 of the [[beyond]] horizon: every [[agent]] effect that mutated state carries a typed inverse, so the corpus can be wound back without bespoke per-collection code. `inverseOf` maps each `AgentEffect` kind to its `InverseEffect` — `create` needs the created id, `update` needs the previous state, `emit` and `audit` produce undo/tombstone effects, while calls and external side-effects (notify, escalate, capture) that have left the system boundary report `cannot-invert` with a reason. `isFullyReversible` is true only when every effect in a sequence is invertible given its context.

Matter-twin: src/beyond/reversibility/index.ts (`inverseOf` · `isFullyReversible`) — `InverseEffect` typed in src/beyond/types.

**Law — [[law]]: every reversible state transition has exactly one typed inverse, and an effect that has left the system boundary is honestly marked cannot-invert — never silently dropped; the [[trinity]] proof holds the inverse-exhaustiveness invariant.**

@standard GDPR Art. 17 right-to-erasure
@standard ISO 19011:2018 audit-evidence (reversal trail)
