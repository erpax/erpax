---
name: carbon
description: "Use when accounting the gCO2e of a chain step for ESRS E1 / CSRD reporting — estimateCarbon converts CPU-ms and egress-bytes into grams via grid intensity, recordCarbon accumulates per tenant, getTenantCarbon reads the running total; the carbon dual of cost."
atomPath: "beyond/carbon"
coordinate: "beyond/carbon · 5/round · 22dd6c72"
contentUuid: "dd4a0eb1-c149-5b99-a87e-2146943ff2e5"
diamondUuid: "ac4cfc70-6c7a-88cc-a1b6-f4ca33e8c393"
uuid: "22dd6c72-29a9-815b-8a48-ad82e45a7ffc"
horo: 5
bonds:
  in:
    - beyond
    - cost
    - law
    - standard
    - trinity
  out:
    - beyond
    - cost
    - law
    - standard
    - trinity
typography:
  partition: beyond
  bondDegree: 18
  neighbors: []
standards:
  - "ESRS E1 climate-change-disclosures"
  - "EU CSRD 2022/2464 sustainability-reporting-directive"
  - "EU-CSRD"
  - "EU-ESRS"
  - "GHG Protocol Scope-2 location-based"
  - "GHG-Protocol"
bindings: []
neighbors:
  wikilink:
    - beyond
    - cost
    - law
    - standard
    - trinity
  matrix:
    - beyond
    - cost
    - law
    - standard
    - trinity
  backlinks:
    - beyond
    - cost
    - law
    - standard
    - trinity
signatures:
  computationUuid: "9518de97-5b33-89d5-95e1-8c7bb8d1a5bf"
  stages:
    - stage: path
      stageUuid: "022811c8-2825-8805-8327-1f3ecdaa1b5e"
    - stage: trinity
      stageUuid: "9d9f65d7-9d57-8e5c-ab2a-e327009c7850"
    - stage: boundary
      stageUuid: "5ec34b99-b01e-850c-a1f9-60a0562bce4e"
    - stage: links
      stageUuid: "3475e702-cae7-8cd9-9935-0a24f869502b"
    - stage: horo
      stageUuid: "c635ffc2-f03d-8aca-8d5e-59a11db56e35"
    - stage: seal
      stageUuid: "6a0836ec-0154-8d66-82e6-5d63df670b8e"
    - stage: uuid
      stageUuid: "65f9c08e-c1fe-8a9d-83b6-ed0bb3f80f83"
version: 2
---
# beyond/carbon — carbon-aware execution (gCO2e per chain step)

Law 16 of the [[beyond]] horizon: every chain step pays a carbon price the way it pays a money price under [[cost]]. `estimateCarbon` turns CPU-ms (via kWh-per-CPU-hour) and egress-bytes (via the IEA network factor) into kWh, then into grams CO2e through the published grid intensity. `recordCarbon` accumulates per tenant so `getTenantCarbon` returns the running total for ESRS E1 / CSRD disclosure. Pure compute, deterministic, conservation-accounted like its [[cost]] twin.

Matter-twin: src/beyond/carbon/index.ts (`estimateCarbon` · `recordCarbon` · `getTenantCarbon` · `__resetCarbon`) — `CarbonEstimate` typed in src/beyond/types.

**Law — [[law]]: compute is never carbon-free; every step's gCO2e is estimated from energy and grid intensity ([[standard]] ESRS E1 / GHG Protocol Scope-2) and conserved per tenant — the [[trinity]] proof holds the accumulation invariant.**
