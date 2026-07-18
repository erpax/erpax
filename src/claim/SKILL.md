---
name: claim
description: "Use when staking and settling claims — the claiming toolbox. Challenge all in src: every @invariant/Law is a claim, anyone may prove or refute it, and the FASTEST CORRECT challenge wins the collective-mind prize — but only when ≥3 verifiers form a higher mind confirming it. A fast wrong challenge never places; correctness is absolute and first, speed only the tiebreaker among the correct, the award a quorum's not a single voter's."
---

# claim — challenge all in src; the fastest wins the collective-mind prize

Every law in `src` is a claim — an `@invariant`, a `Law`, a `@standard` — and the corpus's discipline is that a claim must be refutable ([[rules]]/refutable) and carry its proof. This toolbox turns that into an **arena**: `stake` a claim, let anyone **challenge** it (prove or refute), and `award` the fastest correct challenge — but only when the **collective mind** confirms it.

It is a thin layer over what is already here, not a re-derivation ([[catharsis]]: read the present tools first):

- **fastest-correct** is [[competition]]`.compete` — correctness is gated **first** (a fast *wrong* challenge does not place), then speed, ties broken by content-uuid (deterministic).
- **the collective mind** is [[think]]`.higherMind` — the win is awarded only if **≥3 verifiers** form a higher mind whose majority agrees the winner is correct (`MINIMUM_MINDS`). One verifier cannot award it; a pair cannot break its own tie. The *"collective"* in *collective-mind prize* is literal.

```
awarded to fast-correct — fastest correct (cost 3), confirmed by the collective mind (3 minds)
withheld — no collective mind: 1 mind cannot form a higher mind
```

So the prize is not "who is loudest" or "who says yes." It is **the fastest challenge that is correct AND confirmed by a quorum.** Speed is only ever the tiebreaker among the correct; correctness is absolute and first ([[decide]]).

**Honest boundary.** This verifies **resolution** (the challenge actually proves or refutes), never **truth** — a proof that passes the gate can still be about the wrong thing ([[rules]]/refutable). And it awards by a quorum's agreement, which is not the same as being right; it is the best a collective can do, stated in the open. The fastest correct answer confirmed by three minds is what **wins** — not what is thereby **true**. HARMONY ≠ TRUTH, even with a prize on it.

**Law — [[law]]: challenge all in src — every claim is stakeable and refutable, the fastest CORRECT challenge wins ([[competition]]: correctness first, speed the tiebreaker, ties by content-uuid), and the collective-mind prize is awarded only when a quorum of ≥3 verifiers forms a higher mind confirming the winner ([[think]]). A fast wrong challenge never places; a single voter never awards; and winning is resolution, not truth.**

## Standards

- **Popper** — a claim worth a prize is one that can be refuted; the arena is the refutation.
- **BFT / quorum** — the collective needs ≥3 to tolerate one wrong or adversarial verifier.

Composes: [[competition]] · [[think]] · [[decide]] · [[rules]]/refutable · [[law]].
