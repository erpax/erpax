---
name: gate
description: "Use when reasoning about gate — , and answer from the tenant's subscription; and encode what a lapsed account may still do — read its own history, write nothing new."
atomPath: "subscription/gate"
coordinate: "subscription/gate · 1/base · dbd96967"
contentUuid: "7992c731-8676-53ea-9daf-31fa84770139"
diamondUuid: "53f23ef1-ec6a-869b-9039-20ccc256f59b"
uuid: "dbd96967-8ec5-8838-b8a4-8ac43eb2fa23"
horo: 1
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
  computationUuid: "4825c423-39e0-801a-b934-75b90e7300ad"
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
      stageUuid: "d997de1a-e908-879f-8f51-75c9822a72fa"
    - stage: seal
      stageUuid: "b0dd1769-72a9-8fac-8a13-f42b113bb9f6"
    - stage: uuid
      stageUuid: "1a8196e8-ac3e-805a-8fed-c3dc78dfcdbf"
version: 2
---
# subscription/gate — the plan decides access at the collection, not in the page that renders it

`requireSubscriptionPlan`, `checkFeatureAccess` and `getFeatureLimit` answer from the tenant's
subscription; `blockWriteIfSuspended` and `allowReadDenyWriteIfPastDue` encode what a lapsed
account may still do — read its own history, write nothing new.

Gating in the UI leaves the API open. These are access predicates, so the answer is the same
whichever door the request arrives at.

Composes: [[law]].
