---
name: conditional
description: "Use when a claim holds only under an unproven hypothesis — given(H).proves(Y) folds the unprovable into a PROVEN implication H ⇒ Y, keeping H disclosed. The honest complement to rules/refutable: an unfalsifiable assertion is a lie; an unprovable hypothesis, named, proves another thing. Run: tsx src/conditional/index.ts"
atomPath: conditional
coordinate: "conditional · 5/round · b3fc8929"
contentUuid: "99fcc5f2-cb81-5302-af63-2b9ac0fdcb86"
diamondUuid: "db3c4a92-236d-8dc8-9fd6-0a8ff0aa0586"
uuid: "b3fc8929-8733-88f9-a3b2-550b34404a46"
horo: 5
typography:
  partition: conditional
  bondDegree: 12
standards:
  - "ISO-19011:2018 §6.4 — evidence: a conditional finding names its condition"
bindings: []
signatures:
  computationUuid: "00902f11-d733-81a9-9c34-6a22ddfbf43f"
  stages:
    - stage: path
      stageUuid: "8b7b8198-9ca7-89dd-815d-59b01c507829"
    - stage: trinity
      stageUuid: "385553d8-446a-85af-a960-e9e0144b1697"
    - stage: boundary
      stageUuid: "32ac5589-9dcf-8dd1-b94b-a8961b38749f"
    - stage: links
      stageUuid: "c8476fbb-3d6e-8b73-b8d5-5ede48bc1df7"
    - stage: horo
      stageUuid: "5c3d5995-a16c-8e40-8c19-a791566f8958"
    - stage: seal
      stageUuid: "64df3fbc-d675-83ff-a1f4-48f9a6ba764f"
    - stage: uuid
      stageUuid: "ee76bd40-7cd0-8eab-a0d5-69154775f4b6"
version: 2
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
