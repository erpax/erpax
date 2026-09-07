---
name: account
description: "Use when the chart-of-accounts type contract is needed — the GL account atom that names AccountType (the 8 posting categories), GLAccount (the hierarchical per-tenant account), the CRUD/action unions, and the runtime constants a posting is checked against (codePattern, length bounds, AccountType→prefix, the IFRS/GAAP/ASBE 1·2·3 spine). A pure-type atom is proven by TSC; its constants carry REFUTABLE invariants, so the proof is real, not an empty test to game the ledger. HARMONY ≠ TRUTH."
atomPath: "types/gl/account"
coordinate: "types/gl/account · 2/share · 88732a23"
contentUuid: "f08bd83e-b35c-5ac1-9b61-dbe8bba8e830"
diamondUuid: "ad895072-9360-8c8e-94b5-43ca2d72c3b1"
uuid: "88732a23-c2d7-8081-bf2f-41d69f8f99c3"
horo: 2
typography:
  partition: types
  bondDegree: 46
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-4217:2015 currency-codes account-currency"
  - "OECD SAF-T §2 general-ledger-accounts"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "US-GAAP ASC-210 balance-sheet"
bindings: []
signatures:
  computationUuid: "6abaa0ee-4e8c-8a1d-a1a8-24571b174e60"
  stages:
    - stage: path
      stageUuid: "5286d3a3-edbd-81ff-bcc5-b91775016111"
    - stage: trinity
      stageUuid: "df452ad9-463b-835c-83ac-5a858ad8932d"
    - stage: boundary
      stageUuid: "33593c37-a37d-8709-aed8-3410ad656f3d"
    - stage: links
      stageUuid: "c3ff71ce-5e54-8c94-9963-8a97462cda07"
    - stage: horo
      stageUuid: "7ae0fa90-a53f-88ac-afaa-a46a27ea0236"
    - stage: seal
      stageUuid: "5cb782a0-b61d-87da-a69c-d50636d1eedb"
    - stage: uuid
      stageUuid: "9e9cd6a2-802b-8a17-b38a-8fd29ae7f270"
version: 2
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
