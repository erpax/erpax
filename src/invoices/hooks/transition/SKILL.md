---
name: transition
description: "Use when reasoning about transition — The AR hook ( ) and the AP hook ( ) both answer one question before emitting a domain event: *did this write CHANGE the document's liveness?* Both wrote , , and for themselves…"
atomPath: "invoices/hooks/transition"
coordinate: "invoices/hooks/transition · 4/weave · 7f7ba3f9"
contentUuid: "dc3de213-d37a-5876-9d76-02dcb4220f39"
diamondUuid: "79a13c06-3a74-86b4-89c8-20538a409be0"
uuid: "7f7ba3f9-13b3-822e-aea2-3966929560c6"
horo: 4
typography:
  partition: invoices
  bondDegree: 13
standards:
  - "IAS-1"
  - "IFRS IAS-1 presentation (a reversal is a transition, never an edit)"
bindings: []
signatures:
  computationUuid: "4c5094ff-43f4-8a6e-ad60-e26d37077b66"
  stages:
    - stage: path
      stageUuid: "be733482-a74c-8b44-8573-a52fe2eb38fe"
    - stage: trinity
      stageUuid: "9c3b0abe-1bf9-8636-954b-6ea47ff5dd9c"
    - stage: boundary
      stageUuid: "394bf38f-8794-8a9e-ae66-af5a9e6d31e0"
    - stage: links
      stageUuid: "42ee8e40-cda5-85e9-8f56-018d8c1b60a8"
    - stage: horo
      stageUuid: "71c1b21e-57df-8f40-8944-4679113eb4d2"
    - stage: seal
      stageUuid: "2dd7452e-fa21-888d-ad42-15b98432233b"
    - stage: uuid
      stageUuid: "6ebb5a15-0678-8910-882f-acf45a76d923"
version: 2
---
# invoices/hooks/transition — an event fires on the crossing, not on the state

The AR hook (`invoice.ts`) and the AP hook (`bill.ts`) both answer one question before emitting a
domain event: *did this write CHANGE the document's liveness?* Both wrote `ACTIVE_STATUSES`,
`REVERSED_STATUSES`, `justActivated` and `justReversed` for themselves, and [[rules]]/copy hashed
the two predicate pairs to the same addresses.

**The two status sets are NOT the same**, and folding them into one silently broke AP — a test
caught it on the first run. A bill becomes live on `approved`, which AR has no equivalent of; an
invoice stays live through `grace_period`, which AP does not have. So the SET is the parameter
and only the edge detection is shared, the same shape [[agent]]'s chain-step fold takes with
`ownsCollections`. Two bodies matching is not two behaviours matching: the hash covers the
function, never the constants it closes over.

The predicates are not lookups — they are **edge detectors**, and the asymmetry between them is
the accounting content:

| | a create (no previousDoc) |
| --- | --- |
| `justActivated` | **true** if the status is active — a document that arrives issued is issued |
| `justReversed` | **always false** — a document that arrives cancelled reverses nothing |

That second row is why this is worth one address. A reversal event unwinds a GL entry; firing it
for a document that never had one books the unwind of nothing. Two copies of that rule is two
chances for the next collection to get the create case wrong, and the wrong answer is a journal
entry, not a lint warning.

**Honest boundary.** These decide *whether* a transition happened, never what to emit or post —
the events, their payloads and the GL consequences stay in the AR and AP hooks. The status sets
are DECLARED: a new status added to the config is invisible here until it is named.

**Law — [[law]]: a domain event fires on a crossing. Detect the edge once, in one place, or two
collections will disagree about what counts as becoming live.**

Composes: [[invoices]] · [[rules]]/copy · [[law]].
