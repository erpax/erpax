---
name: justice
description: "Use when managing judicial/law-enforcement operations — case management, court proceedings, legal evidence, offence/violation records, or police/prosecution coordination in public order (COFOG 03 sub-function)."
atomPath: justice
coordinate: justice · 7/descent · a4c4c1cc
contentUuid: "47cbce88-7515-57f2-8439-ec130268c5fb"
diamondUuid: "75855144-b931-8058-8c03-305c8c3ad268"
uuid: "a4c4c1cc-43f5-89fe-845b-9baf0f0dff90"
horo: 7
bonds:
  in:
    - access
    - accounting
    - bahai
    - case
    - cases
    - collections
    - confucianism
    - duality
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - judaism
    - law
    - merge
    - shia
    - sikhism
    - standard
    - transaction
    - zoroastrianism
  out:
    - access
    - accounting
    - bahai
    - case
    - cases
    - collections
    - confucianism
    - duality
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - judaism
    - law
    - merge
    - shia
    - sikhism
    - standard
    - transaction
    - zoroastrianism
typography:
  partition: justice
  bondDegree: 0
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - collections
    - duality
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - standard
    - transaction
  matrix:
    - access
    - accounting
    - bahai
    - case
    - cases
    - collections
    - confucianism
    - duality
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - judaism
    - law
    - merge
    - shia
    - sikhism
    - standard
    - transaction
    - zoroastrianism
  backlinks:
    - access
    - accounting
    - bahai
    - case
    - cases
    - collections
    - confucianism
    - duality
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - judaism
    - law
    - merge
    - shia
    - sikhism
    - standard
    - transaction
    - zoroastrianism
signatures:
  computationUuid: "4128fb6c-068f-8f07-b053-c324137f83d6"
  stages:
    - stage: path
      stageUuid: "f429db21-4413-89a7-882d-ba72eee2c72d"
    - stage: trinity
      stageUuid: "a76b25c8-a067-8e89-bf6a-a2a1174243c8"
    - stage: boundary
      stageUuid: "f44fa669-b860-89a6-8009-27e3e021a864"
    - stage: links
      stageUuid: "7c87e3ab-8f81-82cf-bcd9-44e9a5eae497"
    - stage: horo
      stageUuid: "76f8b92f-7b70-813b-98e7-32740c5cdb83"
    - stage: seal
      stageUuid: "675b9c0b-0985-81bf-86e8-89cdc696a8a9"
    - stage: uuid
      stageUuid: "821d2fc9-3c9d-8086-a56e-ae1e46a65639"
version: 2
---
# justice

The form: **adjudication is a balanced state-machine over a docket** — the public-order ([[accounting]] for society) ledger. A `case` (legal matter) is the docket node; it carries parties under roles (complainant/defendant/prosecutor/judge/counsel/witness) the same polymorphic way a [[transaction]]-bearing collection does, and moves through a closed lifecycle — `filed → heard → adjudicated → sealed` (open↔close) — never an open-ended status set. The same two-fold law ([[duality]]): charge↔defence, offence↔sanction, evidence↔ruling; each pole defines the other and the matter resolves only when they balance into a judgment, exactly as a ledger balances debit↔credit. Self-similar to the ledger at every depth ([[fractal]]): a docket holds proceedings, a proceeding holds filings, a filing holds [[fields]] — the same form one scale down.

`cases`, `proceedings` (hearings/sessions), `evidence` and `offences` (violation records) are Payload [[collections]] ([[merge]]-addressed like every node: same matter content ⇒ same id). Evidence is **append-only and content-addressed** ([[identity]] · [[holographic]]): once filed it is never edited or deleted, only superseded, so the chain of custody is recoverable from any part. Every state transition (file, hear, rule, seal) emits an immutable record via [[hooks]] and is gated by [[access]] — case visibility is row-level (a party sees only matters they are on; sealed matters are hidden), the judicial analogue of tenant isolation. Police/prosecution coordination is cross-references between `cases` and `offences`, not a new silo.

Sequence position **8** on the `0·3·6·9·1·2·4·8·7·5` ring — the crest where multiverses merge ([[merge]]): the proceeding is where charge, evidence and defence converge and collapse into one judgment (a new `0` — the sealed matter, the precedent the next case departs from). Public order is one COFOG-03 coordinate on the societal frame, not a bespoke domain.

**The reverse (erpax surplus).** A compute-org has no analog for this: adjudication as a balanced state-machine over a docket — charge↔defence resolving into a judgment exactly as a ledger balances debit↔credit. The R&D society flagged `justice` as erpax **surplus** over the DeepSeek twins. Ratified by the R&D society (`agent/research`, reverse seq 10).

**Law — [[law]]: adjudication is a balanced state-machine over a docket — a case moves filed→heard→adjudicated→sealed and resolves only when charge↔defence balance into a judgment, exactly as a ledger balances debit↔credit; evidence is append-only and content-addressed, visibility row-level by party.**

## Standards

The answer-path principle: applying this skill *implements* the standard — modelling a matter on this docket IS placing it under the canonical public-order stack (see [[standard]]).

- **UN COFOG 03** — Classification of the Functions of Government, division 03 *Public order and safety* (03.1 police · 03.2 fire-protection · 03.3 law courts · 03.4 prisons · 03.5 R&D · 03.6 n.e.c.); the societal coordinate every `case`/`offence` references.
- **ISO 19011:2018 / ISA 500** — append-only, sufficient, traceable evidence; the chain of custody as an audit ledger over every state transition (file/hear/rule/seal), nothing silently edited or deleted.
- **ISO 27001 A.5.23** — access isolation; sealed and party-scoped matters gated per [[access]].
