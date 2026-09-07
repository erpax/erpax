---
name: checker
description: "Use when deciding whether a posting date falls in a locked fiscal period — closed periods refuse new postings (admin override required) but allow reversals and prior-period-adjustments, and an unparseable date fails CLOSED; the SOX §404 control an auditor signs."
atomPath: "period/lock/checker"
coordinate: "period/lock/checker · 4/weave · 8ac81fbd"
contentUuid: "82f2ad8b-7077-514f-a0be-557560fd99a5"
diamondUuid: "0a8a5929-a74e-8c09-8df5-7e8999af85ac"
uuid: "8ac81fbd-90d4-84ca-a4ee-8a87f5231249"
horo: 4
typography:
  partition: period
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "e1aeb0f8-a972-89bf-8c5f-9a3ffe0160a6"
  stages:
    - stage: path
      stageUuid: "18bb5c50-2ef4-8ca8-b95a-82f4f2413eb6"
    - stage: trinity
      stageUuid: "361e907b-6200-8c5f-958a-cbb77d160623"
    - stage: boundary
      stageUuid: "eca36108-1e75-8e04-aaeb-cd614dd5d48a"
    - stage: links
      stageUuid: "d99cef29-1657-8a4a-8fd8-63c662d547f2"
    - stage: horo
      stageUuid: "7edd74a9-0ecd-89c6-a890-1e9649217e7c"
    - stage: seal
      stageUuid: "5426795a-1802-869a-9c13-8aa9d138557a"
    - stage: uuid
      stageUuid: "25614806-68b8-886e-bc54-04d3e2d8644c"
version: 2
---
# period/lock/checker — a closed period refuses new postings, proven

`checkPeriod(postingDate, locks, isReversal, isPriorPeriodAdjustment)` decides posting eligibility against the fiscal calendar. The rule — **you cannot post to a closed period** — is the SOX §404 internal control an auditor personally signs. It was a bare `@invariant` ([[rules]]/refutable: asserted, nothing to contradict it); now it has a proof leg:

- **open** period → new postings allowed
- **locked / archived** period → new postings refused (`requiresAdminOverride`), **except** a reversal (`allowReversals`) or a prior-period-adjustment (`allowPriorPeriodAdjustments`) — the two exceptions the law names
- **unparseable date** → **fails closed**: an `Invalid Date` matches no period and would otherwise fall through to `allowNewPostings: true`, silently bypassing the lock — so it is denied and forced to admin override

That last leg is the auditor-facing bug this atom was hardened against ([[rules]]/audience — the §404 fail-open was invisible from every seat but the auditor's): a date the system cannot place in the calendar must never be freely postable.

**Honest boundary.** This proves the *decision* — locked ⇒ refuse, with the two exceptions — not that the lock STATUS is correct (that a period marked `open` truly should be) nor that the override, once granted, is justified. It closes the fail-open door; the human override remains a gated, logged act.

**Law — [[law]]: a closed period refuses a new posting — admin override required — allowing only a reversal or a prior-period-adjustment; and a date that cannot be placed in the calendar fails closed, never bypassing the lock.**

## Standards

- **SOX §404** — internal controls: you cannot post to a closed period.

Composes: [[period]] · [[rules]]/refutable · [[rules]]/audience · [[law]].
