---
name: account
description: "Use when the chart-of-accounts type contract is needed — the GL account atom that names AccountType (the 8 posting categories), GLAccount (the hierarchical per-tenant account), the CRUD/action unions, and the runtime constants a posting is checked against (codePattern, length bounds, AccountType→prefix, the IFRS/GAAP/ASBE 1·2·3 spine). A pure-type atom is proven by TSC; its constants carry REFUTABLE invariants, so the proof is real, not an empty test to game the ledger. HARMONY ≠ TRUTH."
---

# account — the chart-of-accounts contract, proven not decorated

The GL account is the spine of double-entry ([[accounting]]): every journal line points at one, and its `normalBalance` decides whether a debit raises or lowers it. This atom holds the **type contract** — `AccountType` (the 8 posting categories), `GLAccount` (hierarchical, per-tenant, standard-tied), the CRUD requests, the domain `AccountAction` union (lock · unlock · merge · rebalance) — and the runtime constants a posting is validated against.

## A pure-type atom is proven by TSC — but its constants are refutable

A folder of `interface`/`type` declarations is proven by the **compiler**: `Record<AccountType, string[]>` cannot omit a category, and a closed union cannot admit a stray member. That is a genuine proof modality, not a missing one — so settling this atom's trinity debt with an **empty test would be gaming** the ledger ([[rules]]/unfolded · [[rules]]/refutable: a claim that forbids nothing asserts nothing). The honest proof tests what reality can break:

| invariant | what would refute it |
| --- | --- |
| `GL_ACCOUNT_RULES.codePattern` accepts `1000`, `1010.01`, rejects a letter or empty | the comment promises those codes; a pattern that rejected them is a lie to the reader who types one |
| every `AccountType` maps to a non-empty single-digit prefix | a category with no home in the coded chart |
| `minCodeLength < maxCodeLength`, `minNameLength < maxNameLength`, `maxHierarchyDepth > 0` | an unsatisfiable bound — no code could ever be valid |
| IFRS · GAAP · ASBE all put assets/liabilities/equity on the `1·2·3` spine | a template that disagreed with the others on the fundamental accounting equation |

The type-level claims (`normalBalance` and `AccountAction.action` are closed unions) are asserted with `expectTypeOf` — the compiler is the witness.

**Honest boundary.** This proves the **constants** hold and the **unions** are closed; it does not prove a given tenant's chart is *correct* — that a specific account was typed `asset` rather than `expense` is a domain judgement no gate makes. It settles the trinity debt with a real proof, not the *rightness* of any one account.

**Law — [[law]]: a pure-type atom is proven by TSC, and its runtime constants by refutable tests — never by an empty file that clears the ledger while forbidding nothing. The chart-of-accounts contract either survives a posting that breaks it, or it is decoration.**

## Standards

- **IFRS IAS-1** · **US-GAAP ASC-210** — presentation, balance-sheet classification.
- **OECD SAF-T §2** — general-ledger-accounts.
- **ISO-4217:2015** — the account currency code.

Composes: [[accounting]] · [[rules]]/refutable · [[rules]]/unfolded · [[law]].
