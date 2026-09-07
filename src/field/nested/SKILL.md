---
name: nested
description: "Use when reasoning about nested — Payload groups nest, so a hook that must reach walks a dotted path. Three atoms wrote that walk for themselves, and body-hashing (rules/copy) proved two of them byte-identical:"
atomPath: "field/nested"
coordinate: "field/nested · 8/crest · 28855c1b"
contentUuid: "c701deb9-0948-5907-b890-82d616408a94"
diamondUuid: "98ebad16-76bc-89ae-8c8d-87fc035c1577"
uuid: "28855c1b-4f25-8c23-a203-5abf484534d7"
horo: 8
typography:
  partition: field
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability (one truth, one address)"
bindings: []
signatures:
  computationUuid: "79513d3f-f50f-83ff-82bf-2dbf043bdc39"
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
      stageUuid: "162b49a9-6681-8a06-833c-3d116cfd39ab"
    - stage: seal
      stageUuid: "05b3c750-fcde-849c-8678-cfc62de8491f"
    - stage: uuid
      stageUuid: "c65ee377-a0f0-82f4-b1f8-2e59775ca5c3"
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
