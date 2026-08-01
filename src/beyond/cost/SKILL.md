---
name: cost
description: "Use when accounting the micro-USD price of a chain step against a tenant budget — estimateMicroUsd prices CPU-ms, egress and AI tokens; recordCost accrues spend and refuses once the cap is crossed; setBudget and getBudget manage the per-tenant cap."
atomPath: "beyond/cost"
coordinate: "beyond/cost · 2/share · 42eaeaa5"
contentUuid: "b414cfd5-353d-5a96-89ce-2b117b23e9d2"
diamondUuid: "ec3eef28-273a-832a-9242-52060cacee10"
uuid: "42eaeaa5-3604-8ac1-a322-cc0e1d2e06eb"
horo: 2
typography:
  partition: beyond
  bondDegree: 404
standards: []
bindings: []
signatures:
  computationUuid: "d10ea2b2-a8bf-8c52-82ed-0a5115a8106b"
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
      stageUuid: "ad984a2e-0985-8820-917b-b021b165d7b5"
    - stage: seal
      stageUuid: "3e826781-cf82-8883-908e-1f3cd188acfa"
    - stage: uuid
      stageUuid: "81086701-e02a-8329-beb9-bd00bf36ec46"
version: 2
---
# beyond/cost — cost accountability per chain step

Law 15 of the [[beyond]] horizon: every chain step records its compute / storage / network price, accrued against a per-tenant budget. `estimateMicroUsd` prices a `CostMetric` from the Cloudflare-Workers rate list (CPU-ms, egress KB, AI tokens). `recordCost` adds the step's cost (the explicit `microUsd` or the estimate) to the tenant's spend and returns `{ ok: false }` the moment spend crosses the cap — a hard refusal, not an overrun. `setBudget` sets the cap; `getBudget` reads spend-and-cap. The money dual of [[carbon]].

Matter-twin: src/beyond/cost/index.ts (`setBudget` · `recordCost` · `estimateMicroUsd` · `getBudget` · `__resetBudgets`) — `CostMetric` typed in src/beyond/types.

**Law — [[law]]: every step has a price; spend is conserved against a tenant cap and the step is refused once the cap is crossed ([[standard]] Cloudflare-Workers price list) — the [[trinity]] proof holds the budget-gate invariant.**
