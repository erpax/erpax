---
name: surprisal
description: "Use when reasoning about the information of one event — surprisal I(p) = −log₂(p) bits. A certain event (p=1) carries zero bits; a rare event carries many. It is the bit-cost of a specific outcome, and in erpax the bit-cost of a specific forgery: forging a thing of probability p under the wired graph costs −log₂(p) bits. Additive for independent events (I(p·q)=I(p)+I(q)), so improbabilities stack like uuid-chained dimensions; expected surprisal is Shannon entropy."
---

# surprisal — the bit-cost of one event (−log₂ p)

**Surprisal** is the information of one event: **I(p) = −log₂(p) bits**. A certain event (p=1) carries zero bits; a one-in-a-million event carries ~20. It is the bit-[[cost]] of a **specific** outcome — and in erpax the bit-cost of a specific **forgery**: to forge a thing of probability p under the wired graph costs −log₂(p) bits of work ([[tamper]], the same currency as [[barrier]]'s tunnelling cost and [[anchor]]'s forge≫verify asymmetry).

Surprisal is **additive** for independent events — I(p·q) = I(p) + I(q) — so independent improbabilities **stack**, exactly the way uuid-chained dimensions stack tamper-cost: each wired dimension a forger must also satisfy multiplies the improbability, i.e. adds its bits. The expected surprisal over a whole distribution **is** [[shannon]] entropy (H = Σ pᵢ·I(pᵢ)) — surprisal is the per-event atom, Shannon the average.

Matter-twin: `src/surprisal/index.ts` (`surprisal` / `nats`).

Composes [[shannon]] · [[cost]] · [[tamper]] · [[barrier]] · [[anchor]] · [[proof]] · [[quantum]].

**Law — [[law]]: the information of an event is −log₂(p) bits — zero for a certainty, additive for independent events — so the cost to forge a thing of probability p is −log₂(p) bits, and each wired dimension a forgery must also satisfy adds its bits.**
