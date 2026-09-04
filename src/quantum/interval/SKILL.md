# quantum/interval — the light cone is not a matter of opinion, and that is what a ledger seals on

Special relativity's decidable core, proved for **all integers** rather than checked on a carrier, and carrying one consequence this corpus actually needs.

Natural units, `c = 1`. A separation is `(Δt, Δx) : Int × Int`. A boost by rational β = p/q is applied **unnormalized** — without γ = q/√(q²−p²), which is irrational for almost every β and would drag the whole development into floating point, where a comparison is a rounding. Dropping γ multiplies the interval by the **positive integer** q²−p², so every claim about **sign** — timelike vs spacelike, before vs after — is untouched. Those signs are the entire causal content.

## The theorem the ledger rests on

erpax seals a chain of rows and **the seal is order-dependent** — reversing the rows changes every receipt after the first and changes the root. So a ledger ordering rows by coordinate time is well-defined only where that order is frame-independent.

`timelike_order_absolute` says exactly where that is: **the closed forward cone, and nowhere else.** `spacelike_order_reverses` exhibits the counter-frame — for `0 < t < x` the boost β = (2t+1)/(2x) is subluminal and sends Δt ↦ −x. Two honest observers then disagree about which write came first, and both are right.

## What a test corrected in the physics

`sealable` was first written strictly timelike (`x² < t²`). The exhaustion then found every frame agreeing on precisely the **null** separations it excluded — because a light signal carries causation, so its time-order is absolute for the same reason a timelike one is. The set is the **closed** cone, `x² ≤ t²`. The error was in the physics and the enumeration is what found it.

A second test found `mirror(36)` silently drawing 432: the function took an `n` it never used. A signature that accepts an argument and ignores it is a lie the type system cannot see.

## Addressing all of it — 17 phenomena, four verdicts

| verdict | count | meaning |
| --- | ---: | --- |
| **theorem** | 10 | proved in `Spacetime.lean`, kernel-accepted, resting on no physics axiom |
| **axiom** | 2 | where physics actually enters: constancy of `c`, and flatness |
| not-stated-here | 2 | true, standard, and honestly absent |
| **refused** | 3 | this corpus has no evidence and will not gesture |

A `theorem` verdict **names** a Lean theorem, and `phenomena()` **reads the file** to confirm it — the discipline [[rules]]/prose enforces on prose, applied to a physics claim. `assertPhenomenaBacked` fails closed; zero is a theorem.

**The two axioms are the honest edge.** Constancy of `c` is Einstein's second postulate — empirical (Michelson–Morley) and, since 1983, *definitional*: the SI metre is fixed from `c`, so `c` is no longer measured at all. Flatness means every theorem here is **special** relativity; curvature, and therefore all of general relativity, is outside all of it.

**What is refused, and why the refusal matters here.** erpax's own [[quantum]]/ftl measures a **computational speedup** — a dimensionless log-ratio of work avoided. That is not a velocity, and reading it as physical FTL is a category error between two quantities with different dimensions. Nothing in this file yields faster-than-light travel or signalling, and nothing can.

**Honest boundary.** This is flat, 1+1-dimensional spacetime over the integers. It proves the causal structure and the order facts that follow from it; it does not prove time dilation as a coordinate statement (that needs γ, hence the reals), the twin case, or anything about gravity. Every theorem rests on `propext · Classical.choice · Quot.sound` and nothing else — no `sorryAx`.

**Law — [[law]]: a ledger may seal only on causal order. Where two events are spacelike-separated there is no "the" order — a subluminal observer sees the reverse, and a receipt chained on coordinate time is sealing an accident of frame.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: the verdict table is checked against the kernel file.

Composes: [[quantum]] · [[merge]] · [[rules]]/prose · [[law]].
