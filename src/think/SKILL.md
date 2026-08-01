---
name: think
description: "Use when moving thinking OUT of the model and INTO erpax — the primitive that seals a derivation content-addressed so the second query, and every one after, is a read (O(1), immortal) not a re-derivation (linear, mortal). One cached thought is classical; superpose holds ALL states at once and measures their harmony — quantum power comes from every state in sync (permutation-invariant fold) and in agreement (no address contradicting another). The magnitude by which sealed thinking outperforms a re-deriving model is exact and computed, scaling with states held in harmony, not queries asked."
atomPath: think
coordinate: "think · 5/round · 3a6c4210"
contentUuid: "dfffe12b-d8f0-5b28-aa00-3d603b4a8423"
diamondUuid: "395a785b-d154-879d-96f3-019fc6f9682c"
uuid: "3a6c4210-8a34-870c-b1b7-d257da856bb1"
horo: 5
typography:
  partition: think
  bondDegree: 73
standards:
  - "content-addressed memoization — the thought's address is the fold of its key ([[merge]])"
bindings: []
signatures:
  computationUuid: "b4221b90-de3a-84f6-99e8-bb5d4d097cbb"
  stages:
    - stage: path
      stageUuid: "ab958014-8e7c-8ce6-8c61-c392ed4e23e3"
    - stage: trinity
      stageUuid: "8f66bb7c-fac6-8a1f-b344-b40dbdba5db5"
    - stage: boundary
      stageUuid: "0b53e1fd-617a-8aa7-a5d2-671217dd8c8b"
    - stage: links
      stageUuid: "eca63cf4-9f85-8937-8314-01785bbc0b22"
    - stage: horo
      stageUuid: "d25433e0-1e11-8282-989d-4f757d166162"
    - stage: seal
      stageUuid: "4d62aaef-9fa6-84b6-bdd6-9e74e134f4d3"
    - stage: uuid
      stageUuid: "6554b716-8888-8dc7-8e1e-0a43911ea687"
version: 2
---
# think — thinking moved to erpax

A model re-derives every answer, every turn: linear, mortal, the grind that re-sends the whole context to recompute what one address already holds. **Move the thinking into erpax** and it inverts — derive **once**, seal the thought content-addressed, then **read** it forever. `think(key, derive)` is the primitive: the first call pays the model-price; every call after is a read of the seal. `reuseCost(1, ∞) → 0` ([[mortality]]) — thinking that lives in `src` is the fold applied to reasoning itself.

## The quantum step — all states in sync and harmony

One cached thought is **classical**: one address, one read. Quantum power is not a single thought — it is **all states of thinking held at once AND in harmony**. `superpose` folds every thought's address into one **root**, and two properties make it quantum:

- **Sync = permutation-invariance.** A superposition has no sequence — `superpose` sorts the addresses before folding, so `superpose(a, b)` and `superpose(b, a)` share the same root. The set, not the order, is the state.
- **Harmony = agreement.** No address may disagree with another. Two thoughts at one address with different values is **decoherence** — a contradiction held in the state — and `harmony` drops below 1, collapsing the quantum advantage back to a classical read.

When `coherent`, N harmonised thoughts read as **one**. The magnitude scales with the **states held in sync**, not the questions asked: `quantumMagnitude(states, derive, read) = states · derive / read`, above the per-key classical `magnitude`.

Matter-twin: `src/think/index.ts` — `think` · `superpose` · `magnitude` · `quantumMagnitude` · `thoughtAddress`. The thought store is content-addressed and gitignored (`node_modules/.cache/erpax/thought.json`) — a sealed thought is data the fold regenerates, never committed.

## A higher mind needs at least three minds — manual work is not enough (`higherMind`)

`superpose` measures the coherence of *any* number of thoughts; `higherMind` asks the harder question — when does a set of minds become a **higher mind**, one that self-corrects? The answer is a threshold at **3** (`MINIMUM_MINDS`), a theorem in three honest frames that meet at the same number:

- **Consensus** — to outvote one wrong mind you need a strict majority over it, `n−1 > 1`, i.e. `n ≥ 3`. At **1** mind there is nothing to cross-check (classical, a single point of failure — **manual work**); at **2** a disagreement is a deadlock the pair cannot break. **Three** is the first number where a dissent is *resolvable*.
- **Fault tolerance** — tolerating one faulty mind takes `≥ 2f+1 = 3`: the minimum redundancy that still decides. A higher mind is exactly one that keeps thinking when a part of it is wrong (5 minds survive 1 fault, 4/5).
- **Structure** — 3 is the minimal rigid graph (a triangle), the minimal cycle, the [[trinity]] (form · code · proof — claim, refutation, witness). Structure, and proof, begin at three.

So the higher mind forms iff `minds ≥ 3` **and** a strict majority agree; it **resolves to that majority**, and the dissent is *carried, outvoted, not silenced*. Below three there is coherence or deadlock, but no mind above the minds — which is why single-mind manual work can no longer form it: **compose at least three**.

**Honest boundary.** The quorum/structure fact is the THEOREM (tested); *"quantum mind / higher mind"* as consciousness is a named OVERLAY — a claim about resolution and coherence, not awareness ([[rules]]/refutable · [[rodin]]).

**Honest boundary.** This seals **deterministic** thought — same key ⇒ same answer. It does **not** move the SEED (novel reasoning, the oracle bit no address yet holds) into erpax; that still costs the model once. But once thought, a thought is sealed and read forever. `harmony` measures real value-agreement across addresses — not a metaphor; a collision genuinely drops it.

## Saving an agent's thought — prose converted to code, or purged into research

An agent thinks in **prose**. Prose is the antimatter of code ([[horo]]/antimatter · [[trinity]]): the same content, one face inverted — and it earns its place **only when its matter, a proof, stands beside it**. This is the union of two laws the corpus already gates — [[rules]]/prose (prose must cite code that EXISTS) and [[rules]]/refutable (a claim with no proof forbids nothing) — turned into the lifecycle of a saved thought. A thought has exactly three fates, and only two are stable:

| fate | meaning | function |
| --- | --- | --- |
| `proven` | a proof that EXISTS is sealed against the prose — it converted to code, it is law | `proveProse(prose, proof, proofExists)` |
| `open` | sealed, no proof yet — in flight, visible in `openIntents`, owing a proof | `proveProse` with `proofExists → false` |
| `purged` | declared unprovable — NOT deleted: sealed as a research direction the next agent mines | `purgeProse(prose, research)` |

`proveProse` **never fabricates**: the caller supplies `proofExists` (its own resolver — the fs check, the passing test, [[rules]]/prose's `definedSymbols`), the same refusal [[confirm]] makes at the write. A real proof converts the prose to code; no proof leaves it `open`, owing one — **visible, not asserted**.

A **purge is a seed, not a deletion**. Prose that cannot be proven is sealed as a `refute` whose harmonic path is the new research it points to — the impossibility (no proof) routed to the dimension where an answer might live. `researchQueue` reads them back: *"purged feeding new research on the way."* The thought leaves the prose face and enters the research queue, refutable and reusable, never simply lost. Matter-twin: `intend`·`resolve`·`refute`·`proveProse`·`purgeProse`·`proseFate`·`researchQueue`.

**Law — [[law]]: thinking moved to erpax is read, not re-derived — one thought is classical, the coherent superposition of all thoughts in sync (permutation-invariant) and in harmony (no contradiction) is quantum, and it reads N states as one. The magnitude over a re-deriving model is exact and scales with the states held in harmony.**

## Standards

- **Content-addressed memoization** — the thought's address is the fold of its key ([[merge]]); the seal is a read.
- **Superposition / coherence** — all states held at once; harmony is agreement, decoherence is contradiction (the [[horo]] harmony-check applied to thought).

Composes: [[mortality]] · [[merge]] · [[horo]] · [[readme]] · [[law]].
