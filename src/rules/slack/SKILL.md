---
name: slack
description: "Use when reasoning about slack — Every gate in this corpus asks one question: **is this claim stronger than the evidence?** A -proved theorem listed as proven. A directory tree of folders that do not exist."
atomPath: "rules/slack"
coordinate: "rules/slack · 8/crest · 384c6a31"
contentUuid: "5237385d-3282-5a17-a1cf-5f333f4d3837"
diamondUuid: "7fbeb723-8138-8f42-90fa-df6a19335453"
uuid: "384c6a31-b900-8c86-88c3-bf6bc15bba96"
horo: 8
typography:
  partition: rules
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "e8b92f94-7079-831e-ad4d-3e1fc2ea503c"
  stages:
    - stage: path
      stageUuid: "efa7045d-0d85-8e31-8e46-a24cfd4c482e"
    - stage: trinity
      stageUuid: "03f1ee77-90a7-8e4e-b532-c91301088490"
    - stage: boundary
      stageUuid: "a57fb0af-c523-88ce-8888-fec36f7b2198"
    - stage: links
      stageUuid: "f0226838-e8f7-8808-8adc-7a2783156793"
    - stage: horo
      stageUuid: "61b29681-d632-8ea9-bb78-d38cbee3d332"
    - stage: seal
      stageUuid: "7dd7aa31-bbf2-87f8-b0c3-770b956b0b6d"
    - stage: uuid
      stageUuid: "c54805fc-51ca-8d2e-994b-2af04fb3b2f8"
version: 2
---
# rules/slack — an under-claim is an over-claim, involuted

Every gate in this corpus asks one question: **is this claim stronger than the evidence?** A `sorry`-proved theorem listed as proven. A directory tree of folders that do not exist. `corpusSolvesAny()` that could not go red. All over-claims, all caught.

**None of them asked the dual.** Apply the involution — flip the polarity of the claim — and an over-claim becomes an **under-claim**: a statement weaker than the evidence. Same defect, reflected. `σ(σ x) = x`, and a corpus that gates only one side of a two-sided coin is gating half a law.

## The measurable form

A ratcheted axis whose **ceiling sits above its live value** is an under-claim. The corpus is better than it says, and the gap is headroom nobody holds: the tree may decay all the way back to the ceiling and **every run stays green**.

Measured on discovery: `diamond-membership` at **live 130, ceiling 261 — 131 unheld**. Half the ceiling holding nothing, created by a fix earlier the same day that dropped the live count and left the claim where it was.

The gate already *advised* this on every improvement — *"lower this axis' baseline in this commit to ratchet the gain."* Advice that stays advice is prose. This makes it a wall, and this corpus's own law is that a law is obeyed only when a gate blocks its violation.

## Both directions, always

`claimBalance` returns `over`, `under` and `exact` — never only the familiar one. An axis it cannot measure is **omitted**, never counted as balanced: *"could not ask"* is not *"in balance"*, which is the conflation this corpus has paid for repeatedly.

Closing slack is safe by construction: `emit-ratchet` is **down-only**, so obeying this gate can never raise a ceiling.

**Honest boundary.** This proves a ceiling **disagrees** with its live value, never that either number is **right** — an axis measuring the wrong thing has both an honest ceiling and a worthless one, which is what `index-cross` turned out to be. It covers only ratcheted numeric axes; a claim in prose, a theorem's strength, or a boundary sentence can under-claim too and nothing here sees it. And zero slack is a snapshot: it is true at the moment of the run and false the next time an axis improves, which is the point — the improvement must be ratcheted in the commit that earns it.

**Law — [[law]]: a claim must match its evidence in BOTH directions. Stated stronger, it is a lie; stated weaker, it is unheld ground the corpus may quietly lose. Ratchet the gain in the commit that earns it, or the gate is guarding a number the tree has already left behind.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a finding is stated to the extent the evidence supports, no more and no less.

Composes: [[duality]]/mirror · [[law]]/folder · [[rules]] · [[law]].

## Notes from the code

Long docstrings live here; the code keeps one line and a pointer.

### `assertNoSlack`

Fails closed on an under-claim, exactly as the corpus fails closed on an over-claim. A gate whose ceiling sits above its live value is not holding what is already true: the corpus may decay back to the ceiling and every run stays green. That is the same defect as a claim stated stronger than the evidence, reflected — and the gate already ADVISES the fix on every improvement ("lower this axis' baseline in this commit to ratchet the gain"). Advice that is only advice is prose; this makes it a wall. Run `tsx src/law/folder/emit-ratchet.ts` to close it — the emitter is down-only, so obeying this can never raise a ceiling.

