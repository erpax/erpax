---
name: posting
description: "Use when a ledger posting should follow from a journal entry instead of being typed — every field of a posting is already on its entry, so a hook writes the posting when the entry becomes posted, once, and a refusal by the ledger fails the posting rather than being swallowed."
---

# journal/entries/posting — the ledger posting is derived from the entry

`gl-postings` restates `journal-entries`: the date, the source, and one line per account with its
debit and credit. Nothing on a posting is a decision. Yet nothing wrote postings either — the
collection was a form to fill in by hand, and it could not even be filled in: its period check asks
for a posting date and an entity that are not fields of the collection, so a posting entered in the
admin was refused every time. A table that is named as a computation and that no code writes is the
shape [[rules]]/ask measures: a question the data already answers.

| | |
| --- | --- |
| `postingFor()` | pure: the entry in, the posting out. The totals are the entry's totals, so the posting cannot be out of balance unless the entry is |
| `derivePosting` | the hook: on the transition to `posted`, find the entry's posting; if there is none, create it |

**Once.** The hook acts on the transition, looks for an existing posting first, and flags its own
write, so saving a posted entry again creates nothing.

**A refusal is not swallowed.** The posting passes through the ledger's own checks — the fiscal
period must resolve from the generated calendar, the lines must balance. If one refuses, the error
propagates. An entry the ledger rejects has not been posted, and reporting success there is the
defect this corpus found in the period-end adjustment hook.

**The source map is declared.** The entry and the posting each list their source types, written
separately; no rule derives one list from the other. A lease period is posted as the period-end
accrual it is; a bank reconciliation is sourced from its statement. It is written in the open so it
can be argued with.

**Honest boundary.** This proves a posted entry gets exactly one posting whose lines are the
entry's lines — never that the entry itself is right. Posting an entry now REQUIRES a fiscal
calendar covering its date, because the ledger's period check runs; a tenant without a generated
calendar can no longer post. Whether a failed posting also undoes the entry depends on the database
running the two writes in one transaction, which this hook requests by passing the request but does
not itself guarantee. Reversal is not handled here: a reversing entry is its own posted entry and
gets its own posting. And entries posted before this hook existed have no posting until they are
backfilled.

**Law — [[law]]: a row that restates another row is computed, never typed. The ledger posting is
the journal entry restated, so the entry writes it — once, on the transition, and loudly when the
ledger says no.**

## Standards

- **ISO/IEC 25010:2023 §5.2** — functional correctness: the posting is complete and consistent by construction.
- **ISO 19011:2018 §6.4** — audit evidence: a ledger line traces to exactly one journal entry.

Composes: [[journal]] · [[rules]]/ask · [[ecommerce]]/variants · [[law]].
