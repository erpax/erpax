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

