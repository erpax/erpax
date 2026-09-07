---
name: gate
description: "Use when reasoning about gate — , and answer from the tenant's subscription; and encode what a lapsed account may still do — read its own history, write nothing new."
atomPath: "subscription/gate"
coordinate: "subscription/gate · 2/share · dd1787f1"
contentUuid: "116c2b27-1825-5981-9d9a-e1154bb72633"
diamondUuid: "1eac7658-3d13-81bf-90e3-84522a264c3a"
uuid: "dd1787f1-a927-8af7-bb51-bc45e6fe2162"
horo: 2
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
  computationUuid: "3713d4a7-3b0e-8ac7-bc29-6b4a0179c12f"
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
      stageUuid: "4e3002e4-8b64-8fa0-9cd8-3128964b481e"
    - stage: seal
      stageUuid: "b0dd1769-72a9-8fac-8a13-f42b113bb9f6"
    - stage: uuid
      stageUuid: "15613d63-0ff2-84c2-87fc-f7ffec3d8d5a"
version: 2
---
# subscription/gate — the plan decides access at the collection, not in the page that renders it

`requireSubscriptionPlan`, `checkFeatureAccess` and `getFeatureLimit` answer from the tenant's
subscription; `blockWriteIfSuspended` and `allowReadDenyWriteIfPastDue` encode what a lapsed
account may still do — read its own history, write nothing new.

Gating in the UI leaves the API open. These are access predicates, so the answer is the same
whichever door the request arrives at.

Composes: [[law]].
