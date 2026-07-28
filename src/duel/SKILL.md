---
name: duel
description: "Use when testing through pairs of inverted development teams — a prover that asserts and builds, and a refuter that takes the exact opposite side and attacks it. They are duals (the anti-claim is the claim's negation), always opposed, and the verdict manifests realtime per round. Popper asymmetry: one refutation falls the claim, no amount of proof verifies it — a claim STANDS as not-yet-refuted, never as proven true."
atomPath: duel
coordinate: "duel · 5/round · 9c69d390"
contentUuid: "4afcfcc7-b60e-5912-9f1e-b513dcb74b8c"
diamondUuid: "c437c961-4353-8193-999f-b8d548bd2d3c"
uuid: "9c69d390-a129-8975-a8ae-b6ce5f5b9fa8"
horo: 5
bonds:
  in:
    - argument
    - claim
    - double
    - horo
    - law
    - millennium
    - rules
  out:
    - argument
    - claim
    - double
    - horo
    - law
    - millennium
    - rules
typography:
  partition: duel
  bondDegree: 21
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - argument
    - claim
    - double
    - horo
    - law
    - rules
  matrix:
    - argument
    - claim
    - double
    - horo
    - law
    - millennium
    - rules
  backlinks:
    - argument
    - claim
    - double
    - horo
    - law
    - millennium
    - rules
signatures:
  computationUuid: "604d1108-6f3e-834d-877f-f36dbdf68599"
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
      stageUuid: "1b302b42-7c44-8c7c-919d-d945902dd2a3"
    - stage: seal
      stageUuid: "e3f8c36f-4e40-8e59-a750-ca97362ee051"
    - stage: uuid
      stageUuid: "e98da1b7-c587-88d5-99a4-9d591f80ec75"
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
