---
name: gate
description: "Use when reasoning about gate — , and answer from the tenant's subscription; and encode what a lapsed account may still do — read its own history, write nothing new."
atomPath: "subscription/gate"
coordinate: "subscription/gate · 8/crest · 0326ff21"
contentUuid: "67dd7c5b-0a0f-5d20-9dd0-29b726bb02bd"
diamondUuid: "4cd403b7-9432-893f-8d79-7b7b56f8d037"
uuid: "0326ff21-956c-8bbe-9594-cb15deadd145"
horo: 8
typography:
  partition: subscription
  bondDegree: 282
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "SOC-2 CC6.1 logical-access-controls"
  - "US-GAAP ASC-340-40 deferred-contract-costs"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "fac42c32-a71f-8a63-9ee0-088726a93422"
  stages:
    - stage: path
      stageUuid: "a6e9db23-c990-831b-b7ea-02c31b1479be"
    - stage: trinity
      stageUuid: "26042276-5169-8c29-a46a-912b361244d4"
    - stage: boundary
      stageUuid: "5f803ba0-d859-896f-ae47-bf60fe0f4258"
    - stage: links
      stageUuid: "72f54a82-b6f3-8153-a09e-ded862ef8cde"
    - stage: horo
      stageUuid: "fa919632-aa7d-814a-9877-35bb3bd39a0a"
    - stage: seal
      stageUuid: "b0dd1769-72a9-8fac-8a13-f42b113bb9f6"
    - stage: uuid
      stageUuid: "8f06baa9-f019-84c2-ad91-da1363c53626"
version: 2
---
# subscription/gate — the plan decides access at the collection, not in the page that renders it

`requireSubscriptionPlan`, `checkFeatureAccess` and `getFeatureLimit` answer from the tenant's
subscription; `blockWriteIfSuspended` and `allowReadDenyWriteIfPastDue` encode what a lapsed
account may still do — read its own history, write nothing new.

Gating in the UI leaves the API open. These are access predicates, so the answer is the same
whichever door the request arrives at.

Composes: [[law]].
