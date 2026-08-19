---
name: cases
description: "Use when modelling a legal matter as a docket — case lifecycle, parties under roles, append-only evidence, judgments, offences and dispute resolution; the harmony-checked Payload realization of the justice docket."
atomPath: cases
coordinate: "cases · 4/weave · 743a8554"
contentUuid: "bbb0213e-d7ce-516c-9569-e9e266d62d0b"
diamondUuid: "565e1eb9-867b-858d-8535-ec66bfa7e817"
uuid: "743a8554-82aa-8a90-a87b-e3239ff97119"
horo: 4
typography:
  partition: cases
  bondDegree: 31
standards:
  - "ISA-500"
  - "ISO-19011:2018 ISA-500 evidence chain-of-custody append-only"
  - "ISO-19011:2018 ISA-500 evidence chain-of-custody append-only`"
  - "UBL-2.1"
  - "UN-COFOG-03 public-order-and-safety law-courts"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3e6f0071-4884-84eb-98fd-692ac294f0b6"
  stages:
    - stage: path
      stageUuid: "d0e42baa-d4ec-8283-a35c-b360e4d912c4"
    - stage: trinity
      stageUuid: "5a4796d2-61fd-8971-b8e6-c36727f67dd6"
    - stage: boundary
      stageUuid: "6c52a385-9268-82cd-b289-7a29f38851f5"
    - stage: links
      stageUuid: "15c2bb01-b8cc-8bb2-bd76-a92207038abb"
    - stage: horo
      stageUuid: "453b769d-517e-89bc-bcfb-c3e532951369"
    - stage: seal
      stageUuid: "7239fbbd-1522-87a8-af0c-a83b363fa2ad"
    - stage: uuid
      stageUuid: "66d31dbf-6b67-8083-985c-c2b18a1a6167"
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

The same two-fold law ([[duality]]): `charge` ↔ `defence` resolve into one `judgment`, exactly as a ledger balances debit ↔ credit ([[accounting]] for society) — and the docket enforces it: a matter **seals only when a judgment exists** (`requireJudgmentToSeal`). The books must balance before the matter closes. Self-similar all the way down ([[fractal]]): a docket holds proceedings, a proceeding holds filings, a filing holds [[field]] — the same form one scale smaller.

Evidence and proceedings are **append-only** ([[identity]] · [[holographic]]): once filed an exhibit is never edited or deleted, only superseded by its `supersedes` content-uuid, so the chain of custody is recoverable from any part ([[proof]]). Every matter is content-addressed like every node (the global content-uuid plugin) — same matter content ⇒ same id ⇒ matters [[merge]] by design across instances. Visibility is row-level ([[access]]): `partyRoleAccess` returns only the matters the acting user is a party to (admins hold the blanket capability) — the judicial twin of tenant isolation. Every state transition (file·hear·rule·seal) is recorded by the standard audit [[hooks]] and survives in git [[history]].

`criminal` matters carry the **offence** record on the `type` discriminator; `arbitration` and `mediation` are the [[vocabulary/dispute/resolution]] forks — one docket, many subtypes, no new silo. Police/prosecution coordination is `relatedMatters` cross-references, not a separate collection. Jurisdiction is the [[vocabulary/governing/law]] / [[jurisdiction]] seat (ISO 3166-1). Sequence position **8** on the ring — the crest where charge, evidence and defence converge and collapse into one judgment.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19011:2018 ISA-500 evidence chain-of-custody append-only`


The answer-path principle: modelling a matter on this docket IS placing it under the canonical public-order stack (see [[standard]]).

- **UN COFOG 03** — Public order and safety (03.3 law courts); the societal coordinate every case references.
- **ISO 19011:2018 / ISA 500** — append-only, sufficient, traceable evidence; the chain of custody as an audit ledger over every transition.
- **ISO 27001 A.5.23** — access isolation; party-scoped matters gated per [[access]].
- **RFC 9562 §5.8** — content-uuid exhibit identity (same content ⇒ same id).

**Law — [[law]]: a case is a docket whose status moves along the closed [[horo]] ring `1·2·4·8·7·5·9` (anything off-ring is rejected); evidence is append-only ([[identity]]) and a matter seals ONLY when a judgment exists — charge ↔ defence balance into one judgment, the [[accounting]] double-entry of [[justice]].**
