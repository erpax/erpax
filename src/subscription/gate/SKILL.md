---
name: gate
description: "Use when reasoning about gate — , and answer from the tenant's subscription; and encode what a lapsed account may still do — read its own history, write nothing new."
atomPath: "subscription/gate"
coordinate: "subscription/gate · 2/share · c1c2a08b"
contentUuid: "d35103f6-cb54-560d-944d-f409dbe7ec27"
diamondUuid: "d5349fde-440a-8ca7-9d54-665248376483"
uuid: "c1c2a08b-e468-822a-8b8a-5c92b0f74122"
horo: 2
typography:
  partition: subscription
  bondDegree: 292
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "SOC-2 CC6.1 logical-access-controls"
  - "US-GAAP ASC-340-40 deferred-contract-costs"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "21eb0d7d-6817-8b52-ba17-491e6ffc845b"
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
      stageUuid: "6ce8d8dc-0a08-8f42-b2bf-26cc550ed49f"
    - stage: seal
      stageUuid: "b0dd1769-72a9-8fac-8a13-f42b113bb9f6"
    - stage: uuid
      stageUuid: "7c1e25d9-8951-8f6e-b417-eed81b567a83"
version: 2
---
# subscription/gate — the plan decides access at the collection, not in the page that renders it

`requireSubscriptionPlan`, `checkFeatureAccess` and `getFeatureLimit` answer from the tenant's
subscription; `blockWriteIfSuspended` and `allowReadDenyWriteIfPastDue` encode what a lapsed
account may still do — read its own history, write nothing new.

Gating in the UI leaves the API open. These are access predicates, so the answer is the same
whichever door the request arrives at.

Composes: [[law]].
