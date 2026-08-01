---
name: reversibility
description: "Use when a state transition needs a typed undo — reversibility computes the inverse of an AgentEffect (undo-create, undo-update, undo-emit, undo-audit) or reports cannot-invert with a reason, powering GDPR right-to-erasure, regulatory reversal and undo workflows without per-collection unwind code."
atomPath: "beyond/reversibility"
coordinate: "beyond/reversibility · 1/base · 443a8cd9"
contentUuid: "987841a5-b2bd-5d91-a5de-7d9e5073eb21"
diamondUuid: "4e03c8dd-f731-88e8-9ae6-4c4866a9051c"
uuid: "443a8cd9-0d47-811c-82e4-0eb987635625"
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
  computationUuid: "e14a1877-5921-8084-9d19-bfcb67abcdcd"
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
      stageUuid: "26e54876-32aa-8982-b70e-fba2838e9d18"
    - stage: seal
      stageUuid: "e33897e7-4400-80b7-80e5-ec765abc41e2"
    - stage: uuid
      stageUuid: "ed3d13a7-bc9d-8d45-9632-5d33316cceb6"
version: 2
---
# beyond/reversibility — typed inverse of every state transition

Law 20 of the [[beyond]] horizon: every [[agent]] effect that mutated state carries a typed inverse, so the corpus can be wound back without bespoke per-collection code. `inverseOf` maps each `AgentEffect` kind to its `InverseEffect` — `create` needs the created id, `update` needs the previous state, `emit` and `audit` produce undo/tombstone effects, while calls and external side-effects (notify, escalate, capture) that have left the system boundary report `cannot-invert` with a reason. `isFullyReversible` is true only when every effect in a sequence is invertible given its context.

Matter-twin: src/beyond/reversibility/index.ts (`inverseOf` · `isFullyReversible`) — `InverseEffect` typed in src/beyond/types.

**Law — [[law]]: every reversible state transition has exactly one typed inverse, and an effect that has left the system boundary is honestly marked cannot-invert — never silently dropped; the [[trinity]] proof holds the inverse-exhaustiveness invariant.**

@standard GDPR Art. 17 right-to-erasure
@standard ISO 19011:2018 audit-evidence (reversal trail)
