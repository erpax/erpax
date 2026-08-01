---
name: discern
description: "Use when a public claim must be provable rather than asserted — every claim is typed as a verdict (property + the test that exercises it) or a compass (property + what would close it + who owns that). A verdict whose test is absent fails; a verdict whose run returns no evidence of what it exercised, or what would break it, fails as a tautology under a heading. An undeclared public surface throws: silence is never a claim of safety. integrity() is passing verdicts over total claims, hand-set nowhere."
atomPath: "convention/discern"
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
