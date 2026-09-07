---
name: checker
description: "Use when deciding whether a posting date falls in a locked fiscal period — closed periods refuse new postings (admin override required) but allow reversals and prior-period-adjustments, and an unparseable date fails CLOSED; the SOX §404 control an auditor signs."
atomPath: "period/lock/checker"
coordinate: "period/lock/checker · 1/base · f7d37d3b"
contentUuid: "31a75224-e6e9-585a-8222-f36b51ffc578"
diamondUuid: "baa1ae97-6f8f-82c8-acaa-6bcc1a4232db"
uuid: "f7d37d3b-e68a-80c7-9ec4-18f926934382"
horo: 1
typography:
  partition: period
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "45a97b33-57d1-8d99-a3d8-9faf60485655"
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
      stageUuid: "b054e84c-6066-8bee-a6ef-6129c6a3f9ad"
    - stage: seal
      stageUuid: "5426795a-1802-869a-9c13-8aa9d138557a"
    - stage: uuid
      stageUuid: "ba819c87-a7e8-8e2e-8149-19078204d8f7"
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
