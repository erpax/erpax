---
name: complete
description: "Use when reasoning about complete — Completeness is **required**, and it is not what a single listing reports."
atomPath: "publish/complete"
coordinate: "publish/complete · 2/share · 49f023ad"
contentUuid: "400c39fa-7c24-5ff9-b7bc-a53ffc58f52d"
diamondUuid: "2b3a7ab7-d181-8a1f-8c89-6f92096efbe1"
uuid: "49f023ad-4db2-8f67-bcfa-d5c80c4f9b2a"
horo: 2
typography:
  partition: publish
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "b530d5de-b425-8378-9cd1-d7d98a722200"
  stages:
    - stage: path
      stageUuid: "21ccd664-10e2-8551-aa8b-783e5202a61b"
    - stage: trinity
      stageUuid: "d626f448-c309-80de-8f90-4f01ea2fac61"
    - stage: boundary
      stageUuid: "a740c45b-7dda-8ff5-a25a-c25fa56839b0"
    - stage: links
      stageUuid: "910d8657-f7b1-87a0-a149-3b842f4c37ad"
    - stage: horo
      stageUuid: "9af727fa-b4ec-8697-bd38-55f537a2432d"
    - stage: seal
      stageUuid: "ee37418f-58c8-8749-a6b7-43d61d2c0852"
    - stage: uuid
      stageUuid: "1b4c953a-5c4c-8717-98dc-b3814cf62a31"
version: 2
---
# publish/complete — a count is not a census; compare members, never totals

Completeness is **required**, and it is not what a single listing reports.

## The signature that looks like corroboration and is its opposite

A sibling ran the whole CERN open-data portal. Their record filter was `/record/\d+$`, and CERN ids are not all numeric — `cms-releases-first-batch-of-high-level-lhc-open-data` is one. **The filter dropped 55,821 records and returned exactly 82,385, which is precisely what the REST API reports as its total.**

An independent source agreeing **to the digit** read as confirmation that the broken filter was right. Corrected, the sitemap holds 113,229 record URLs against the API's 82,385, and ~29% of API records are absent from the sitemap: each source omits tens of thousands the other has.

So "consult a second endpoint" is **not** the rule. Two sources agreeing is not completeness, and the exact figure that made the instrument look validated was produced by the instrument being wrong. `agreeingCountsDifferentMembers` is the check that survives this: **equal totals over unequal sets**, reported as a failure rather than as a match.

Before that, the same portal showed OAI-PMH `ListIdentifiers` reporting `completeListSize` **74,614** against the REST API's **82,385** — the protocol built for exhaustive harvesting, **9.4% short, silently**.

## The live case it was built for

Earlier this session the uuid matrix held **3,466** atoms against a corpus of **3,474**. Eight atoms outside the fold, every one of them unsealed, and the cause was found only by comparing a clean atom against a broken one field by field — an hour that this check would have collapsed into one line. Three independent listings now reconcile:

| source | holds | missing |
| --- | ---: | ---: |
| `filesystem-skill-walk` | 3,476 | 0 |
| `readme-listAtomPaths` | 3,476 | 0 |
| `uuid-matrix-nodes` | 3,476 | 0 |

They agree on **members**, not merely on totals — which is the only agreement worth reporting. The replay of the 3,466 state is pinned in the test, so the check is known to fire on the case it was built for rather than assumed to.

**Honest boundary.** The union is a **floor** — it is what somebody saw, never what exists. A member absent from every listing is invisible here by construction, and no reconciliation can fix that; only a source with a different provenance can. `required` names the listings that must be complete, because a filtered view or a stub index may legitimately be a subset and demanding completeness of it would make the gate noise. And this compares identity strings: two sources naming one thing differently read as two members, which inflates the union and understates agreement.

**Law — [[law]]: a count is not a census. Reconcile listings by MEMBER, treat the union as a floor rather than the truth, and read equal totals over unequal sets as the failure it is — an instrument that matches another's number to the digit has not been confirmed by it.**

## Standards

- **OAI-PMH 2.0** — `completeListSize` is a claim by one endpoint, not a census.
- **ISO 19011:2018 §6.4** — audit evidence: coverage must be demonstrable, not asserted.

Composes: [[publish]]/harvest · [[rules]]/domain · [[law]].
