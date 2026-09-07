---
name: duel
description: "Use when testing through pairs of inverted development teams — a prover that asserts and builds, and a refuter that takes the exact opposite side and attacks it. They are duals (the anti-claim is the claim's negation), always opposed, and the verdict manifests realtime per round. Popper asymmetry: one refutation falls the claim, no amount of proof verifies it — a claim STANDS as not-yet-refuted, never as proven true."
atomPath: duel
coordinate: "duel · 5/round · a25b094d"
contentUuid: "13a27ae8-313a-5a04-a40c-9dde7781163f"
diamondUuid: "e3938761-a3e9-8e76-9a4d-c60a6fe2fa2a"
uuid: "a25b094d-03f0-856c-8ec7-16ee2e3b589e"
horo: 5
typography:
  partition: duel
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "a4912db5-c3ad-8848-9213-010ed1b31a85"
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
      stageUuid: "8c1a938d-c3df-8be6-9320-bf81d66bf5a4"
    - stage: seal
      stageUuid: "e3f8c36f-4e40-8e59-a750-ca97362ee051"
    - stage: uuid
      stageUuid: "bd52f37a-1833-8863-92ac-4ae5f206f71a"
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
