---
name: discern
description: "Use when a public claim must be provable rather than asserted — every claim is typed as a verdict (property + the test that exercises it) or a compass (property + what would close it + who owns that). A verdict whose test is absent fails; a verdict whose run returns no evidence of what it exercised, or what would break it, fails as a tautology under a heading. An undeclared public surface throws: silence is never a claim of safety. integrity() is passing verdicts over total claims, hand-set nowhere."
atomPath: "convention/discern"
coordinate: "convention/discern · 7/descent · 0e8361ca"
contentUuid: "408bbfb8-a079-5a3a-83a8-349be1e02ad3"
diamondUuid: "521cfbb6-1cee-8c2f-bf9c-c0ef5126ece6"
uuid: "0e8361ca-597a-83e8-8e09-69dc4da80e87"
horo: 7
typography:
  partition: convention
  bondDegree: 16
standards:
  - "ISO-19011:2018 §6.4 — audit evidence: sufficient and appropriate, not merely present"
  - "ISO/IEC 25010:2023 §5.5 — testability: a claim that cannot be exercised cannot be met"
bindings: []
signatures:
  computationUuid: "f66ea6f7-73a8-8bce-92cb-6a311d847811"
  stages:
    - stage: path
      stageUuid: "4795a0c5-4000-860e-8830-16e40fcc9b76"
    - stage: trinity
      stageUuid: "a6bc0a6f-7b7d-8c72-b69c-26c8c53e7d40"
    - stage: boundary
      stageUuid: "0f58b43b-49ff-814a-9f23-8de364effc05"
    - stage: links
      stageUuid: "d8f2a417-81e7-8ced-bc23-5e87b2537aac"
    - stage: horo
      stageUuid: "9d81bba7-1148-8ffe-a940-976c1efef353"
    - stage: seal
      stageUuid: "3756238b-a4b4-8c8f-905b-3138adddc437"
    - stage: uuid
      stageUuid: "43b376e0-c2c7-805e-a199-27ce935c07b0"
version: 2
---
# convention/discern — a claim is a verdict or a compass, and nothing else

[[constitution]] Rule 1 is *claim no result you have not computed*. This gives that rule a type.

| kind | shape | meaning |
| --- | --- | --- |
| **verdict** | `{ property, measuredBy }` | proven by a test that **exercises** the property |
| **compass** | `{ property, closedBy, owner }` | an honest direction, with what would close it and who owns that |

The third possibility — a claim that is neither — is what this abolishes. It reads exactly like a verdict, is worth exactly as much as a compass, and nothing in a codebase tells them apart at a glance.

## The measurement that matters is not "is there a test"

A test named beside a claim proves the claim has a **neighbour**, not that it is measured. [[rules]]/refutable found 64 `@invariant`s with no proof at all; the subtler failure is a proof that runs and asserts nothing — `expect(true).toBe(true)` under a security heading.

So a run must return **evidence**:

```ts
{ exercised: 'signed a root, flipped one byte',
  wouldFailIf: 'verification accepted the mutated byte', passed: true }
```

`wouldFailIf` is the load-bearing field. **A test nothing can break proves nothing**, and a run that cannot name its own breaker is rejected. Three failures are distinguished because they are different: the test is **absent**, the test is a **tautology**, or the test **failed**.

## What it refuses

- **A verdict wearing a hedge** — both `measuredBy` and `closedBy` — is refused, not resolved. The author must decide whether the property is proven or is a direction.
- **A compass with no owner** is a wish.
- **An undeclared surface throws.** A surface with no claim is not *assumed safe*; it is undeclared. That is `noExpectation` applied to attention — dismissal must be a typed claim that justifies itself.

## integrity

```
integrity = passing verdicts / total public claims
```

Hand-set nowhere. It rises **only** when a compass becomes a tested verdict, and falls the moment a verdict stops holding. A compass dilutes it, as it should. An atom with no claims scores **0, never 1** — nothing declared is nothing proven, the same rule [[agent]]/receipt applies to a session that asserted nothing.

## Honest boundary

This makes a claim **declared** and its measurement **checkable** — never that the property is **true**. A verdict proves its test exercised something and would break under a named mutation; whether that mutation is the one an attacker would make is a human judgement no type can reach. And `measuredBy` is resolved by whatever run the caller supplies: a dishonest runner reporting fake evidence defeats it, exactly as a human-seeded record defeats [[agent]]/receipt.

**Law — [[law]]: a public claim is a verdict or a compass. A verdict names the test that exercises its property and returns evidence; a compass names what would close it and who owns that. A claim that is neither is undeclared, and an undeclared surface fails the build.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a claim that cannot be exercised cannot be met.
- **ISO-19011:2018 §6.4** — audit evidence: sufficient and appropriate, not merely present.

Composes: [[constitution]] · [[rules]] · [[convention]] · [[law]].
