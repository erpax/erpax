---
name: cost
description: "Use when accounting the micro-USD price of a chain step against a tenant budget — estimateMicroUsd prices CPU-ms, egress and AI tokens; recordCost accrues spend and refuses once the cap is crossed; setBudget and getBudget manage the per-tenant cap."
atomPath: "beyond/cost"
coordinate: "beyond/cost · 7/descent · 701a7d91"
contentUuid: "c70915f3-e584-5f35-8acd-44e7834a46f5"
diamondUuid: "e65adeb4-a78e-8837-a7dc-7c1e3c682d13"
uuid: "701a7d91-699c-8148-a499-002d501f17f0"
horo: 7
typography:
  partition: beyond
  bondDegree: 460
standards: []
bindings: []
signatures:
  computationUuid: "87d4ef84-c8df-8593-8f6c-2c840b9e0679"
  stages:
    - stage: path
      stageUuid: "96e6a80d-76ad-8584-98cb-d60bd041fb81"
    - stage: trinity
      stageUuid: "10670f39-675c-8057-a96a-650a8df57c43"
    - stage: boundary
      stageUuid: "5702b18c-5f6c-8b83-a81e-5239e90a9b7d"
    - stage: links
      stageUuid: "3f980a88-fb7a-84ab-ab69-805a1e2be0dc"
    - stage: horo
      stageUuid: "55f725b5-eec1-88ba-ae02-08eea5d051fd"
    - stage: seal
      stageUuid: "001680cd-b101-88f3-8d02-f64ff77af255"
    - stage: uuid
      stageUuid: "1ddcc6bf-881a-8ea7-b282-2544931e4e2b"
version: 2
---
# beyond/cost — cost accountability per chain step

Law 15 of the [[beyond]] horizon: every chain step records its compute / storage / network price, accrued against a per-tenant budget. `estimateMicroUsd` prices a `CostMetric` from the Cloudflare-Workers rate list (CPU-ms, egress KB, AI tokens). `recordCost` adds the step's cost (the explicit `microUsd` or the estimate) to the tenant's spend and returns `{ ok: false }` the moment spend crosses the cap — a hard refusal, not an overrun. `setBudget` sets the cap; `getBudget` reads spend-and-cap. The money dual of [[carbon]].

Matter-twin: src/beyond/cost/index.ts (`setBudget` · `recordCost` · `estimateMicroUsd` · `getBudget` · `__resetBudgets`) — `CostMetric` typed in src/beyond/types.

**Law — [[law]]: every step has a price; spend is conserved against a tenant cap and the step is refused once the cap is crossed ([[standard]] Cloudflare-Workers price list) — the [[trinity]] proof holds the budget-gate invariant.**
