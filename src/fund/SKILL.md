# fund — the award was a table nothing could point at, and one zero capped every domain

erpax booked government grants correctly under IAS 20 — 31 fields, clawback provisions, the funded
asset, the granting authority. It could not say **which project the grant funded**.

```
edges INTO government-grants:  0   of 1,129
```

The award named its tenant, its entity, its clawback provision and the asset it bought. Nothing
named **it**. So no cost, invoice, milestone, purchase order or report could be attributed to the
grant that paid for it — the row existed and could not participate.

Seven of eight lifecycle stages failed, for **one cause**. And a second blocker sat beside it:
`projects.customer` was **required**, so a grant-funded project could not be saved without inventing
a customer — the funder is not a customer, and recording one as such falsifies the row.

## What closed it — five edges, no new table

| edge | why |
| --- | --- |
| `projects.grant` → the award | costs book to the project; the project carries the award |
| `budget-planning.project` | planned spend becomes attributable |
| `purchase-orders.project` | a commitment becomes attributable |
| `journal-entries.project` | the ledger line becomes attributable |
| `audit-evidence.grant` | claw-back defence: the award's `conditions[].evidenceRef` is a STRING, and a string is not a join |

`projects.customer` is no longer required. Result: **0 → 76 collections can reach the award**, and
every stage is served.

## Two stages I had mapped wrongly

`report → audit-reports` and `close → contracts` were my judgement, and both were wrong. An
`audit-report` is the SOX/consolidation artefact; a `contract` is a CUSTOMER contract. Neither is a
funder's obligation, and `report` briefly read as *served* only because it reached the award
transitively once projects carried one — a green light on the wrong table.

- **close** is recorded on the award itself: its status walks `awarded → active → conditions_met →
  fully_recognised → repayable → repaid`. No second table was ever needed.
- **report** is a periodic filing to an external authority — entity, period, due date, submission,
  status, feedback. That is `regulatory-reports` exactly, so a funder's report is a **row** there
  under `reportType: grant-report`, never a table of its own ([[rules]]/collapse: a new collection is
  warranted only by a NEW signature). The collection count is unchanged at **231**.

## Why the domain axis did not matter

NACE Rev.2 defines 21 sections, A–U (EU Regulation 1893/2006, implemented at `src/nace/rev2`), and
that is the honest reading of *"all possible domains"*. Both blockers sat in the **spine** every
section shares, so they stopped a funded project in agriculture exactly as they stopped one in
software. **Usability here is a product, not a percentage**: a hole at any stage stops the whole
lifecycle, so *"7 of 8 stages"* was 0, not 87% — and 0 × 21 domains is 0. Domain modelling moved
neither blocker; five relationship fields moved both.

## Attribution is an OUTBOUND question

The first version of this gate scored a stage by **in-degree** and reported the right verdict for the
wrong reason. `project-milestones` has in-degree 0 and is perfectly attributable — a milestone names
its project, nothing names the milestone. `journal-entries` has **43** collections pointing at it and
reaches no award at all. In-degree measures how often a table is *cited*; attribution asks what a row
can **name as the thing it belongs to**, which is reachability along outbound edges.

The zero is only worth reading because the instrument finds non-zeros: **221** collections reach
`tenants`, 50 reach `customers`, 30 reach `invoices`. A walk that returned 0 for everything would be a
bug wearing a finding's clothes.

**Honest boundary.** This proves a row **cannot name** the award, never that the resulting system is
otherwise fit — a reachable award still says nothing about eligible-cost rules, funder report formats,
or the 21 domains' operational substance. It reads the types Payload generated from the live config,
so a link expressed outside a relationship field (a text reference, a hook-time lookup) is invisible
to it: `government-grants` does carry a programme-reference **string**, and a string is not a join.
The 109 orphan collections are reported as a census and **not gated** — many are honest leaf tables,
and a gate whose noise floor sits above its signal is one nobody reads.

**Law — [[law]]: a funded project is a chain, and a chain runs end to end or not at all. If the award
is a table nothing can point at, every stage downstream is unattributable — and that is one missing
edge, not eight missing features, and it is missing identically in every domain.**

## Standards

- **IAS 20** — accounting for government grants and disclosure of government assistance.
- **EU Regulation (EC) No 1893/2006** — NACE Rev.2: the 21 sections that define "all domains".
- **ISO 19011:2018 §6.4** — audit evidence: an unattributable cost cannot be evidenced to a funder.

Composes: [[rules]]/collapse · [[syntax]] · [[law]].
