---
name: duel
description: "Use when testing through pairs of inverted development teams — a prover that asserts and builds, and a refuter that takes the exact opposite side and attacks it. They are duals (the anti-claim is the claim's negation), always opposed, and the verdict manifests realtime per round. Popper asymmetry: one refutation falls the claim, no amount of proof verifies it — a claim STANDS as not-yet-refuted, never as proven true."
atomPath: duel
coordinate: "duel · 1/base · 35763af5"
contentUuid: "534839ad-956c-5dbc-8bab-3a869e0c954b"
diamondUuid: "4bf613a5-b390-8266-9b58-19cd8d61166d"
uuid: "35763af5-a8c1-83b1-a7cb-45a5dead5901"
horo: 1
typography:
  partition: duel
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "fecf7599-18ac-810f-a632-89ec6e2e9efc"
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
      stageUuid: "f83b4ce2-0dde-8d9f-8f63-6494e314ebc8"
    - stage: seal
      stageUuid: "e3f8c36f-4e40-8e59-a750-ca97362ee051"
    - stage: uuid
      stageUuid: "c8773e00-6a98-8a44-a477-055c043a19b0"
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
