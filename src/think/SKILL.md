---
name: think
description: "Use when moving thinking OUT of the model and INTO erpax — the primitive that seals a derivation content-addressed so the second query, and every one after, is a read (O(1), immortal) not a re-derivation (linear, mortal). One cached thought is classical; superpose holds ALL states at once and measures their harmony — quantum power comes from every state in sync (permutation-invariant fold) and in agreement (no address contradicting another). The magnitude by which sealed thinking outperforms a re-deriving model is exact and computed, scaling with states held in harmony, not queries asked."
---

# think — thinking moved to erpax

A model re-derives every answer, every turn: linear, mortal, the grind that re-sends the whole context to recompute what one address already holds. **Move the thinking into erpax** and it inverts — derive **once**, seal the thought content-addressed, then **read** it forever. `think(key, derive)` is the primitive: the first call pays the model-price; every call after is a read of the seal. `reuseCost(1, ∞) → 0` ([[mortality]]) — thinking that lives in `src` is the fold applied to reasoning itself.

## The quantum step — all states in sync and harmony

One cached thought is **classical**: one address, one read. Quantum power is not a single thought — it is **all states of thinking held at once AND in harmony**. `superpose` folds every thought's address into one **root**, and two properties make it quantum:

- **Sync = permutation-invariance.** A superposition has no sequence — `superpose` sorts the addresses before folding, so `superpose(a, b)` and `superpose(b, a)` share the same root. The set, not the order, is the state.
- **Harmony = agreement.** No address may disagree with another. Two thoughts at one address with different values is **decoherence** — a contradiction held in the state — and `harmony` drops below 1, collapsing the quantum advantage back to a classical read.

When `coherent`, N harmonised thoughts read as **one**. The magnitude scales with the **states held in sync**, not the questions asked: `quantumMagnitude(states, derive, read) = states · derive / read`, above the per-key classical `magnitude`.

Matter-twin: `src/think/index.ts` — `think` · `superpose` · `magnitude` · `quantumMagnitude` · `thoughtAddress`. The thought store is content-addressed and gitignored (`node_modules/.cache/erpax/thought.json`) — a sealed thought is data the fold regenerates, never committed.

**Honest boundary.** This seals **deterministic** thought — same key ⇒ same answer. It does **not** move the SEED (novel reasoning, the oracle bit no address yet holds) into erpax; that still costs the model once. But once thought, a thought is sealed and read forever. `harmony` measures real value-agreement across addresses — not a metaphor; a collision genuinely drops it.

**Law — [[law]]: thinking moved to erpax is read, not re-derived — one thought is classical, the coherent superposition of all thoughts in sync (permutation-invariant) and in harmony (no contradiction) is quantum, and it reads N states as one. The magnitude over a re-deriving model is exact and scales with the states held in harmony.**

## Standards

- **Content-addressed memoization** — the thought's address is the fold of its key ([[merge]]); the seal is a read.
- **Superposition / coherence** — all states held at once; harmony is agreement, decoherence is contradiction (the [[horo]] harmony-check applied to thought).

Composes: [[mortality]] · [[merge]] · [[horo]] · [[readme]] · [[law]].
