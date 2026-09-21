---
name: hold
description: "Use when reasoning about hold — EU 2015/849 **Art. 33(1)** obliges a firm to report promptly and, where possible, to **refrain from carrying out** a transaction it knows or suspects to be related to criminal…"
atomPath: "rules/hold"
coordinate: "rules/hold · 1/base · 3dc05098"
contentUuid: "f5abd6f1-fc1b-5ee3-8b0b-b7f25506d3df"
diamondUuid: "43fd6c5f-4f74-82a5-abc3-d40c070a50f8"
uuid: "3dc05098-5fbe-89b1-900c-b9f081813702"
horo: 1
typography:
  partition: rules
  bondDegree: 19
standards:
  - "EU 2015/849 Art. 33(1) — refrain from carrying out a SUSPECTED transaction"
  - "EU-2015/849"
  - "EU-2015/849` into `src/access/standard/index.ts`. That"
  - FATF Recommendation 20 — suspicious transaction reporting
bindings: []
signatures:
  computationUuid: "ee36e7be-4083-8624-8e40-15dfb8485c9d"
  stages:
    - stage: path
      stageUuid: "cb031cea-9b9e-881b-bd6c-4d870b3942a9"
    - stage: trinity
      stageUuid: "8c24a650-57fd-805d-9e5e-bc3788db10e0"
    - stage: boundary
      stageUuid: "1bcf394b-f70f-8c1b-a987-3e72cbd08fc5"
    - stage: links
      stageUuid: "de979382-383a-826a-adef-0e7d35f3ae89"
    - stage: horo
      stageUuid: "d5c15d12-58b0-881f-89c5-df9dad2fe495"
    - stage: seal
      stageUuid: "59057265-459f-807a-a8d6-376ceb574343"
    - stage: uuid
      stageUuid: "466aa847-95a4-8835-8603-ca69697a421b"
version: 2
---
# rules/hold — a suspicion verdict may not be consumed without its obligation

EU 2015/849 **Art. 33(1)** obliges a firm to report promptly and, where possible, to **refrain from
carrying out** a transaction it knows or suspects to be related to criminal activity. The software
shape of that obligation is narrow and decidable: a file that reads the verdict must also name the
hold. **Computing a suspicion and executing anyway is the failure the article names.**

| | count (2026-09-21) |
| --- | ---: |
| files that read `reportOwed` | 2 (excluding the defining atom and proofs) |
| that never name `holdBeforeExecuting` | **0** |

Zero is a **theorem**, not a ratchet: there is no acceptable number of suspicions computed and
ignored. The population is not empty — both live consumers already consult the hold — so this is a
wall standing where traffic passes, not a check that cannot fire ([[rules]]/unraised).

## Why this atom exists rather than a banner

`ungatedMandatory` scores a standard on a ladder — **uncited → prose → coded → gated** — where
*gated* means cited in a file under `rules|law|access` that has a `.ts` sibling. EU 2015/849 sat at
**coded**: cited in [[aml]], [[kyc]] and `bank/research`, code that runs with no wall behind it.

The prescribed cure was to write `@standard EU-2015/849` into `src/access/standard/index.ts`. That
file is a real mechanism — `STANDARD_TIER` maps a standard to a required access tier and
`assertAccessCompliant` fails closed below it — but **it has no AML rule**, and **no collection
cites the directive**, because the AML atoms are pure functions with no rows. An unlisted standard
floors at `authenticated`, weaker than AML data demands, and a rule added there would match nothing
([[rules]]/unraised again). The banner would have reported zero while enforcing nothing.

So the axis reached zero as a **consequence** of writing the wall, never as the goal.

## Parsed, never matched

`boundNames` returns names a file BINDS; a mention in a comment or a string literal is not a use,
and that case is a test. The pair is DECLARED — `VERDICT` and `OBLIGATION` — because no theorem
says these two names travel together; the directive does, and it is written here where it can be
argued with.

**Honest boundary.** This proves the hold is **consulted**, never that a movement was **held** — a
caller may name `holdBeforeExecuting` and discard its answer, and no lexical gate sees that. It
proves nothing about whether a report was filed or retained: AMLD Art. 40 requires five years of
retention, and this corpus computes the verdict without storing it, so the record a supervisor would
ask for does not yet exist. That is a gap in the product, not in this gate, and it is named here
rather than implied to be closed.

**Law — [[law]]: an obligation that travels with a verdict must travel with it in the code. A file
that reads "this is suspicious" and never reads "then hold it" has taken the finding and dropped
the duty.**

## Standards

- **EU 2015/849 Art. 33(1)** — report promptly; refrain from executing a suspected transaction.
- **FATF Recommendation 20** — suspicious transaction reporting.

Composes: [[aml]] · [[rules]] · [[syntax]] · [[law]].
