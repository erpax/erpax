---
name: accounting
description: Use when designing or porting the erpax accounting/finance domain to Payload — double-entry journals, GL accounts, the accounting equation, invoices (credit/debit notes, protocols), payments & bank reconciliation, locked periods, or making anything "accountable" polymorphically. The self-sufficient `@erpax/plugin-accounting` archetype.
---

# accounting — the universal ledger plugin (anything is accountable)

The archetype self-sufficient `@erpax/plugin-accounting`: it references every other domain **polymorphically** and depends on none (see [[plugins]]). Built from the canonical erpax **concerns**, which map one-to-one onto reusable field-objects (see [[fields]]) and lifecycle [[hooks]] — concerns ARE the composable atoms, same as our field-factories and skills. Ordered by the [[sequence]].

## Universal collections (generalizing canonical erpax)
| Collection | erpax/Rails origin | generalization |
|---|---|---|
| `gl-accounts` | Account (tree) | self-referential `parent`(rel-self) chart of accounts; `type` select (asset/liability/equity/income/expense) |
| `journal-entries` | AccountingEntry | a balanced set of lines; `date`, `period`(rel), `postedAt`, `status` select |
| `journal-lines` | accounting_entry lines | `{ account(rel), debit, credit, currency, accountable(rel:[...]) }[]` — `balance = credit − debit` |
| `fiscal-periods` | locked-period | `start/end`, `locked` checkbox; write-guard hook rejects posting into a locked period |
| `invoices` | Invoice (tree) | self-referential: `parent`/`children`, `creditNotes`/`debitNotes`/`protocols` (all rel-self via `kind` select), `lines[]`, `payments`(rel) |
| `payments` | Payment | `amount + currency`, `method`, links invoice(s); feeds reconciliation |
| `bank-statement-lines` | BankStatementLine | imported lines matched ↔ `payments`/`journal-lines` (reconciliation) |

## The harmony invariant — double-entry balance
Every `journal-entry` MUST balance: `Σ debit = Σ credit` (equivalently `Σ (credit − debit) = 0`). This is the accounting equation as a **hook-enforced invariant** — the same "any disharmony shows in the schema" principle the [[sequence]] embodies, made concrete:
```ts
// journal-entries beforeChange (see [[hooks]]): refuse to write an unbalanced entry
const net = lines.reduce((s, l) => s + (l.credit ?? 0) - (l.debit ?? 0), 0)
if (net !== 0) throw new ValidationError('Journal entry not balanced')
```
Balanced/unbalanced are query scopes (see [[queries]]); `posted` vs `draft` is a `status` select. Posting into a `locked` fiscal period is rejected by the same write-guard.

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

## Common mistakes
- A non-accounting collection holding a field INTO accounting (`Customer.arAccount`) — invert it: accounting maps the entity polymorphically.
- Writing an unbalanced entry, or editing balance directly — enforce `Σdebit=Σcredit` in `beforeChange`; never edit migrations/schema by hand.
- Hand-rolling a `tenant` field instead of using the multi-tenant plugin (duplicate-field clash).
- Integer-cents-only without `currency` — carry currency everywhere (multi-currency ledgers).
