---
name: justice
description: "Use when managing judicial/law-enforcement operations — case management, court proceedings, legal evidence, offence/violation records, or police/prosecution coordination in public order (COFOG 03 sub-function)."
atomPath: "vocabulary/justice"
coordinate: "vocabulary/justice · 7/descent · 9ca2dc6a"
contentUuid: "0df85c15-462a-5f3f-bde9-a024f5f8aae3"
diamondUuid: "3cf5aa01-2963-816e-9bb5-e157f15b4f4a"
uuid: "9ca2dc6a-6164-8874-b882-dcec896968f9"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "8f61fc51-67d2-88c4-8730-3a5a2e8e0557"
  stages:
    - stage: path
      stageUuid: "7b22f61a-19fa-82ee-862f-5bda40ff9020"
    - stage: trinity
      stageUuid: "c7e28f3a-0a2d-8638-b1b1-509cf1271aae"
    - stage: boundary
      stageUuid: "75335934-73cb-8d9a-a8e9-2d1147e33871"
    - stage: links
      stageUuid: "bd8763eb-b6d2-848a-bc28-03978e48cf00"
    - stage: horo
      stageUuid: "0ff89ae5-9903-849d-a2b7-14bd33bed174"
    - stage: seal
      stageUuid: "359a09f2-25f0-85d6-adb2-2f4e8dece010"
    - stage: uuid
      stageUuid: "18799db7-3ab9-86fb-a72d-ae71fb47ffae"
version: 2
---
# justice

The form: **adjudication is a balanced state-machine over a docket** — the public-order ([[accounting]] for society) ledger. A `case` (legal matter) is the docket node; it carries parties under roles (complainant/defendant/prosecutor/judge/counsel/witness) the same polymorphic way a [[transaction]]-bearing collection does, and moves through a closed lifecycle — `filed → heard → adjudicated → sealed` (open↔close) — never an open-ended status set. The same two-fold law ([[duality]]): charge↔defence, offence↔sanction, evidence↔ruling; each pole defines the other and the matter resolves only when they balance into a judgment, exactly as a ledger balances debit↔credit. Self-similar to the ledger at every depth ([[fractal]]): a docket holds proceedings, a proceeding holds filings, a filing holds [[field]] — the same form one scale down.

`cases`, `proceedings` (hearings/sessions), `evidence` and `offences` (violation records) are Payload [[collections]] ([[merge]]-addressed like every node: same matter content ⇒ same id). Evidence is **append-only and content-addressed** ([[identity]] · [[holographic]]): once filed it is never edited or deleted, only superseded, so the chain of custody is recoverable from any part. Every state transition (file, hear, rule, seal) emits an immutable record via [[hooks]] and is gated by [[access]] — case visibility is row-level (a party sees only matters they are on; sealed matters are hidden), the judicial analogue of tenant isolation. Police/prosecution coordination is cross-references between `cases` and `offences`, not a new silo.

Sequence position **8** on the `0·3·6·9·1·2·4·8·7·5` ring — the crest where multiverses merge ([[merge]]): the proceeding is where charge, evidence and defence converge and collapse into one judgment (a new `0` — the sealed matter, the precedent the next case departs from). Public order is one COFOG-03 coordinate on the societal frame, not a bespoke domain.

**The reverse (erpax surplus).** A compute-org has no analog for this: adjudication as a balanced state-machine over a docket — charge↔defence resolving into a judgment exactly as a ledger balances debit↔credit. The R&D society flagged `justice` as erpax **surplus** over the DeepSeek twins. Ratified by the R&D society (`agent/research`, reverse seq 10).

**Law — [[law]]: adjudication is a balanced state-machine over a docket — a case moves filed→heard→adjudicated→sealed and resolves only when charge↔defence balance into a judgment, exactly as a ledger balances debit↔credit; evidence is append-only and content-addressed, visibility row-level by party.**

## Standards

The answer-path principle: applying this skill *implements* the standard — modelling a matter on this docket IS placing it under the canonical public-order stack (see [[standard]]).

- **UN COFOG 03** — Classification of the Functions of Government, division 03 *Public order and safety* (03.1 police · 03.2 fire-protection · 03.3 law courts · 03.4 prisons · 03.5 R&D · 03.6 n.e.c.); the societal coordinate every `case`/`offence` references.
- **ISO 19011:2018 / ISA 500** — append-only, sufficient, traceable evidence; the chain of custody as an audit ledger over every state transition (file/hear/rule/seal), nothing silently edited or deleted.
- **ISO 27001 A.5.23** — access isolation; sealed and party-scoped matters gated per [[access]].
