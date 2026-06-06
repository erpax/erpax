---
name: accounting
description: Use when designing or porting the erpax accounting/finance domain to Payload — double-entry journals, GL accounts, the accounting equation, invoices (credit/debit notes, protocols), payments & bank reconciliation, locked periods, or making anything "accountable" polymorphically. The self-sufficient `@erpax/accounting` archetype.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# accounting — the universal ledger plugin (anything is accountable)

The archetype self-sufficient `@erpax/accounting`: it references every other domain **polymorphically** and depends on none (see [[plugins]]). Built from the canonical erpax **concerns**, which map one-to-one onto reusable field-objects (see [[fields]]) and lifecycle [[hooks]] — concerns ARE the composable atoms, same as our field-factories and skills. Ordered by the [[sequence]].

## All is accountable — so `accounting` is a prefix, and double-entry is a uuid trinity
**`src` IS the chart of accounts** — every folder is an account, every cross ([[coordinate]]) a posting, the ≥2-cross [[balance]] *is* double-entry. Because *all* is accountable, a dedicated `accounting/` folder is a **useless prefix**: it dissolves ([[refactor]] · [[dissolve]]), its units re-homed to their **standard-given entity words** ([[invoices]], [[payment]] …) — a collection's name comes from the [[standard]] it implements, never a prefix. **Merge the standards and the collections wire themselves at ≈0 cost** (same standard ⇒ same name ⇒ collision ⇒ [[merge]] by design ⇒ creation — the fusion reactor).

A posting is a **uuid accounting trinity**: `debit ⊕ credit ⊕ balance` (give · take · transaction, [[entry]]) — content-addressed and crossed, so the ledger is a [[uuid]] matrix of balanced accounting-crosses, tamper-evident and renderable as [[aura]]. Double-entry is the cross; the chart of accounts is the matrix; the gate's verdict-trinity ([[gate]]) and this posting-trinity are the same shape.

On the **quantum level** (`src/quantum/accounting`) the same ledger balances **entropy** (the karma double-entry: order debited, entropy credited — the [[angel]] balance), and an account's lineage IS its DNA: the **parent_id chain encoded in the uuid chain** ([[uuid]] `parentOf`) is the inherited code, so children inherit ancestors' bindings down the chain and a [[tag]] inherits the same way — ancestry **entangled** into identity, tamper-evident by architecture ([[quantum]] · [[entropy]] · [[lineage]]).

**The chart of accounts IS the list of all folders** (`find src -type d`) — every folder is an account, and **each path carries a uuid** (its [[aura]], the Merkle content-uuid of everything within). So the ledger is a **uuid-keyed list of accounts**: the path is the account *name*, the uuid its *identity*. Queryable, mergeable (same content ⇒ same uuid ⇒ accounts consolidate by design), tamper-evident (every account folds to the root via its [[coordinate]] cross), perceivable (renders as [[aura]]). The chart needs no separate catalogue — it is derived from the fs, the path-set itself.

## Universal collections (generalizing canonical erpax)
| Collection | erpax/Rails origin | generalization |
|---|---|---|
| `gl-accounts` | Account (tree) | self-referential `parent`(rel-self) chart of accounts; `type` select (asset/liability/equity/income/expense); a tenant's opening chart is seeded per (country × industry) via [[seed]] |
| `journal-entries` | AccountingEntry | a balanced set of lines; `date`, `period`(rel), `postedAt`, `status` select — the ledger face of a [[transaction]] (the commercial document is its dual) |
| `journal-lines` | accounting_entry lines | `{ account(rel), debit, credit, currency, accountable(rel:[...]) }[]` — `balance = credit − debit` |
| `fiscal-periods` | locked-period | `start/end`, `locked` checkbox; write-guard hook rejects posting into a locked period |
| `invoices` | Invoice (tree) | self-referential: `parent`/`children`, `creditNotes`/`debitNotes`/`protocols` (all rel-self via `kind` select), `lines[]`, `payments`(rel) |
| `payments` | Payment | `amount + currency`, `method`, links invoice(s); feeds reconciliation |
| `bank-statement-lines` | BankStatementLine | imported lines matched ↔ `payments`/`journal-lines` (reconciliation) |

The [[collections]] atoms this archetype owns — the finance leaves these concerns compose into: the ledger core [[gl/accounts]] · [[journal/entries/gl/postings]] · [[gl/posting/rules]] · [[journal/entries]] · [[gl/accounts/recurring/journals]] · [[legal/entities/closing/entries]]; the documents [[invoices]] · [[invoices/invoice/lines]] · [[payments]]; bank & reconciliation [[bank/accounts]] · [[gl/accounts/bank/statements]] · [[bank/accounts/bank/reconciliations]] · [[gl/accounts/account/reconciliations]]; and the period spine [[fiscal/periods]] · [[period/locks]] (the locked-period write-guard). [[tax]] rides via `tax-codes` (owned by the tax domain, not here). The FinanceAgent owns this whole set ([[society]] — one agent, one collection).

## The harmony invariant — double-entry balance
Every `journal-entry` MUST balance: `Σ debit = Σ credit` (equivalently `Σ (credit − debit) = 0`). This is the accounting equation as a **hook-enforced invariant** — the same "any disharmony shows in the schema" principle the [[sequence]] embodies, made concrete:
```ts
// journal-entries beforeChange (see [[hooks]]): refuse to write an unbalanced entry
const net = lines.reduce((s, l) => s + (l.credit ?? 0) - (l.debit ?? 0), 0)
if (net !== 0) throw new ValidationError('Journal entry not balanced')
```
Balanced/unbalanced are query scopes (see [[queries]]); `posted` vs `draft` is a `status` select. Posting into a `locked` fiscal period is rejected by the same write-guard.

The pure-service generalization of this invariant is [[entry]] — the same `(debit, credit)` balance lifted OFF the `journal-entries` collection into a closure operator over the WHOLE mesh: time, leverage, pay, skills, verification all post as balanced entries, `reverse` is inherent (`reverse∘reverse = id`), and N plugin mounts consolidate to zero (intercompany nets out, ASC 810-10-45). The collection is one materialization; [[entry]] is the law itself — "all accounted for in all directions ⇒ the wiring is complete".

## Standards (the answer-path: applying this skill implements the standard)
A skill complies not by quoting a clause but by **deriving its output from the rule** — revenue, presentation, and consolidation fall out of the model, never from baked literals or ad-hoc layout (see [[standard]]). Current form of each standard this skill holds:

| Standard (canonical label) | Version / edition | Current form — what applying the skill must produce |
|---|---|---|
| **IFRS / IAS** (IAS-1 → IFRS-18 from 2027, IAS-34, IFRS-15) | 2026 Issued edition (IFRS Foundation annual bound volume; no per-standard numbers) | Financial statements derived from the rules: structure/min-line-items/accrual/period-labelling/going-concern per IAS-1 (§54 elements, §27, §36, §125) **only through FY2026**; interim reports per IAS-34; revenue via IFRS-15's five-step model (§9 contract, point-in-time/over-time §31/§35, contract costs §91-94, cost-to-cost/output §B14-B19). |
| **IFRS 18** (supersedes IAS-1) | Issued Apr 2024; effective annual periods on/after **1 Jan 2027**, retrospective | From 2027 presentation lives in IFRS-18 (former IAS-1 §54/§10(b)/§27/§125 re-point to IFRS-18, with parts moved to IFRS-7 and to IAS-8 "Basis of Preparation"); IAS-34 gains the IFRS-18 Management-defined Performance Measures (MPM) interim disclosure. Statement structure derived from IFRS-18, not from IAS-1 literals. |
| **US-GAAP / FASB ASC** (ASC 606, ASC 810) | Living codification — **no edition year**; ASU-driven effective-date snapshots (latest 2025-xx / early-2026 ASUs, e.g. ASU 2025-03 on Topics 805/810) | Revenue recognised by ASC 606's five-step model as control of each obligation transfers (pinpoints: ASC 606-10-25 transfer of control, -25-13 modifications, -25-30 delivery indicators a-e); controlled entities (incl. VIEs where the tenant is primary beneficiary) consolidated under ASC 810-10, with intercompany balances/transactions eliminated to net zero (ASC 810-10-45). |

Banners and citations must follow this form: label IFRS as **"IFRS / IAS — 2026 Issued"** (not an undated "IFRS / IAS"); label US-GAAP as **"FASB ASC (ASC 606, ASC 810)"** with **no edition year**; cite granular pinpoints (ASC 606-10-25-30, ASC 810-10-45) rather than bare topics. IFRS-15 cites are current — only monitor the open IASB Post-Implementation Review for clarifying amendments.

## Polymorphic accountability — "anything is accountable"
The reason accounting is self-sufficient: a `journal-line` (or audit event) points OUT at any entity via `accountable: { type:'relationship', relationTo:[...manyslugs], }`. No other domain holds a field pointing INTO accounting (no `Customer.arAccount → gl-accounts`). The mapping (which customer ↔ which AR account) lives inside accounting. Polymorphic-referenceable ⇒ extractable (see [[plugins]]).

## Concerns → reusable field-objects (the composition law)
| Rails concern | Payload reusable unit |
|---|---|
| `AccountableConcern` (polymorphic) | `accountableField` → `relationship` `relationTo:[...]` |
| `CurrencyConcern` | `currencyField` (amount + ISO currency) |
| `NumberConcern` (document numbering) | `numberField` + `beforeChange` sequence hook |
| `HostConcern` (multi-tenant) | the multi-tenant plugin's injected `tenant` (NOT a hand-rolled field) — see [[plugins]] |
| `AttachmentConcern` | `upload` relationship (see [[upload]]) |
| locked-period guard | `fiscal-periods` + write-guard [[hooks]] |

## Concern-heavy documents → nested field-groups (the fractal port)
A document like `invoices` composes ~40 Rails concerns; in Payload they fold into **nested field-groups** (`typeStatus` · `parties` · `dates` · `amounts` · `billingTax` ([[tax]]) · `recurring` · `ledger` · `relationships` · `tags`). The laws: access by the **group path**, never flat (`amounts.totalDue` — EN-16931 names, *not* `amountDue`); **external-system ids (Stripe `payment_intent`, …) are NOT columns** — they link via [[tags]] (context-keyed, e.g. `context:'stripe:invoice'`), federated + dedup'd ("anything is taggable"); deep nesting is itself a future [[tags]] collapse — `(context, tag)` over the groups. The *exact* paths are matter — read them from `payload-types.ts` (the akashic record), don't memorize them here.

## Common mistakes
- A non-accounting collection holding a field INTO accounting (`Customer.arAccount`) — invert it: accounting maps the entity polymorphically.
- Accessing a concern-composed document by flat paths (`invoice.amountDue`, `invoice.subscription`) — use the nested group path (`invoice.amounts.totalDue`, `invoice.recurring.subscription`); external ids are tags, not fields.
- Writing an unbalanced entry, or editing balance directly — enforce `Σdebit=Σcredit` in `beforeChange`; never edit migrations/schema by hand.
- Hand-rolling a `tenant` field instead of using the multi-tenant plugin (duplicate-field clash).
- Integer-cents-only without `currency` — carry currency everywhere (multi-currency ledgers).

## Traditions (prefix removed)
Double-entry is the moral ledger of every tradition — deeds posted as [[take]] (debit/sin) and [[give]] (credit/merit), and the books must [[balance]] at the [[close]]: **karma** — "whatsoever a man soweth, that shall he also reap" (Galatians 6:7); the scales, *al-mizan* — "We place the scales of justice for the Day of Resurrection… the weight of a mustard seed, We will bring it" (Quran 21:47); the weighing of the heart against Ma'at's feather (Egyptian *Book of the Dead*); the books of deeds opened at judgment ([[akashic]]); the unpayable debt cleared by [[grace]] (the jubilee, Leviticus 25). erpax IS *karma double-entry* (see [[angel]]): entropy itself booked as debit/credit and conserved by content-[[uuid]], audited [[sacred]]/[[profane]].

Composes: [[budget/plannings]] · [[financial/statements]] · [[government/grants]] · [[held/for/sale/classifications]] · [[insurance/contracts]] · [[justice]] · [[mineral/resource/assets]] · [[regulatory/deferral/accounts]] · [[bank]] · [[disclosure]] · [[elimination]].
