---
name: governance
description: "Use when the polity decides — tallying ballots into a binding verdict, setting quorum and threshold, or proving the count is unstuffable; the judgment a formal system cannot generate for itself, supplied from outside by the society."
atomPath: governance
coordinate: governance · 7/descent · a9fe48b6
contentUuid: "4b999649-17cd-5c4d-b3f7-fcf2dd2be306"
diamondUuid: "24604ecc-28e4-8400-9f9c-b022dc7155e1"
uuid: "a9fe48b6-4e72-864e-88f1-986daeeff67a"
horo: 7
bonds:
  in:
    - balance
    - certification
    - civilization
    - committee
    - constitution
    - corruption
    - finality
    - identity
    - law
    - legislation
    - merge
    - principle
    - proof
    - rule
    - separation
    - sequence
    - society
    - voting
  out:
    - balance
    - certification
    - civilization
    - committee
    - constitution
    - corruption
    - finality
    - identity
    - law
    - legislation
    - merge
    - principle
    - proof
    - rule
    - separation
    - sequence
    - society
    - voting
typography:
  partition: governance
  bondDegree: 59
  neighbors: []
standards:
  - "ISO 37000:2021 governance-of-organizations"
  - "ISO-37000"
  - "US-CTA-2021"
  - "one-person-one-vote (Venice Commission Code of Good Practice in Electoral Matters)"
bindings: []
neighbors:
  wikilink:
    - balance
    - civilization
    - constitution
    - corruption
    - identity
    - law
    - legislation
    - merge
    - proof
    - sequence
    - society
  matrix:
    - balance
    - certification
    - civilization
    - committee
    - constitution
    - corruption
    - finality
    - identity
    - law
    - legislation
    - merge
    - principle
    - proof
    - rule
    - separation
    - sequence
    - society
    - voting
  backlinks:
    - balance
    - certification
    - civilization
    - committee
    - constitution
    - corruption
    - finality
    - identity
    - law
    - legislation
    - merge
    - principle
    - proof
    - rule
    - separation
    - sequence
    - society
    - voting
signatures:
  computationUuid: "75ebf19d-06d0-8c39-96aa-193df9c23fad"
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
      stageUuid: "3b3c44b2-f304-852a-bdb3-cfbf935143a7"
    - stage: seal
      stageUuid: "41a1a279-220b-86a2-b4ce-24e1d291cf00"
    - stage: uuid
      stageUuid: "223af183-c1e9-880a-809d-edf3e52979dd"
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

- **ISO 37000:2021** — governance-of-organizations.
- **Venice Commission Code of Good Practice in Electoral Matters** — one-person-one-vote, the unstuffable count.
