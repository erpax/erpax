---
name: interval
description: "Use when reasoning about interval — Special relativity's decidable core, proved for **all integers** rather than checked on a carrier, and carrying one consequence this corpus actually needs."
atomPath: "quantum/interval"
coordinate: "quantum/interval · 4/weave · 1d4f25b6"
contentUuid: "c75d9beb-6b9c-5dc8-a434-445d09175ce1"
diamondUuid: "c7b0d9f8-5d51-8fe5-be2b-18c8f2e8cb94"
uuid: "1d4f25b6-1f65-83fe-9c36-7977f3184c7b"
horo: 4
typography:
  partition: quantum
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "e62f7fba-f002-8b09-9694-e2ebd3d819fc"
  stages:
    - stage: path
      stageUuid: "c140b5f2-b1bc-8b06-9204-9bf10f085b71"
    - stage: trinity
      stageUuid: "a8235bac-8c24-8a2e-b3c3-ca6ebb2581ec"
    - stage: boundary
      stageUuid: "b6bb66ea-2e03-8a2f-a08c-bed9fc021715"
    - stage: links
      stageUuid: "afd6a590-43c8-8363-abd3-e5fd5bb78f4e"
    - stage: horo
      stageUuid: "53ac24c3-b910-8fdb-bee0-e741a3b2db7e"
    - stage: seal
      stageUuid: "98adf98f-b215-8aab-bd18-eee8f1c9ce34"
    - stage: uuid
      stageUuid: "4ad88703-493e-86e0-b2c4-12d7dcdf9545"
quantum:
  superposition:
    - dataset
    - law
    - merge
    - quantum
    - rules
    - superposition
  collapse:
    - "Use when reasoning about interval — Special relativity's decidable core, proved for **all integers** rather than checked on a carrier, and carrying one consequence this corpus actually needs."
    - "a ledger may seal only on causal order. Where two events are spacelike-separated there is no \"the\" order — a subluminal observer sees the reverse, and a receipt chained on coordinate time is sealing an accident of frame."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "e62f7fba-f002-8b09-9694-e2ebd3d819fc"
    contentUuid: "c75d9beb-6b9c-5dc8-a434-445d09175ce1"
version: 2
---
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

<sub>content-uuid `c75d9beb-6b9c-5dc8-a434-445d09175ce1` · account `quantum/interval` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
