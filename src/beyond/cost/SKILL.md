---
name: cost
description: "Use when accounting the micro-USD price of a chain step against a tenant budget — estimateMicroUsd prices CPU-ms, egress and AI tokens; recordCost accrues spend and refuses once the cap is crossed; setBudget and getBudget manage the per-tenant cap."
atomPath: "beyond/cost"
coordinate: "beyond/cost · 2/share · 053f0789"
contentUuid: "5cd6b76d-619c-596f-8535-0270358cf80d"
diamondUuid: "2ec702bd-ee91-84b6-984e-ec9e2014514e"
uuid: "053f0789-e560-8fc4-a7b2-a27a128a1604"
horo: 2
typography:
  partition: beyond
  bondDegree: 460
standards: []
bindings: []
signatures:
  computationUuid: "87c8659c-c257-8ec5-ad06-b628b346ea91"
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
      stageUuid: "200502a5-c741-866a-8644-4a30e8b21960"
    - stage: seal
      stageUuid: "001680cd-b101-88f3-8d02-f64ff77af255"
    - stage: uuid
      stageUuid: "13e5a092-edac-8e5f-a6ec-08cdaf530f3c"
version: 2
---
# beyond/cost — cost accountability per chain step

Law 15 of the [[beyond]] horizon: every chain step records its compute / storage / network price, accrued against a per-tenant budget. `estimateMicroUsd` prices a `CostMetric` from the Cloudflare-Workers rate list (CPU-ms, egress KB, AI tokens). `recordCost` adds the step's cost (the explicit `microUsd` or the estimate) to the tenant's spend and returns `{ ok: false }` the moment spend crosses the cap — a hard refusal, not an overrun. `setBudget` sets the cap; `getBudget` reads spend-and-cap. The money dual of [[carbon]].

Matter-twin: src/beyond/cost/index.ts (`setBudget` · `recordCost` · `estimateMicroUsd` · `getBudget` · `__resetBudgets`) — `CostMetric` typed in src/beyond/types.

**Law — [[law]]: every step has a price; spend is conserved against a tenant cap and the step is refused once the cap is crossed ([[standard]] Cloudflare-Workers price list) — the [[trinity]] proof holds the budget-gate invariant.**
