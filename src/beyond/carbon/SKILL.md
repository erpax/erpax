---
name: carbon
description: "Use when accounting the gCO2e of a chain step for ESRS E1 / CSRD reporting — estimateCarbon converts CPU-ms and egress-bytes into grams via grid intensity, recordCarbon accumulates per tenant, getTenantCarbon reads the running total; the carbon dual of cost."
atomPath: "beyond/carbon"
coordinate: "beyond/carbon · 1/base · a3b9e823"
contentUuid: "0a29e3b4-62f3-55c2-8837-057ce258886b"
diamondUuid: "491f290e-1e30-8625-8a6e-2b11b7ec4781"
uuid: "a3b9e823-b6f1-8f81-b813-43800586bd22"
horo: 1
typography:
  partition: beyond
  bondDegree: 18
standards:
  - "ESRS E1 climate-change-disclosures"
  - "EU CSRD 2022/2464 sustainability-reporting-directive"
  - "EU-CSRD"
  - "EU-ESRS"
  - "GHG Protocol Scope-2 location-based"
  - "GHG-Protocol"
bindings: []
signatures:
  computationUuid: "b09b5ed9-20c3-806b-a5c4-96141ea6f084"
  stages:
    - stage: path
      stageUuid: "022811c8-2825-8805-8327-1f3ecdaa1b5e"
    - stage: trinity
      stageUuid: "9d9f65d7-9d57-8e5c-ab2a-e327009c7850"
    - stage: boundary
      stageUuid: "a52b486d-254f-8af2-9fdf-890330c627e3"
    - stage: links
      stageUuid: "3475e702-cae7-8cd9-9935-0a24f869502b"
    - stage: horo
      stageUuid: "c8263385-6cda-844a-b39e-63268424dbb7"
    - stage: seal
      stageUuid: "e508f226-d1f4-82a5-9358-70265789b89d"
    - stage: uuid
      stageUuid: "c81e490e-dc36-88d5-874c-8d1dd2d24d1f"
version: 2
---
# beyond/carbon — carbon-aware execution (gCO2e per chain step)

Law 16 of the [[beyond]] horizon: every chain step pays a carbon price the way it pays a money price under [[cost]]. `estimateCarbon` turns CPU-ms (via kWh-per-CPU-hour) and egress-bytes (via the IEA network factor) into kWh, then into grams CO2e through the published grid intensity. `recordCarbon` accumulates per tenant so `getTenantCarbon` returns the running total for ESRS E1 / CSRD disclosure. Pure compute, deterministic, conservation-accounted like its [[cost]] twin.

Matter-twin: src/beyond/carbon/index.ts (`estimateCarbon` · `recordCarbon` · `getTenantCarbon` · `__resetCarbon`) — `CarbonEstimate` typed in src/beyond/types.

**Law — [[law]]: compute is never carbon-free; every step's gCO2e is estimated from energy and grid intensity ([[standard]] ESRS E1 / GHG Protocol Scope-2) and conserved per tenant — the [[trinity]] proof holds the accumulation invariant.**
