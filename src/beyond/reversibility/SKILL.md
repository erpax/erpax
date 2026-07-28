---
name: reversibility
description: "Use when a state transition needs a typed undo — reversibility computes the inverse of an AgentEffect (undo-create, undo-update, undo-emit, undo-audit) or reports cannot-invert with a reason, powering GDPR right-to-erasure, regulatory reversal and undo workflows without per-collection unwind code."
atomPath: "beyond/reversibility"
coordinate: "beyond/reversibility · 7/descent · 25ba3a58"
contentUuid: "e7b1c1d2-d248-549b-a87b-ca21c16a42bf"
diamondUuid: "3ba9b644-bc5d-8899-a5ed-89b6153cc2de"
uuid: "25ba3a58-e6ef-8a37-9c01-f1921fa11b3a"
horo: 7
bonds:
  in:
    - agent
    - beyond
    - law
    - trinity
  out:
    - agent
    - beyond
    - law
    - trinity
typography:
  partition: beyond
  bondDegree: 13
  neighbors:
    - agent
standards:
  - "EU-2016/679"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "GDPR Art. 17 right-to-erasure"
  - "ISO 19011:2018 audit-evidence (reversal trail)"
  - "ISO 19011:2018 §6.4.6 audit-evidence (reversal trail)"
bindings: []
neighbors:
  wikilink:
    - agent
    - beyond
    - law
    - trinity
  matrix:
    - agent
    - beyond
    - law
    - trinity
  backlinks:
    - agent
    - beyond
    - law
    - trinity
signatures:
  computationUuid: "a6c816c9-ad39-80f0-8877-d23988a5f898"
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
      stageUuid: "947507c6-7690-8593-bfd1-5c5f79b70dda"
    - stage: seal
      stageUuid: "e33897e7-4400-80b7-80e5-ec765abc41e2"
    - stage: uuid
      stageUuid: "73fb48a5-14c7-897c-9229-db3b02b8db46"
version: 2
---
# beyond/reversibility — typed inverse of every state transition

Law 20 of the [[beyond]] horizon: every [[agent]] effect that mutated state carries a typed inverse, so the corpus can be wound back without bespoke per-collection code. `inverseOf` maps each `AgentEffect` kind to its `InverseEffect` — `create` needs the created id, `update` needs the previous state, `emit` and `audit` produce undo/tombstone effects, while calls and external side-effects (notify, escalate, capture) that have left the system boundary report `cannot-invert` with a reason. `isFullyReversible` is true only when every effect in a sequence is invertible given its context.

Matter-twin: src/beyond/reversibility/index.ts (`inverseOf` · `isFullyReversible`) — `InverseEffect` typed in src/beyond/types.

**Law — [[law]]: every reversible state transition has exactly one typed inverse, and an effect that has left the system boundary is honestly marked cannot-invert — never silently dropped; the [[trinity]] proof holds the inverse-exhaustiveness invariant.**

@standard GDPR Art. 17 right-to-erasure
@standard ISO 19011:2018 audit-evidence (reversal trail)
