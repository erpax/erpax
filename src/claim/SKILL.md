---
name: claim
description: "Use when staking and settling claims — the claiming toolbox. Challenge all in src: every @invariant/Law is a claim, anyone may prove or refute it, and the FASTEST CORRECT challenge wins the collective-mind prize — but only when ≥3 verifiers form a higher mind confirming it. A fast wrong challenge never places; correctness is absolute and first, speed only the tiebreaker among the correct, the award a quorum's not a single voter's."
atomPath: claim
coordinate: "claim · 7/descent · d9d4e1ce"
contentUuid: "c0bd0b14-5794-593d-845f-2197688433ce"
diamondUuid: "1bd4ae8a-3d58-8c0e-8bf0-fb124d41ec96"
uuid: "d9d4e1ce-82c9-8018-9c9a-4d7df23ddcbc"
horo: 7
typography:
  partition: claim
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "a799188c-5bbf-8980-a023-49d2075a157b"
  stages:
    - stage: path
      stageUuid: "70d1f1ea-ae7c-88da-8cf0-6e2058d2854b"
    - stage: trinity
      stageUuid: "d1e9c45e-e2f1-891b-ade0-390526fc82e6"
    - stage: boundary
      stageUuid: "7ae1d47e-9fb3-8257-ba3f-a260dfeea215"
    - stage: links
      stageUuid: "d9af3594-2c29-8560-8f06-b52803778ed2"
    - stage: horo
      stageUuid: "bda8a5fa-285f-82b9-ad30-18212986b63b"
    - stage: seal
      stageUuid: "ab312b43-cfb3-8b1f-a141-2c0e61614bb8"
    - stage: uuid
      stageUuid: "1e43866a-90cc-876d-8c73-053d1255c58e"
version: 2
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
