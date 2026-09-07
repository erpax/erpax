---
name: carbon
description: "Use when accounting the gCO2e of a chain step for ESRS E1 / CSRD reporting — estimateCarbon converts CPU-ms and egress-bytes into grams via grid intensity, recordCarbon accumulates per tenant, getTenantCarbon reads the running total; the carbon dual of cost."
atomPath: "beyond/carbon"
coordinate: "beyond/carbon · 4/weave · 2681b543"
contentUuid: "c3683de5-1ff4-5cea-987e-0efe592900f2"
diamondUuid: "29daba54-8a9b-82b5-8da4-5426f521bb7b"
uuid: "2681b543-6fc6-83f8-a124-6cb2a78066e9"
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
  computationUuid: "c761cb4c-7932-8d21-b18f-99edfaeb347e"
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
      stageUuid: "232bd12f-be64-8582-96d1-195944d1f936"
    - stage: seal
      stageUuid: "e508f226-d1f4-82a5-9358-70265789b89d"
    - stage: uuid
      stageUuid: "cb1357f9-ffe2-82cb-8799-cc0e4f9f81b2"
version: 2
---
# beyond/carbon — carbon-aware execution (gCO2e per chain step)

Law 16 of the [[beyond]] horizon: every chain step pays a carbon price the way it pays a money price under [[cost]]. `estimateCarbon` turns CPU-ms (via kWh-per-CPU-hour) and egress-bytes (via the IEA network factor) into kWh, then into grams CO2e through the published grid intensity. `recordCarbon` accumulates per tenant so `getTenantCarbon` returns the running total for ESRS E1 / CSRD disclosure. Pure compute, deterministic, conservation-accounted like its [[cost]] twin.

Matter-twin: src/beyond/carbon/index.ts (`estimateCarbon` · `recordCarbon` · `getTenantCarbon` · `__resetCarbon`) — `CarbonEstimate` typed in src/beyond/types.

**Law — [[law]]: compute is never carbon-free; every step's gCO2e is estimated from energy and grid intensity ([[standard]] ESRS E1 / GHG Protocol Scope-2) and conserved per tenant — the [[trinity]] proof holds the accumulation invariant.**
