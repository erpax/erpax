---
name: nested
description: "Use when reasoning about nested — Payload groups nest, so a hook that must reach walks a dotted path. Three atoms wrote that walk for themselves, and body-hashing (rules/copy) proved two of them byte-identical:"
atomPath: "field/nested"
coordinate: "field/nested · 2/share · bf5f480a"
contentUuid: "4dee9430-dbc0-59b5-bc01-536e62189eee"
diamondUuid: "57b1bb4c-f26c-8264-94ea-a08c6be000af"
uuid: "bf5f480a-bc81-8f81-9785-88006d34b750"
horo: 2
typography:
  partition: field
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability (one truth, one address)"
bindings: []
signatures:
  computationUuid: "349a1967-ba72-8639-8aed-8c33fff7715b"
  stages:
    - stage: path
      stageUuid: "d262b25f-1e45-8e9a-af99-a14dba4560ac"
    - stage: trinity
      stageUuid: "e65a0115-1100-8a51-bf9e-852a9725cd84"
    - stage: boundary
      stageUuid: "7b9521b1-af72-857d-9ad9-7e290c70e012"
    - stage: links
      stageUuid: "7a652f45-e64e-8f23-8224-c458abc8c30d"
    - stage: horo
      stageUuid: "281241f7-a2a7-8050-b494-fa8930f10cf9"
    - stage: seal
      stageUuid: "05b3c750-fcde-849c-8678-cfc62de8491f"
    - stage: uuid
      stageUuid: "3d322488-dabd-83fc-ac88-d3772939a7f8"
version: 2
---
# field/nested — one dotted path, three private implementations

Payload groups nest, so a hook that must reach `bank.bankIban` walks a dotted path. Three atoms
wrote that walk for themselves, and body-hashing ([[rules]]/copy) proved two of them byte-identical:

| atom | what it had |
| --- | --- |
| `derive/country/from/iban` | `readPath` · `writePath` |
| `classify/tax/id` | `readPath` · `writePath` — the same bytes |
| `validate/address` | `readNested` — a third spelling, with one behaviour the others lacked |

That third one is why this fold is not cosmetic. `validate/address` passes an **empty path** to mean
*the document itself*; `''.split('.')` yields `['']`, so the other two would look up a field literally
named `''`, answer `undefined`, and a caller would read a **present address as absent**. Two of the
three implementations were silently wrong for an input the third depends on.

**Duplication is camouflage**: while the walk lived in three private corners, nothing could show
that one of them handled a case the others did not. The folded form is the superset, and the empty
path is pinned by a test rather than remembered.

**Honest boundary.** This folds the accessor, not the hooks: what each atom derives, and from which
field, stays its own. It proves the two bodies were identical and that the third's extra case now
holds for all callers — never that any caller passes the right path.

**Law — [[law]]: an accessor written three times is three chances to disagree, and the disagreement
is invisible from inside any one of them. One truth, one address.**

Composes: [[field]] · [[rules]]/copy · [[law]].
