---
name: cost
description: "Use when accounting the micro-USD price of a chain step against a tenant budget — estimateMicroUsd prices CPU-ms, egress and AI tokens; recordCost accrues spend and refuses once the cap is crossed; setBudget and getBudget manage the per-tenant cap."
atomPath: "beyond/cost"
coordinate: "beyond/cost · 8/crest · 3a709377"
contentUuid: "ff7184fd-f21b-53ce-bbe2-7f6c988bce91"
diamondUuid: "f0da3521-a291-8d1e-851a-5a69017d6475"
uuid: "3a709377-2876-8073-85d0-a2d6c90d5be2"
horo: 8
typography:
  partition: beyond
  bondDegree: 400
standards: []
bindings: []
signatures:
  computationUuid: "df4556ef-540b-8fcb-8fa5-4e00e2daf186"
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
      stageUuid: "f670f9e0-ce76-8a09-a578-d3f401c44a0e"
    - stage: seal
      stageUuid: "001680cd-b101-88f3-8d02-f64ff77af255"
    - stage: uuid
      stageUuid: "46cd6baf-1b61-84a9-97a7-f57e3b154723"
version: 2
---
# beyond/cost — cost accountability per chain step

Law 15 of the [[beyond]] horizon: every chain step records its compute / storage / network price, accrued against a per-tenant budget. `estimateMicroUsd` prices a `CostMetric` from the Cloudflare-Workers rate list (CPU-ms, egress KB, AI tokens). `recordCost` adds the step's cost (the explicit `microUsd` or the estimate) to the tenant's spend and returns `{ ok: false }` the moment spend crosses the cap — a hard refusal, not an overrun. `setBudget` sets the cap; `getBudget` reads spend-and-cap. The money dual of [[carbon]].

Matter-twin: src/beyond/cost/index.ts (`setBudget` · `recordCost` · `estimateMicroUsd` · `getBudget` · `__resetBudgets`) — `CostMetric` typed in src/beyond/types.

**Law — [[law]]: every step has a price; spend is conserved against a tenant cap and the step is refused once the cap is crossed ([[standard]] Cloudflare-Workers price list) — the [[trinity]] proof holds the budget-gate invariant.**
