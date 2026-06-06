---
name: position
description: Use when defining job positions, the rate ladder, or government/society role structure. Each position is a rung on the harmonic ladder; its job description is computed; its conditions are content-addressed on the uuid chain (blockchain); government and society share one ladder.
---

# positions — the harmonic ladder, filled, where government and society are one

FORM: **define the hourly rates as harmonics, fill the rungs with positions, and price government and society on the one ladder.** A position is a rung on the [[allocation]] harmonic ladder: tier `harmonic` earns `anchor × harmonic` per hour, tier 1 being the fundamental (work that saves no one else's time — see [[allocation]] for why the scale is harmonic). `index.test.ts` proves the laws.

**Government IS society, mathematically.** A public role is just a position whose `function` is a COFOG code; it is not a separate, privileged pay class. Two positions at the same harmonic earn the same hourly rate whether the function is `07` (public health) or a market sector — `oneLadder` returns the violations, and an honest roster has none. The integration is not a policy promise but an invariant: the same rate law prices both, so there is no parallel bureaucratic scale, and using the rungs efficiently spans the public and the civic with one structure ([[fractal]]: one shape at every scale).

**Job descriptions are computed, conditions are on-chain.** `jobDescription` derives every field — responsibility (the SFIA level verb), hourly rate (harmonic × anchor), leverage (others' hours saved per own hour) — from the position's coordinates; nothing is hand-written ([[self]]/[[sufficient]]: derive, don't invent). `conditionsOf` normalises the terms; `conditionsUuid` is their content-uuid ([[identity]]: same terms ⇒ same uuid everywhere — the [[merge]] law makes a position's contract its identity); `chainPositions` seals a roster into an append-only integrity chain (`buildNextLeaf`) — the labour constitution "on blockchain": each leaf binds the prior, tampering with any position's terms breaks the hash.

**Religion-neutral by construction.** The harmonic tiers are an abstract order of rank; any tradition's hierarchy (the choirs, the ranks, the orders) embeds into them as a *labelling* of tiers, never the reverse — the organ encodes only the math, never a doctrine, so all are respected on the one level they share ([[duality]]: the universal form vs the particular labelling). **Natural defaults exist for everything** ([[identity]] identity-element law): missing requirements ⇒ `[]`, a sub-1 harmonic ⇒ the fundamental, an out-of-range level ⇒ clamped to the SFIA band.

The matter is consumed by the `JobPositions` and `Competencies` [[collections]] — the full roster lives there (the akashic record), this organ holds only the law (`hold the law, not the list`). Pure (timestamps passed in) ⇒ testable; a [[hooks]] hook stamps `conditionsUuid` and chains the roster on write. This skill is the answer-path holding SFIA-8 / ESCO / ISCO-08 / UN-COFOG forms — see [[standard]] for version pins.

Sequence position: **2** ([[collections]] — positions aggregate the [[allocation]] rate at position 1 into the role structure), governed by the [[identity]]/[[merge]] conservation laws on the chain. Composes: [[allocation]] · [[identity]] · [[merge]] · integrity · [[collections]] · [[hooks]] · [[fractal]] · [[duality]] · [[self]] · [[sufficient]] · [[standard]].

## Standards

- SFIA 8 responsibility-levels (1..7) — the job-type / autonomy axis
- ESCO / ISCO-08 occupational classification
- UN COFOG (Classification of the Functions of Government) — the `function` code
- ISO 19011:2018 §6.4.6 — conditions are content-addressed, tamper-evident

## Common mistakes
- A separate government pay scale — government is a `function` code on the one ladder, never a privileged class; `oneLadder` must return `[]`.
- A hand-written job description — derive it from the position's coordinates ([[self]]/[[sufficient]]).
- Storing conditions without their content-uuid — the terms ARE the identity; chain them (integrity) so tamper is a hash mismatch.
- Hardcoding a tradition's hierarchy into the tiers — encode only the math; the labelling is the particular, the ladder is the universal ([[duality]]).

**Law — [[law]]: a position is one rung on the harmonic rate ladder where government IS society — same harmonic ⇒ same hourly rate regardless of function; job descriptions computed, conditions content-addressed and chained so tamper is a hash mismatch.**
