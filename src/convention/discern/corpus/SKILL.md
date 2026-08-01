---
name: corpus
description: "Use to see every security claim erpax makes as one number — passing verdicts over total public claims across the registered claim-bearing atoms. The evidence PROSE is declared beside each atom's claims and the OUTCOME comes from actually running the named suites, because neither half alone is evidence: a declaration with no run is a tautology, a green run with no declaration says nothing about what was tested. Fails closed on a failing verdict; reports the ratio without ratcheting it, since a compass is a legitimately open surface with a named owner."
atomPath: "convention/discern/corpus"
---

# convention/discern/corpus — every security claim, as one number

[[convention]]/discern types a single atom's claims. This runs the same instrument over **all of them at once** — and that is the form the metric has to take to matter. A per-atom ratio is a local opinion; `passing verdicts / total public claims` across the corpus is a figure a reviewer can hold the project to.

```
discern — integrity 62.5% · 10/16 claims proven
  verdicts 10 (failing 0) · compasses 6
  OPEN  entropy.hwKeyProvisioning  — attested boot + secure-element key injection   [security]
  OPEN  threshold.mOfN             — a vetted Shamir implementation, pinned         [security]
  OPEN  anchor.slhDsaSigning       — a pinned FIPS 205 implementation + NIST KATs   [security]
  OPEN  anchor.mlKemChannel        — a pinned FIPS 203 implementation, per SP 800-227
  OPEN  anchor.fnDsa               — FIPS 206 final + KATs                          [security]
  OPEN  anchor.hqc                 — HQC final standard                             [security]
```

**Six open surfaces, each with what closes it and who owns closing it.** That page is worth more than a 100% claimed by assertion, and the number moves only when a library is pinned and a proof is written.

## The two halves of evidence come from different places

| half | where it lives | why |
| --- | --- | --- |
| what a proof **exercises**, and what would **break** it | `EVIDENCE`, exported beside each atom's `CLAIMS` | prose only the author can write — and written once, so a third copy cannot diverge |
| whether it **passed** | this atom, by spawning the named suite | a fact only an execution supplies |

Neither alone is evidence: a declaration with no run is a tautology under a heading, and a green run with no declaration says nothing about *what* was tested. A suite that could not be run returns `undefined`, not `false` — **"did not run" and "ran and failed" are different facts**, and collapsing them lets a missing proof read as a broken one.

## Why the registry is dynamic

The claim-bearing atoms import discern for their types. A static import back would put this aggregator inside a cycle ([[rules]]/cycle: an import loop makes initialisation order an accident). `await import()` inside the function runs long after every module is initialised, so the edge exists at call time and never at load time.

## What it gates, and what it deliberately does not

`assertVerdictsHold` **fails closed on a failing verdict** — a claim asserting a property whose own proof is red is a false statement about security, and there is no acceptable count of those.

The **ratio is reported, never ratcheted.** A compass is a legitimately open surface with a named owner; forcing the number upward would only push honest compasses into dishonest verdicts, which is the exact failure discern exists to prevent.

**Honest boundary.** This covers the **registered** atoms — a surface nobody registered is outside the denominator, so the number is honest about what it covers and silent about the rest. It proves a verdict's suite **passed**, never that the suite is **sufficient**: `wouldFailIf` is the author's claim about their own test, and no gate reads it back.

**Law — [[law]]: a claim asserting a property whose proof is red is a false statement about security, and fails closed. The integrity ratio is reported, because a compass is an open surface, not a defect.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a claim is measured, or it is not made.

Composes: [[convention]]/discern · [[anchor]]/claims · [[entropy]]/source · [[entropy]]/threshold · [[rules]]/cycle · [[law]].
