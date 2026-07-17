---
name: conditional
description: "Use when a claim holds only under an unproven hypothesis — given(H).proves(Y) folds the unprovable into a PROVEN implication H ⇒ Y, keeping H disclosed. The honest complement to rules/refutable: an unfalsifiable assertion is a lie; an unprovable hypothesis, named, proves another thing. Run: tsx src/conditional/index.ts"
---

# conditional — anything unprovable, folded, may prove another thing

[[rules]]/refutable catches the **lie**: an unfalsifiable *assertion*, stated as fact, forbidding nothing. This atom is its honest complement — the unprovable used **honestly**. An unprovable *hypothesis* H, folded into an implication, yields a **proven** theorem `H ⇒ Y`: the implication is provable even when H is not. That is not a lie; it is a **reduction**, and it is the structure of all of cryptography.

## The corpus already lives on one

[[tamper]]/cost says the content-address costs 2⁶¹ to forge — but nobody has **proven** SHA-256 is collision-resistant. It is an assumption, possibly unprovable. What **is** proven is the implication:

```
IF   finding a collision costs 2^(bits/2)     ← the unproven hypothesis, DISCLOSED
THEN the tamper-cost is 2^(bits/2)            ← the theorem — arithmetic, follows unconditionally
```

The unprovable, folded, proves the conditional. The whole security of the corpus is a chain of these, and `FOLDED_ASSUMPTIONS` discloses them in the open: SHA-collision-resistance → the forge floor; factoring-hardness → the RSA anchor; no-large-quantum-computer-yet → the open post-quantum window.

## The one bit that separates it from a lie

**Same unprovable core, opposite honesty.** An unfalsifiable claim asserts Y and hides that it rests on nothing. A conditional theorem asserts `H ⇒ Y` and **names H**. The dishonesty is never the unprovable hypothesis — it is stating Y as a bare fact while hiding H. So `given(H).proves(Y, ⇒)` makes H a first-class, disclosed object, tests the implication (which is real), and keeps the assumption visible — exactly what an auditor demands: *disclose your assumptions* (SOX §302 is a certification about what a statement RESTS on).

**Honest boundary.** This proves the **implication**, never the **hypothesis**. `H ⇒ Y` being a theorem says nothing about whether H is true — if SHA-256 falls, every Y folded on it falls with it, and the disclosure is what lets you **see that in advance** instead of discovering it. Disclosure is not proof; it is the precondition of honest proof.

**Law — [[law]]: the unprovable, disclosed and folded, proves the conditional. `H ⇒ Y` is a theorem even when H is not — and naming H is the one bit that separates a reduction from a lie.**

## Standards

- **ISO-19011:2018 §6.4** — evidence: a conditional finding names its condition.

Composes: [[rules]]/refutable · [[tamper]] · [[merge]] · [[law]].
