---
name: entry
description: Use when reasoning about the universal double-entry in erpax — every value movement (any direction, any parties) reduces to a balanced (debit, credit) pair; the reverse is inherent, direction is a viewpoint, N plugin mounts consolidate (intercompany nets to zero). The debit/credit closure operator over the whole mesh — "all accounted in all directions ⇒ the wiring is complete".
---

# entry — the universal double-entry (all based on debit/credit)

FORM: **every value movement is a balanced pair — debit one side, credit the other, `Σ(credit−debit)=0`.** That single law makes [[accounting]] the agnostic substrate the whole mesh rides on: time, leverage, pay, skills, verification all move as postings. `toDoubleEntry(flow)` turns ANY flow into a balanced entry, agnostic to who the parties are — each line's `accountable` points OUT at any entity (polymorphic; nothing points in). `index.test.ts` proves the laws.

**The reverse is inherent — the reverse skill, free.** A debit IS a credit from the other vantage (`services/perspective` `viewTransferFrom`: the payer [[give]]s/credits, the payee [[take]]s/debits). `reverse` swaps debit↔credit; `reverse∘reverse = id`. The undo is the [[duality]] of the do — no second implementation; mount↔unmount and post↔reverse fall out of it.

**Mounting erpax N times consolidates.** `consolidate([…])` unions N ledgers (N plugin mounts) into one book; every intercompany pair already nets to zero (ASC 810-10-45 elimination), so the accounting equation holds across mounts with no coordination ([[merge]]). `accountableBalances` is the per-entity position.

**The wiring is complete when all is accounted for in all directions.** `accountedFor(flows)`: every flow is a valid, conserved transfer that balances, and the consolidated book nets to zero — there is no edge the ledger does not close. Accounting is not a domain; it is the closure operator over the [[whole]] mesh ([[all]] is accountable).

Matter-twin: `src/services/entry/index.ts` (`toDoubleEntry`·`net`·`isBalanced`·`reverse`·`consolidate`·`accountableBalances`·`accountedFor`) over `services/perspective` + `index.test.ts`. Composes: [[accounting]] · [[transaction]] · [[give]] · [[take]] · [[duality]] · [[merge]] · [[whole]] · [[all]] · [[begin]].

## Common mistakes
- Storing a one-sided amount — every movement is two signs of ONE entry ([[duality]]); post the balanced pair, never edit one side.
- A field pointing INTO accounting (`Customer.arAccount`) — invert it; accounting maps the entity polymorphically (the `accountable` line points OUT).
- Treating direction as a type — it is a viewpoint (`services/perspective`); the same entry is AR to the seller and AP to the buyer.
