---
name: speed
description: "Use when auditing must prove it is fast — pure invariant checkers (counter/referential/bound integrity) whose SQL forms verify a whole ERP history in seconds at zero tokens; measured on etrima's 20-yr 29.7M-row DB at ~24M rows/s."
atomPath: "audit/speed"
coordinate: "audit/speed · 5/round · 730be62d"
contentUuid: "fc9ab673-468c-5b78-bd47-05ab15f6c674"
diamondUuid: "45177c53-2dc4-87c0-b98a-310cf9b56828"
uuid: "730be62d-ebca-8cbe-9e34-dfdd4d93390e"
horo: 5
typography:
  partition: audit
  bondDegree: 14
standards:
  - "BG Наредба Н-18 §СУПТО — the audit trail must be inspectable (a 97.5%-orphaned trail is a finding)"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "f69b4566-8da6-8285-9331-c92074241698"
  stages:
    - stage: path
      stageUuid: "e19ebb5e-3f26-8821-82e2-7084aebe2bfe"
    - stage: trinity
      stageUuid: "27dd0cdf-20fc-8b86-b972-9bc1c7946ab1"
    - stage: boundary
      stageUuid: "26a45fb1-db96-8421-bcb2-821cd717f6c0"
    - stage: links
      stageUuid: "91b70b84-d3f7-8992-b476-808dd34af005"
    - stage: horo
      stageUuid: "48d18306-e5e5-8882-aa31-f1c191a31b41"
    - stage: seal
      stageUuid: "63e87e4a-2c58-83c8-b78d-b8f3cd9b3b0e"
    - stage: uuid
      stageUuid: "dfc5d64c-6bd8-88a5-88b1-0815d04a7d97"
version: 2
---
# audit/speed — a whole ERP history audited in seconds, at no AI bill

The zero-bill-compiler thesis ([[report]]) proven on **real data**. Three invariants over the etrima 20-year manufacturing DB — **3.9GB, 29.7M rows** — including a **24.2M-row audit trail:**

| audit | over | time | found |
| --- | ---: | ---: | --- |
| counter integrity (`lots.lot_variants_count` vs recomputed) | 11,759 lots | **0.079s** | 1 drifted counter |
| bound (`amount_paid ≤ amount_invoiced`) | all lots | **0.053s** | 0 |
| referential integrity (24.2M `version_associations` → `versions`) | **24.2M rows** | **0.877s** | 23.6M orphaned |

**Whole history: 1.01s → ~24.0M rows/s, zero tokens.** No LLM in the loop — the audit is a database query, not a generation. Twenty years of manufacturing records verified faster than a person opens the report. That is what "quantum speed" means concretely: the audit is finished before the auditor finishes asking for it.

## The findings are real, and refutable

- **The counter drift** — lot `3000001` carries a NULL `lot_variants_count` where the recomputation says 0. A cached aggregate that disagrees with its own recomputation is exactly the [[rules]]/refutable law turned on data: a stored count is a claim, and it was contradicted.
- **The 97.5% orphaned trail** — `versions` holds only ids ≥ 5,465,039 (240K recent rows) while `version_associations` references version_ids back to id 11. A retention policy pruned the audit detail without cascading to the association links, so **23.6M of 24.2M audit edges point to purged records.** An auditor flags this: **BG Наредба Н-18 §СУПТО** requires the trail be inspectable, and a trail that is 97.5% dangling is not.

Both were found in under a second, and both are **reproduced** by re-running `ETRIMA_AUDIT_SQL` against the live DB — the proof is a command an auditor reruns, never a number transcribed here ([[rules]]/refutable).

## Pure checkers, finite-complete test

`counterIntegrity`, `referentialIntegrity`, `boundInvariant` run over a row array — pure functions. The test exhausts a small fixture (**finite-complete**, [[theorem]] `assertTestsBounded` — the gate this session sealed forbids a unit test that scans a corpus). The SQL forms in `ETRIMA_AUDIT_SQL` are the same invariants at scale; `auditThroughput` computes the rows/s and marks it `quantum` at ≥ 1M rows/s.

**Honest boundary.** This proves the audit is **fast** and the invariants **catch** their violation class — never that the DB is otherwise **correct** (an invariant not written is not checked). The etrima measurement is single-machine and warm-cache; the metric is a demonstration reproduced by the CLI, not a benchmark guarantee.

**Law — [[law]]: an audit that cannot run at the speed of the data is not an audit — it is a sample. A pure invariant over a whole ERP history, computed at no AI bill, finishes before the auditor finishes asking; the finding is evidence only because a command reruns it.**

## Standards

- **ISO-19011:2018 §6.4** — an audit finding is evidence a reader can recompute.
- **BG Наредба Н-18 §СУПТО** — the audit trail must be inspectable.

Composes: [[audit]]/trail · [[theorem]] · [[rules]]/refutable · [[report]] · [[law]].
