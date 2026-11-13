---
name: gate
description: "Use when reasoning about gate — , and answer from the tenant's subscription; and encode what a lapsed account may still do — read its own history, write nothing new."
atomPath: "subscription/gate"
coordinate: "subscription/gate · 2/share · c1c2a08b"
contentUuid: "df8ab058-7a5a-5c3b-b1fb-95f277940fd9"
diamondUuid: "1624935e-6b66-8a52-a480-04e7c1397ae7"
uuid: "c1c2a08b-e468-822a-8b8a-5c92b0f74122"
horo: 2
typography:
  partition: subscription
  bondDegree: 283
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "SOC-2 CC6.1 logical-access-controls"
  - "US-GAAP ASC-340-40 deferred-contract-costs"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "91a94049-543a-8e6a-adf3-1ed2ca2c19d8"
  stages:
    - stage: path
      stageUuid: "a6e9db23-c990-831b-b7ea-02c31b1479be"
    - stage: trinity
      stageUuid: "26042276-5169-8c29-a46a-912b361244d4"
    - stage: boundary
      stageUuid: "618bafcb-42a9-8778-82e1-e88ef4db3ae6"
    - stage: links
      stageUuid: "72f54a82-b6f3-8153-a09e-ded862ef8cde"
    - stage: horo
      stageUuid: "c2065694-1463-8d36-a12b-de4a10444123"
    - stage: seal
      stageUuid: "b0dd1769-72a9-8fac-8a13-f42b113bb9f6"
    - stage: uuid
      stageUuid: "074a7cf2-671f-8ba0-98c8-c072fc75fcc3"
version: 2
---
# subscription/gate — the plan decides access at the collection, not in the page that renders it

`requireSubscriptionPlan`, `checkFeatureAccess` and `getFeatureLimit` answer from the tenant's
subscription; `blockWriteIfSuspended` and `allowReadDenyWriteIfPastDue` encode what a lapsed
account may still do — read its own history, write nothing new.

Gating in the UI leaves the API open. These are access predicates, so the answer is the same
whichever door the request arrives at.

Composes: [[law]].
