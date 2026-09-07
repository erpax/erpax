---
name: closure
description: "Use when reasoning about closure — Use to decide a candidate against an open Millennium Problem. A conjecture has two exits — a proof, which is not a computation, and a refutation, which for several of these IS one. Implements the deciders: zeta evaluates ζ by Borwein's algorithm (verified against ζ(2)=π²/6, ζ(4)=π⁴/90 and the first six known zeros) so refutesRiemann rules on a candidate off-line zero; satisfies checks a SAT certificate exactly so refutesSolver catches a bluffing, wrong-certificate or wrong-verdict solver; refutesBSD compares the two ranks. Three of the seven have no finite candidate a machine can rule on, and those name what a candidate would have to be."
atomPath: "millennium/closure"
coordinate: "millennium/closure · 1/base · d710dac1"
contentUuid: "ba3be58d-e90f-5262-b32f-b28332acf797"
diamondUuid: "96598be2-c646-8993-b9bb-1d88b25f6d0b"
uuid: "d710dac1-bf35-8e08-905c-e78930e68927"
horo: 1
typography:
  partition: millennium
  bondDegree: 19
standards:
  - "ISO 80000-2 — mathematical signs and symbols"
bindings: []
signatures:
  computationUuid: "a47e324c-3d3a-803c-8fe0-83a27736e271"
  stages:
    - stage: path
      stageUuid: "b31ca6c7-4636-8dca-8171-d81aaf0d7974"
    - stage: trinity
      stageUuid: "f70e4ef6-4d24-8572-b77e-36d51c8e867f"
    - stage: boundary
      stageUuid: "b1f1505e-60bc-8f71-aa37-10416efe4552"
    - stage: links
      stageUuid: "a510ca2b-57f9-8445-9f78-579945e953cb"
    - stage: horo
      stageUuid: "c881c2dd-4e11-83e3-a3c5-45e3760d7288"
    - stage: seal
      stageUuid: "7f0d1059-d741-82f5-86bd-33cb655bd9a2"
    - stage: uuid
      stageUuid: "ee899045-96a4-8907-b1bd-16a4a41f8ec5"
version: 2
---
# millennium/closure — the decidable half, computed

A conjecture has two exits. One is a proof, which is not a computation. The other is a **refutation**, and for several of these problems a refutation *is* a computation: a candidate is presented, and a machine decides.

Every function here takes a candidate and returns a decision.

## Riemann — ζ is evaluated, so a candidate zero is checked

`zeta(s)` evaluates ζ by Borwein's algorithm for the alternating eta series, then `ζ(s) = η(s)/(1 − 2^{1−s})`. It is verified before it is used:

```
ζ(2)  = π²/6            to double precision
ζ(4)  = π⁴/90           to double precision
|ζ|   < 1e-12           at each of the first six known nontrivial zeros
|ζ|   > 0.1             at 1/2 + 18i — the check has power, it is not small everywhere
```

`ZETA_TERMS = 60` is **measured**, not chosen: at 40 terms the sixth zero evaluates to 5e-8, at 60 to 8.5e-15, and at 80 accumulated rounding makes it slightly worse again. The test pins all three.

`refutesRiemann(s, ε)` decides: inside the critical strip, off the critical line, `|ζ(s)| < ε`.

## P vs NP — verification is exact, so a claimed solver is testable

`satisfies` checks a certificate in time linear in the clause count. `refutesSolver` runs a claimed decision procedure against it and returns the first disagreement:

| reason | what the solver did |
| --- | --- |
| `no-certificate` | claimed SAT and produced no assignment |
| `bad-certificate` | claimed SAT with an assignment that does not satisfy |
| `wrong-verdict` | claimed UNSAT on an instance enumeration settles as satisfiable |

## The register

`DECIDERS` covers all seven. Three are implemented — Riemann, P vs NP, BSD. Navier–Stokes, Yang–Mills, Hodge and Poincaré have no finite candidate a machine rules on from the data alone, so each names what a candidate would have to be: a blow-up solution on an interval, a constructed measure satisfying the OS axioms, a Hodge class with no algebraic-cycle representation, a simply-connected closed 3-manifold not homeomorphic to S³.

**Law — [[law]]: a refutation is a decision about a candidate, and where the candidate is finite the decision is computable. What the machine cannot take as input, it names.**

Composes: [[millennium]] · [[millennium]]/correspondence · [[rules]]/refutable · [[law]].
