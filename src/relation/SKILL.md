---
name: relation
description: "Use when reading the id a Payload relationship points at — idOf collapses the three shapes Payload resolves a relationship to (raw string id, numeric id, or the populated document) into one id, or undefined. Depth is a query concern and must not change identity."
atomPath: relation
coordinate: "relation · 4/weave · 57754513"
contentUuid: "26415d7a-25d1-5c80-b462-b9a412d0c679"
diamondUuid: "4ca4a6db-388e-88b2-99b6-51d1e7de0d86"
uuid: "57754513-b5bc-8cac-9c6d-827e186a4486"
horo: 4
typography:
  partition: relation
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "2804a317-84cd-82f8-b207-b07c13232801"
  stages:
    - stage: path
      stageUuid: "db6fe48b-8982-871e-8d50-1d501acc2c2c"
    - stage: trinity
      stageUuid: "8bf193ec-1948-89ed-a5ff-fa5fdb1fc221"
    - stage: boundary
      stageUuid: "600310ea-94e7-8866-9cd7-259b5ad6326c"
    - stage: links
      stageUuid: "2d6f7a21-383d-80d4-b575-f6b92894c54a"
    - stage: horo
      stageUuid: "8ddd2a72-5a0a-87ed-8d9c-02c7d35a5538"
    - stage: seal
      stageUuid: "277aea28-ede4-8274-86aa-cde0b4ec43f6"
    - stage: uuid
      stageUuid: "4f508ab8-090a-8c4c-b6aa-459179a4d962"
version: 2
---
# relation — a relationship is a value OR the row it points at

Payload resolves a relationship field to one of three shapes depending on `depth`: the raw id (`string` | `number`), or the populated document (`{ id, … }`). Every consumer that wants the id must collapse those three into one — and in erpax, every consumer did.

The same **eight lines**, hand-written, in five hook files:

```
bank/accounts/payroll/runs/hooks/payroll-disbursement · payroll-run
gl/accounts/period/end/adjustments/hooks/period-end-adjustment
items/inventory/movements/hooks/inventory-movement
leases/lease/period/postings/hooks/lease-period-posting
```

**Byte-identical — which is how they were found.** Content-addressing every function body in `src` collapses copies by construction: same content, same address ([[merge]]). That is the fold turned on the corpus itself, and it is the only duplication evidence that cannot be argued with. It measured **44 clusters · 582 duplicated lines** across the tree.

## The boundary that matters: copies, not concepts

This folds the five the fold **proved** identical, and no further. At least six near-variants exist — `sale/validate-fiscal-refs` · `sale/receipt-subscriber` · `sale/submit-audit-file` · `sale/operator-code` · `journal/entry/service` · `nist/incits/359/predicates` — and they are **not interchangeable**:

> some return `String(v ?? '')` — an **empty string** where this returns `undefined`.

Same idea, different answer on the empty case. A caller branching on `undefined` and a caller branching on falsy behave differently, so sweeping them together would be a behaviour change wearing a refactor's clothes. **Content-addressing finds COPIES; it does not find CONCEPTS** — and this concept is duplicated about eleven times. The remaining six are per-case judgement, not a sweep.

**Honest boundary.** `idOf` reads an id; it does not verify the row exists, and it cannot tell a stale id from a live one. A numeric `0` is an id — falsy is not absent, which is exactly the distinction the near-variants lose.

**Law — [[law]]: depth is a query concern and must not change identity. A relationship's id is read in one place, or every reader invents its own answer for the empty case.**

Composes: [[merge]] · [[law]].
