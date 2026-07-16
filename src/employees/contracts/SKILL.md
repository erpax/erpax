---
name: contracts
description: "Use when modelling the employment contract — the labour anchor a work shift is worked under (etrima work_shifts reference it, 376 780 rows). A homonym of the IFRS-15 customer contract, deliberately distinct by path: this is the labour-law agreement with an employee (Bulgarian Кодекс на труда чл.67/68/70), not the revenue agreement with a customer. legalGround is open text because one article is written four ways in real data; an absent endDate IS the indefinite contract."
---

# contracts — the employment contract (the labour anchor)

A **homonym, distinct by path** ([[path]]: the full path is the account code — homonyms never merge). `customers/contracts` is the IFRS-15 §10 revenue contract *with a customer*; this is the labour-law contract *with an employee*. Same word, different domain, different account. Neither is the other's model — and `vocabulary/contract` names the customer one.

**The labour anchor.** `work_shifts` (376 780 rows) reference the contract: a shift is worked **under** a contract. [[machine]] says what ran the phase; the contract says who may work it and at what rate. That is why this is the spine's missing node, not a formality.

## Data-truth (etrima `employee_contracts`, N=919 — 20 years of real Bulgarian garment employment)

- `legal_ground` (622 / 68%) is the **Bulgarian Labour Code article** and it is **free text, never an enum**: real values are `70` (312), `67` (254), `чл.70`, `чл.68ал.1,` — *the same article written four ways in one column*. A select would reject real data. (The never-an-enum law again, third confirmation after [[variant]] and [[work]]/phases.)
- **70% fixed-term** (432 with an `end_date`) vs **30% indefinite** (180). An absent `endDate` **IS** the indefinite contract — not missing data.
- `pay_rate` (611) with `pay_period` uniformly `month` (614) — the monthly rate is the pay anchor ([[allocation]]: pay = anchor × verified time).
- **Term ≠ lifecycle**: `start_date`/`end_date` are the agreed term; `started` (591) → `stopped` (11) is what actually happened. Both are kept; contracts start and rarely stop in the record.
- The **employer collapses to the tenant** (etrima `employer_id → accounts`; erpax is multi-tenant), so it is not a field.

**Dead columns — defined, never used, NOT ported:** `declared` (0) · `delivered` (0) — the НАП registration lifecycle was never tracked here — `retired_since` (1), `hours_per_day` · `days_per_week` · `paid_annual_leave_days` (17/919 ≈ 2%), `notice_months` · `probationary_months` (16). Porting a column the source never filled would invent a domain ([[port]]: real usage decides).

**Honest boundary.** This models the contract as etrima *used* it. It is not a complete Bulgarian labour-law implementation — the НАП declaration lifecycle (`declared`/`delivered`) is absent precisely because the upstream never filled it; a real BG deployment needs it built from the statute, not mined from this data.

**Law — [[law]]: the employment contract is the labour anchor — a shift is worked under it, and it carries the pay rate the anchor is measured from. It is a homonym of the customer contract and stays distinct by path; its legal ground is open text because real law is written many ways, and an absent end date is the indefinite term, not a gap.**

## Standards

- **Bulgarian Labour Code (Кодекс на труда)** — чл.67 indefinite · чл.68 fixed-term · чл.70 probationary.
- **ISO-8601** — contract term dates.
- **ISO-19011:2018** — audit trail on contract changes.

Composes: [[employees]] · [[port]] · [[path]] · [[machine]] · [[allocation]] · [[law]].
