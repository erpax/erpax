---
name: validator
description: "Use when posting or reviewing a journal entry — the double-entry gate: every entry has two sides and the sides agree. Enforces a balance tolerance, one side per posting, non-negative amounts; warns (never refuses) on account polarity, because contra-accounts legitimately invert. Read this before trusting the word tolerance: the bound is absolute over float amounts, so the same one-cent gap posts at 50 and is refused at 100."
---

# validator — the law an ERP exists to guarantee

Debits equal credits. It is the one thing accounting is *for*, and in this corpus it carried **no proof** — the finding [[rules]]/refutable was built to surface. What it asserted, nothing could contradict:

```
@invariant debits.sum() === credits.sum()
@invariant account-type matches debit/credit polarity
```

**Both were false about this code.** Not fiction ([[rules]]/prose catches that — code nothing defines); *lies* in the exact sense: false statements about real, present matter, reading as law.

| the claim | what runs |
| --- | --- |
| `===` — exact equality | a **tolerance**. Equality is unimplementable here: these are IEEE-754 floats, where `0.1+0.2 ≠ 0.3` |
| polarity is an **invariant** | a **warning**. `valid` stays true when a debit-normal account is credited — it forbade nothing |

## The finding: there is no cent

The test was written asserting *"a one-cent gap posts"* — the honest restatement of the tolerance. **Reality refused it**, and that refusal is the most valuable thing this atom produced:

```
100 − 99.99 = 0.010000000000005115908   > 0.01  → REFUSED
 50 − 49.99 = 0.009999999999998010480  ≤ 0.01  → POSTED
```

**The same one-cent discrepancy is refused at 100 and posted at 50.** The verdict is not a property of the entry — it is a property of where the amounts land in float64. The drift scales with magnitude (at 1e6 that cent reads `0.010000000009313`), and the bound is not even itself: `0.01` stored is `0.010000000000000000208`.

So the tolerance **names a cent and does not mean one**. A ledger cannot say what it admits.

And the law was written twice, already drifted: the full check refused on `> 0.01` while the quick check returned `< 0.01` — disagreeing at exactly one cent, where one posted and the other did not. Nothing had ever contradicted either. Both now read `BALANCE_TOLERANCE`, stated once.

## What was deliberately NOT done

The disease is **money in floats**; the cure is integer minor units, and that is a change to every amount in the ledger. Three temptations refused, because each changes *what posts* while pretending to only add a test:

- **Tightening the bound.** A derivation of `MINOR_UNIT/2` was written and reverted — it is *tighter* than shipped, so entries that post today would begin to fail. Silently changing what a ledger admits, inside a diff labelled "add a proof", is the exact move this corpus exists to make impossible.
- **Justifying the cent by float drift.** It does not: drift is ~`ε·Σ|amounts|` ≈ `1e-13` — **ten orders of magnitude below a cent**. The cent is an *accounting* policy (it absorbs upstream tax and allocation rounding), not a numerics fix. Calling it one was a third lie, and it was mine.
- **Fixing the representation.** Pinned, not endorsed: the float boundary is now a passing test, so the next person meets it here rather than in production.

**Open** — at `MINOR_UNIT` the ledger admits an entry that really does not balance, by up to a cent, per entry. Whether that is right is an accounting judgement. The value is named so the question can be asked.

**Honest boundary.** These tests prove what the validator *does*, never that a posted entry is *correct*: an entry can balance perfectly and be entirely wrong about which accounts it touched. Polarity is advisory by design, so a wrong-polarity entry passes with a warning — this atom refuses arithmetic, never meaning.

## The theorem applied quantum — `quantumLedger`

The double-entry law is the invariant an ERP exists to guarantee, and it is exactly a **theorem applied quantum in the ERP**. `quantumLedger(entries)` holds every entry **at once** and reads them as **one**: it is COHERENT iff each entry balances ([[think]].superpose — N states read as one), and a **single unbalanced entry decoheres** the whole trial balance (named by index). The `root` is the order-independent fold of the entries — the **trial balance as one content-address**, so the same books in any order carry the same uuid. It derives nothing: it REUSES `validateBalance` (the balance theorem, already here) and `superpose` (the quantum step). *"Quantum"* is the superposition overlay (held at once, one root); the balance is the real invariant — the same honest split every math atom this session kept.

**Law — [[law]]: the fundamental claim carries the fundamental proof. A ledger states the gap it admits in the units it admits it in — a bound that names a cent and means a float accident is a claim the ledger cannot honour; and held quantum, the trial balance is a coherent superposition — every entry at once, coherent iff each balances, one unbalanced entry decohering the whole.**

## Standards

- **IAS 1** — an entry balances.
- **IEEE-754** — binary floating point; decimal money is not exactly representable.

Composes: [[rules]]/refutable · [[double]] · [[law]].
