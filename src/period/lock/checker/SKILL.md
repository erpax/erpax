---
name: checker
description: "Use when deciding whether a posting date falls in a locked fiscal period — closed periods refuse new postings (admin override required) but allow reversals and prior-period-adjustments, and an unparseable date fails CLOSED; the SOX §404 control an auditor signs."
atomPath: "period/lock/checker"
coordinate: "period/lock/checker · 1/base · c231fe91"
contentUuid: "c203b485-a9e9-5576-8b00-565931f376b1"
diamondUuid: "1a515c77-a629-8c8b-91fe-fb00014ce39b"
uuid: "c231fe91-d561-87d9-ba4d-9a0fcdc5faf6"
horo: 1
typography:
  partition: period
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "31112557-da70-82f8-9c49-5d566efce38e"
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
      stageUuid: "86030c50-2c4d-864c-8e8a-b9fe18fbe567"
    - stage: seal
      stageUuid: "5426795a-1802-869a-9c13-8aa9d138557a"
    - stage: uuid
      stageUuid: "c8882051-83f1-8f51-b490-2bda6bab2449"
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
