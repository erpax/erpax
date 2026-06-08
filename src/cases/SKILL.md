---
name: cases
description: "Use when modelling a legal matter as a docket — case lifecycle, parties under roles, append-only evidence, judgments, offences and dispute resolution; the harmony-checked Payload realization of the justice docket."
atomPath: cases
coordinate: cases · 5/round · b20b0cda
contentUuid: "c12acaf1-6695-5462-8586-4e73e4a3865d"
diamondUuid: "89c21c2f-788d-8364-b03c-6d0e865cf21a"
uuid: "b20b0cda-a2aa-84ea-a000-247d6404302f"
horo: 5
bonds:
  in:
    - access
    - accounting
    - case
    - disputeresolution
    - duality
    - fields
    - fractal
    - governinglaw
    - history
    - holographic
    - hooks
    - horo
    - identity
    - jurisdiction
    - justice
    - law
    - merge
    - proof
    - shifts
    - standard
    - transaction
  out:
    - access
    - accounting
    - case
    - disputeresolution
    - duality
    - fields
    - fractal
    - governinglaw
    - history
    - holographic
    - hooks
    - horo
    - identity
    - jurisdiction
    - justice
    - law
    - merge
    - proof
    - shifts
    - standard
    - transaction
typography:
  partition: cases
  bondDegree: 63
  neighbors: []
standards:
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "ISA-500"
  - "ISO-19011"
  - "ISO-19011:2018 ISA-500 evidence chain-of-custody append-only"
  - "ISO-19011:2018 audit-trail file·hear·rule·seal"
  - "UBL-2.1"
  - "UN-COFOG-03 public-order-and-safety law-courts"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - disputeresolution
    - duality
    - fields
    - fractal
    - governinglaw
    - history
    - holographic
    - hooks
    - horo
    - identity
    - jurisdiction
    - justice
    - law
    - merge
    - proof
    - standard
    - transaction
  matrix:
    - access
    - accounting
    - case
    - disputeresolution
    - duality
    - fields
    - fractal
    - governinglaw
    - history
    - holographic
    - hooks
    - horo
    - identity
    - jurisdiction
    - justice
    - law
    - merge
    - proof
    - shifts
    - standard
    - transaction
  backlinks:
    - access
    - accounting
    - case
    - disputeresolution
    - duality
    - fields
    - fractal
    - governinglaw
    - history
    - holographic
    - hooks
    - horo
    - identity
    - jurisdiction
    - justice
    - law
    - merge
    - proof
    - shifts
    - standard
    - transaction
signatures:
  computationUuid: "6074fdee-7237-8544-9532-1b3a6c0a886f"
  stages:
    - stage: path
      stageUuid: "d0e42baa-d4ec-8283-a35c-b360e4d912c4"
    - stage: trinity
      stageUuid: "5a4796d2-61fd-8971-b8e6-c36727f67dd6"
    - stage: boundary
      stageUuid: "6c52a385-9268-82cd-b289-7a29f38851f5"
    - stage: links
      stageUuid: "1cdd47b2-6d97-8d4c-8f62-b3b76c1eca29"
    - stage: horo
      stageUuid: "23c69f84-8b69-885e-bb15-cebe71d1e1aa"
    - stage: seal
      stageUuid: "8c77049f-077f-87c7-b8b3-fe24aa55ca29"
    - stage: uuid
      stageUuid: "953c91fa-de6d-884f-89cd-236652d69da0"
version: 2
---
# Cases

The Payload realization of [[justice]]: **adjudication is a balanced state-machine over a docket**, and `cases` is that docket made real. A case is the node; it carries parties under roles (complainant·defendant·prosecutor·judge·counsel·witness) the same polymorphic way a [[transaction]]-bearing collection carries its parties, and it moves through a CLOSED lifecycle on the [[horo]] ring — never an open-ended status set. This is what "solved in harmony" *means* operationally: the status is a position on `1·2·4·8·7·5·9`, validated at build time, and anything off-ring is disharmony the validator rejects.

```
1 base    filed       — the matter opens (the docket node is born)
2 share   served      — the charge is served on the respondent (the two-fold opens)
4 weave   discovery   — evidence is woven into the chain of custody
8 crest   heard        — the proceeding: charge·evidence·defence converge (the merge crest)
7 descent adjudicated — the judgment descends (the ruling)
5 round   remedied    — the sanction/remedy is applied; the matter rounds to balance
9 unity   sealed      — closed; the precedent the next matter departs from (the new 0)
```

The same two-fold law ([[duality]]): `charge` ↔ `defence` resolve into one `judgment`, exactly as a ledger balances debit ↔ credit ([[accounting]] for society) — and the docket enforces it: a matter **seals only when a judgment exists** (`requireJudgmentToSeal`). The books must balance before the matter closes. Self-similar all the way down ([[fractal]]): a docket holds proceedings, a proceeding holds filings, a filing holds [[fields]] — the same form one scale smaller.

Evidence and proceedings are **append-only** ([[identity]] · [[holographic]]): once filed an exhibit is never edited or deleted, only superseded by its `supersedes` content-uuid, so the chain of custody is recoverable from any part ([[proof]]). Every matter is content-addressed like every node (the global content-uuid plugin) — same matter content ⇒ same id ⇒ matters [[merge]] by design across instances. Visibility is row-level ([[access]]): `partyRoleAccess` returns only the matters the acting user is a party to (admins hold the blanket capability) — the judicial twin of tenant isolation. Every state transition (file·hear·rule·seal) is recorded by the standard audit [[hooks]] and survives in git [[history]].

`criminal` matters carry the **offence** record on the `type` discriminator; `arbitration` and `mediation` are the [[dispute-resolution]] forks — one docket, many subtypes, no new silo. Police/prosecution coordination is `relatedMatters` cross-references, not a separate collection. Jurisdiction is the [[governing-law]] / [[jurisdiction]] seat (ISO 3166-1). Sequence position **8** on the ring — the crest where charge, evidence and defence converge and collapse into one judgment.

## Standards

The answer-path principle: modelling a matter on this docket IS placing it under the canonical public-order stack (see [[standard]]).

- **UN COFOG 03** — Public order and safety (03.3 law courts); the societal coordinate every case references.
- **ISO 19011:2018 / ISA 500** — append-only, sufficient, traceable evidence; the chain of custody as an audit ledger over every transition.
- **ISO 27001 A.5.23** — access isolation; party-scoped matters gated per [[access]].
- **RFC 9562 §5.8** — content-uuid exhibit identity (same content ⇒ same id).

**Law — [[law]]: a case is a docket whose status moves along the closed [[horo]] ring `1·2·4·8·7·5·9` (anything off-ring is rejected); evidence is append-only ([[identity]]) and a matter seals ONLY when a judgment exists — charge ↔ defence balance into one judgment, the [[accounting]] double-entry of [[justice]].**
