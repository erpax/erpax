---
name: governance
description: "Use when the polity decides — tallying ballots into a binding verdict, setting quorum and threshold, or proving the count is unstuffable; the judgment a formal system cannot generate for itself, supplied from outside by the society."
atomPath: governance
coordinate: "governance · 1/base · b3459f0f"
contentUuid: "5771676f-e73d-5bd5-b1a7-64226cf664b7"
diamondUuid: "7a62e004-d4dd-8d86-a19f-3a16978b7703"
uuid: "b3459f0f-4442-8900-9d30-50ee5e33cfb2"
horo: 1
typography:
  partition: governance
  bondDegree: 59
standards:
  - "ISO 37000:2021 governance-of-organizations"
  - "ISO 37000:2021 governance-of-organizations`"
  - "ISO-37000"
  - "US-CTA-2021"
  - "one-person-one-vote (Venice Commission Code of Good Practice in Electoral Matters)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a9cd43ba-cd65-872c-8a2d-5be1a576eefd"
  stages:
    - stage: path
      stageUuid: "3444f1ec-f1af-8162-bb01-239926cf030a"
    - stage: trinity
      stageUuid: "d2a68d6a-8b77-80d8-a854-1473be18caa9"
    - stage: boundary
      stageUuid: "3dda70b7-fcb8-8dbd-8752-09e002ca969b"
    - stage: links
      stageUuid: "9cdd0828-d945-8e55-bf7b-0016695adfa8"
    - stage: horo
      stageUuid: "f47c8256-8fff-8ed9-9cf4-d8d52ddb84b3"
    - stage: seal
      stageUuid: "36139b2e-f84f-8ad7-983e-7116defc7efe"
    - stage: uuid
      stageUuid: "ff27fb73-ad43-83b2-915c-c8d899696a7f"
version: 2
---
# governance — the society manages erpax, the half that closes the circle

FORM: **a formal system cannot generate its own finality — so the judgment comes from outside it, by the vote.** erpax manages society (the transparent ledger, [[anti/corruption]], the public organs); but no formalism produces its own judgment (the design limit). So the decision is supplied from OUTSIDE the formalism — by [[society]], through governance. A `tally` of the typeless polity's votes IS the decision erpax could not make internally, and it becomes the binding change to erpax's own rules, skills, budget, config. The governed govern the governor — a self-governing commons, not a technocracy. Pure → testable (`index.test.ts`).

`tally(ballots, electorate, rule)` → a `Verdict`. The same invariants that foreclose corruption foreclose ballot-fraud:

- **one person, one vote** — a later ballot by the same voter REPLACES the earlier (the content-uuid law — a vote's identity is voter+proposal, so a re-vote is the same node updated, never a second). No stuffing ([[identity]], [[merge]]).
- **public count** — the observer POV makes the tabulation transparent ([[proof]]).
- **quorum + threshold** — turnout ≥ quorum AND approval ≥ threshold; the conservation rule of the decision ([[balance]]).

The bar is a dial, not a constant: ordinary [[legislation]] passes at a simple majority, a [[constitution]] amendment at a supermajority — the rule of law is that difference. Governance is the engine the polity drives; what it ratifies, [[legislation]] records as law and the [[constitution]] bounds. It is the law organ's animate half across every [[civilization]].

Sequence position: **6** (round — the deliberation that returns a binding result), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

**The reverse (erpax surplus).** This atom IS the surplus a formal system lacks — the judgment it cannot generate for itself, supplied from OUTSIDE the formalism by the vote (`tally(ballots, electorate, rule) → Verdict`). A compute-org is a formalism; it has no analog. The R&D society flagged `governance` as erpax **surplus** over the DeepSeek twins. Ratified by the R&D society (`agent/research`, reverse seq 11).

**Law — [[law]]: a formal system cannot generate its own finality, so the binding verdict comes from outside it by the vote; one-person-one-vote is the content-uuid law (a re-vote updates the same node) and quorum+threshold is its [[balance]] — an unstuffable count.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 37000:2021 governance-of-organizations`


- **ISO 37000:2021** — governance-of-organizations.
- **Venice Commission Code of Good Practice in Electoral Matters** — one-person-one-vote, the unstuffable count.
