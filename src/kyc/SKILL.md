---
name: kyc
description: "Use when reasoning about kyc — There is a function this atom refuses to contain, and naming the refusal is the point: **nothing here decides whether a customer is laundering money.** That is not decidable, and…"
atomPath: kyc
coordinate: "kyc · 5/round · 713ab1da"
contentUuid: "f00aecee-5c2e-5e29-9290-8f6f8344dc17"
diamondUuid: "6d7e1a76-43aa-8ad3-b77a-17b5cd299fc8"
uuid: "713ab1da-92f9-8c43-bf92-7ca805860760"
horo: 5
typography:
  partition: kyc
  bondDegree: 19
standards:
  - "EU 2015/849 (AMLD4) as amended by EU 2018/843 (AMLD5) — customer due diligence"
  - "EU-2015/849"
  - "EU-2018/843"
  - "FATF Recommendations 10 · 12 · 22 — CDD, politically exposed persons, DNFBPs"
bindings: []
signatures:
  computationUuid: "5e7f7b19-d08e-8bd3-915f-c03bd71b39f0"
  stages:
    - stage: path
      stageUuid: "2430b177-8a0e-80e0-8f91-9f3dc2051443"
    - stage: trinity
      stageUuid: "d63ae42b-784c-8570-9315-61c356f838c4"
    - stage: boundary
      stageUuid: "2ff6ff8d-f1bb-83cf-b34f-ce5ef72dbeac"
    - stage: links
      stageUuid: "5234cc32-6553-8bd6-a777-01e25d667fb1"
    - stage: horo
      stageUuid: "cc77838a-a5bd-81e3-9cd6-8b607e153457"
    - stage: seal
      stageUuid: "4690d932-5152-820f-ba0a-105ed880af65"
    - stage: uuid
      stageUuid: "c6b44f1e-5585-883f-afc9-b23ba42da85e"
version: 2
---
# kyc — the diligence the law requires, never a verdict on the customer

There is a function this atom refuses to contain, and naming the refusal is the point: **nothing
here decides whether a customer is laundering money.** That is not decidable, and a green verdict
from a function that claimed it would be the most dangerous artefact in this corpus — a bank would
point at it. [[rules]]/audience names the shape exactly: a claim addressed to the one reader who
signs, with nothing able to contradict it.

What **is** decidable is which level of diligence the directive obliges, given facts a human has
already established. That is what `diligenceLevel` returns.

| trigger | level | article |
| --- | --- | --- |
| politically exposed person | **enhanced** | Art. 20–23 |
| high-risk third country | **enhanced** | Art. 18a |
| documented lower risk, no enhanced trigger | simplified | Art. 15–17 |
| otherwise | standard | Art. 13 |

## Enhanced dominates, and it is an ordered check rather than a score

A weighted risk score lets a strong low-risk signal cancel a mandatory trigger. **That is the
failure banks are fined for**, so it is structurally impossible here: the PEP and third-country
checks run first and return, and no `lowRiskProduct` finding can reach past them. The test plants
exactly that combination (`politicallyExposed` **and** `lowRiskProduct`) and asserts `enhanced`.

## The bands decide whether diligence is owed at all

`dueDiligenceRequired` is a separate question from the level, and the boundaries differ by the kind
of movement — a transfer of funds is **above** €1,000 (Art. 11(b)(ii)) while cash is **at or above**
€10,000 (Art. 11(c)). Off-by-one there is not a style matter; it is the difference between a file
that exists and one that does not. Both edges are pinned.

`THRESHOLD` is **declared** in the open. These are facts the directive assigns, not values derived
from anything, and a member state or an institution may set a stricter floor — which is arguable
here rather than discovered inside a hook.

**Honest boundary.** `identificationComplete` is a property of the **set of items**, never of their
contents: a forged passport and a real one both produce an `identity` item, and this cannot tell
them apart. It proves a file is complete for a level; it proves nothing about whether the evidence
is genuine, whether the level was assessed on true facts, or whether the customer is who they say.
Every input is someone else's finding.

**Law — [[law]]: compute the obligation, never the guilt. A rule may decide what the law requires
of a file; only a person and a court decide what a customer did — and a function that blurs the two
hands a bank a defence it does not have.**

## Standards

- **EU 2015/849 (AMLD4)** as amended by **EU 2018/843 (AMLD5)** — customer due diligence.
- **FATF Recommendations 10 · 12 · 22** — CDD, politically exposed persons, DNFBPs.

Composes: [[aml]] · [[rules]]/audience · [[rules]]/refutable · [[law]].
