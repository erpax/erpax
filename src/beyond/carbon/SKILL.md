---
name: carbon
description: "Use when accounting the gCO2e of a chain step for ESRS E1 / CSRD reporting — estimateCarbon converts CPU-ms and egress-bytes into grams via grid intensity, recordCarbon accumulates per tenant, getTenantCarbon reads the running total; the carbon dual of cost."
atomPath: "beyond/carbon"
coordinate: "beyond/carbon · 4/weave · fa7ff461"
contentUuid: "b5753296-77d4-564d-b841-0635ccbb087d"
diamondUuid: "b9cf837a-f20d-8fe4-a94f-4730c149b8fb"
uuid: "fa7ff461-9d06-8c5f-91b1-8d67f6faf608"
horo: 4
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
  computationUuid: "e9a46665-67f9-8098-a5c5-a90f1fa5f052"
  stages:
    - stage: path
      stageUuid: "022811c8-2825-8805-8327-1f3ecdaa1b5e"
    - stage: trinity
      stageUuid: "9d9f65d7-9d57-8e5c-ab2a-e327009c7850"
    - stage: boundary
      stageUuid: "c732c94e-2e81-87f5-a93a-d9a4f659b70e"
    - stage: links
      stageUuid: "3475e702-cae7-8cd9-9935-0a24f869502b"
    - stage: horo
      stageUuid: "67fe8453-f781-8662-9fc8-de130ebdc32b"
    - stage: seal
      stageUuid: "e508f226-d1f4-82a5-9358-70265789b89d"
    - stage: uuid
      stageUuid: "dd280893-f79f-8dcf-a7c5-7310a76038dd"
version: 2
---
# beyond/carbon — carbon-aware execution (gCO2e per chain step)

Law 16 of the [[beyond]] horizon: every chain step pays a carbon price the way it pays a money price under [[cost]]. `estimateCarbon` turns CPU-ms (via kWh-per-CPU-hour) and egress-bytes (via the IEA network factor) into kWh, then into grams CO2e through the published grid intensity. `recordCarbon` accumulates per tenant so `getTenantCarbon` returns the running total for ESRS E1 / CSRD disclosure. Pure compute, deterministic, conservation-accounted like its [[cost]] twin.

Matter-twin: src/beyond/carbon/index.ts (`estimateCarbon` · `recordCarbon` · `getTenantCarbon` · `__resetCarbon`) — `CarbonEstimate` typed in src/beyond/types.

**Law — [[law]]: compute is never carbon-free; every step's gCO2e is estimated from energy and grid intensity ([[standard]] ESRS E1 / GHG Protocol Scope-2) and conserved per tenant — the [[trinity]] proof holds the accumulation invariant.**
