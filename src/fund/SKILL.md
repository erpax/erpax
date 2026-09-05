# fund — the award is a table nothing can point at, so no domain can run a funded project

erpax books government grants correctly under IAS 20 — 31 fields, clawback provisions, the funded
asset, the granting authority. It cannot say **which project the grant funds**.

```
231 collections · 1129 relationship edges
edges INTO government-grants:  0
edges OUT of government-grants: tenant · legalEntity · clawbackProvision · relatedAsset · createdBy · approvedBy
```

The award names its tenant, its entity, its clawback provision and the asset it bought. Nothing names
**it**. So no cost, invoice, milestone, purchase order or report can be attributed to the grant that
paid for it — the row exists and cannot participate.

| stage | table | can it name the award? |
| --- | --- | --- |
| award | `government-grants` | — it is the award |
| budget | `budget-planning` | **no** |
| procure | `purchase-orders` | **no** |
| execute | `project-milestones` | **no** |
| account | `journal-entries` | **no** |
| report | `audit-reports` | **no** |
| audit | `audit-evidence` | **no** |
| close | `contracts` | **no** |

Seven failures, **one cause**. And a second blocker sits beside it: `projects.customer` is
**required**, so a grant-funded project cannot be saved without inventing a customer — the funder is
not a customer, and recording one as such falsifies the row.

## Why the domain axis does not matter yet

NACE Rev.2 defines 21 sections, A–U (EU Regulation 1893/2006, implemented at `src/nace/rev2`), and that is the honest
reading of *"all possible domains"*. Both blockers sit in the **spine**, which every section shares,
so they stop a funded project in agriculture exactly as they stop one in software. **Usability here is
a product, not a percentage**: a hole at any stage stops the whole lifecycle, so *"7 of 8 stages"* is
0, not 87% — and 0 × 21 domains is 0. Domain modelling moves neither blocker.

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
