---
name: Cases
description: "Use when modelling a legal matter as a docket — case lifecycle, parties under roles, append-only evidence, judgments, offences and dispute resolution; the harmony-checked Payload realization of the justice docket."
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
