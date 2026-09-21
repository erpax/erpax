---
name: registered
description: "Use when reasoning about registered — Every currency code the corpus writes must be a **registered ISO 4217 alpha-3**: the codes in , and every or property whose value is a string literal."
atomPath: "currency/registered"
coordinate: "currency/registered · 5/round · c573ec90"
contentUuid: "ddcba760-5c94-55b0-901d-b7e4ff562228"
diamondUuid: "d33bab0c-64a0-8d2d-a33f-237b0e8ee982"
uuid: "c573ec90-01f0-8147-8f59-9836c1b35ff7"
horo: 5
typography:
  partition: currency
  bondDegree: 20
standards:
  - ISO 4217 §5 — the code list is maintained by the registration authority
  - "ISO 4217 — currency codes: the alphabetic code identifies the currency"
bindings: []
signatures:
  computationUuid: "0e6992ce-504d-89ad-960f-1c18af6d9e40"
  stages:
    - stage: path
      stageUuid: "c11acf76-7cd0-8a29-955b-d3d3c25aaa34"
    - stage: trinity
      stageUuid: "e8a0b91d-1e64-8b35-87eb-531548736818"
    - stage: boundary
      stageUuid: "c8fae0b7-c065-848c-a21d-77ba7f76247f"
    - stage: links
      stageUuid: "a1981860-3b27-8da4-82fa-2a012dda6996"
    - stage: horo
      stageUuid: "25608abe-3d93-895d-886e-ec61c38f03a2"
    - stage: seal
      stageUuid: "bcdc4fef-709a-8c71-ba87-d188bfcb7ca5"
    - stage: uuid
      stageUuid: "843cd23e-4737-846c-b222-43fbd44750c4"
version: 2
---
# currency/registered — a code outside the register names no currency

Every currency code the corpus writes must be a **registered ISO 4217 alpha-3**: the codes in
`SUPPORTED_CURRENCIES`, and every `currency:` or `currencyCode:` property whose value is a string
literal. `assertCurrencyRegistered` fails closed and the live count is **0** — a theorem, not a
ratchet, because a code the register does not know names no currency and every conversion
downstream is arithmetic on a symbol.

## The register is the authority, never a copy of it

`ISO_4217_NUMERIC` already lives in the corpus. This gate reads it. A second list typed here would
be the defect `EURO_TENDER` was minted to fix one atom over — one truth at two addresses, where one
is unmaintained and nobody knows which.

## Parsed, because three capitals is every acronym

`currencyLiteralsIn` reads a **property assignment** whose name is `currency` or `currencyCode` and
whose initialiser is a string literal. A regex for `[A-Z]{3}` finds `SOX`, `GDPR` and `XML` in every
comment in the tree, and a gate whose noise floor sits above its signal is one nobody reads — the
failure three instruments here have died on.

## Why this is its own atom

It **scans**: it reads `node:fs` through [[syntax]]/cache. Living in `@/currency` dragged that into
the client bundle and the production build failed outright with
`UnhandledSchemeError: Reading from "node:fs" is not handled by plugins`. A corpus-scanning gate
never sits in a barrel the app imports — and that is also what [[rules]]/concentration was pointing
at from the other direction.

**Honest boundary.** This proves a code is **registered**, never that it is the **right** code for
the row it sits on. A code assembled at runtime is invisible to a lexical scan, exactly as it is to
the compiler.

**Law — [[law]]: a currency is a registered code or it is a symbol. Read the register the corpus
already holds; never keep a second copy of it, and never accept a code no register knows.**

## Standards

- **ISO 4217** — currency codes: the alphabetic code identifies the currency.
- **ISO 4217 §5** — the code list is maintained by the registration authority.

Composes: [[currency]] · [[syntax]] · [[law]].
