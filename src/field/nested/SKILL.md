---
name: nested
description: "Use when reasoning about nested — Payload groups nest, so a hook that must reach walks a dotted path. Three atoms wrote that walk for themselves, and body-hashing (rules/copy) proved two of them byte-identical:"
atomPath: "field/nested"
coordinate: "field/nested · 4/weave · bd59dd4a"
contentUuid: "fa98a52f-673b-5613-997d-9a49de6d40bc"
diamondUuid: "30394450-c234-8c9d-ad62-f30e384f09b8"
uuid: "bd59dd4a-4891-86e0-ae25-1157df74aa0a"
horo: 4
typography:
  partition: field
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability (one truth, one address)"
bindings: []
signatures:
  computationUuid: "27538141-c377-874d-8ce0-fdd21a0aec34"
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
      stageUuid: "e787df15-af73-8986-a786-6d477d8de458"
    - stage: seal
      stageUuid: "05b3c750-fcde-849c-8678-cfc62de8491f"
    - stage: uuid
      stageUuid: "6fb9f94f-9438-8987-965d-2729bc4d5d66"
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
