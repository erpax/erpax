---
name: duel
description: "Use when testing through pairs of inverted development teams — a prover that asserts and builds, and a refuter that takes the exact opposite side and attacks it. They are duals (the anti-claim is the claim's negation), always opposed, and the verdict manifests realtime per round. Popper asymmetry: one refutation falls the claim, no amount of proof verifies it — a claim STANDS as not-yet-refuted, never as proven true."
atomPath: duel
coordinate: "duel · 7/descent · 20bbd8f9"
contentUuid: "31ee133b-9323-52f5-ae6c-83997f359d81"
diamondUuid: "f98fd65a-0d76-8966-a1af-62dfa434aca7"
uuid: "20bbd8f9-a317-8323-881b-17c512f0aec7"
horo: 7
typography:
  partition: duel
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "cc1ee045-bac1-84c3-9fec-a6d780e4b231"
  stages:
    - stage: path
      stageUuid: "03bb6adc-8a46-8305-9452-bee3c72e4ee8"
    - stage: trinity
      stageUuid: "64c575e2-9bdf-8154-a73f-654ae51d119e"
    - stage: boundary
      stageUuid: "2dd6f134-0ec1-8148-bf25-8f067132bc05"
    - stage: links
      stageUuid: "723eb80c-8729-8068-9a64-13803b244c4c"
    - stage: horo
      stageUuid: "48180483-47bc-869b-a56f-7c01a9c14881"
    - stage: seal
      stageUuid: "e3f8c36f-4e40-8e59-a750-ca97362ee051"
    - stage: uuid
      stageUuid: "b815e007-eff4-823c-a665-7a29e924d256"
version: 2
---
# duel — inverted teams, opposite sides, manifesting realtime

A single team proving its own work is a mind proving itself — a cycle ([[rules]]/cycle), and the softest kind of test. The stronger test is a **pair of inverted teams**: a **prover** that asserts a claim and builds toward it, and a **refuter** that takes the exact opposite side and attacks it. They are **duals** — the refuter's claim is the prover's, inverted ([[horo]]/antimatter: matter and its negation meeting at the void) — so they can **never** be on the same side. One builds; the other tries to break precisely what was built. Their creation manifests in **realtime**: every round updates the verdict — the claim stands, or it falls.

## The asymmetry is the whole point

It is Popper's ([[rules]]/refutable): a proof **corroborates** but never **verifies** (no number of passing cases proves a universal), while **one** counterexample **falsifies**. So the two teams are *not* symmetric adversaries — the **refuter holds the stronger position**: it needs a single break; the prover needs to survive every attack, forever.

```
round → prover   stands — proved and not refuted; corroborated, never proven true
round → prover   stands — …
round → refuter  refuted — one counterexample falls the claim, whatever the proof
```

`survives(rounds)` folds a realtime stream: the claim survives iff it is **ever** proved and **never** refuted. A hundred proofs stand; one break at the end falls all of it.

## It is the corpus's own laws, turned on development

- **Double-entry** ([[double]]/entry): two opposite sides that must meet — a build with no attack is unbalanced and untested, like a debit with no credit.
- **The double torus** ([[horo]]/lemniscate): the prover winds one way, the refuter the other; the test is the void at their crossing (turning number 0 — the two counter-rotating lobes).

**Honest boundary.** A claim that *stands* is **corroborated** — not yet refuted — never **proven true**; the induction problem is unresolved, and the duel does not resolve it. The refuter's advantage is structural, not a bias: falsification is decisive, confirmation is not. And the pair tests a claim's **survival under attack**, not its truth — a claim can survive every refuter you field and still be false, if the fatal counterexample was never tried.

**Law — [[law]]: test through inverted pairs — a prover and a refuter always on opposite sides, the anti-claim the negation of the claim, their verdict manifesting realtime. A claim stands iff proved and not refuted (corroborated, never proven true); one refutation falls it, no amount of proof verifies it — the refuter holds the stronger side, and that asymmetry IS the test.**

## Standards

- **Popper — falsifiability** — the asymmetry of confirmation and refutation; one counterexample decides.
- **Red-team / property-based testing** — the adversary attacks the exact claim; a build untested by its dual is unbalanced.

Composes: [[horo]]/antimatter · [[claim]] · [[argument]] · [[rules]]/refutable · [[double]]/entry · [[law]].
