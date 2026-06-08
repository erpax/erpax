---
name: assets
description: "Use when measuring, re-measuring, or disclosing IAS 41 biological assets — livestock, aquaculture, annual/perennial crops, forestry, vineyard produce — at fair-value-less-costs-to-sell; biological-transformation vs. price-change P&L split; bearer-plant IAS-16 carve-out; harvest-event transformation lifecycle. The IAS-41 biological-asset measurement collection."
atomPath: biological/assets
coordinate: biological/assets · 4/weave · c44886d9
contentUuid: "684c62f6-90a1-5d6a-b12d-f2ce3a8d2d24"
diamondUuid: "2ad2703c-fce8-87d9-93d6-84e2b40e0d95"
uuid: "c44886d9-3ea3-8f13-8f74-a56bad0f080f"
horo: 4
bonds:
  in:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biological
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
  out:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
typography:
  partition: biological
  bondDegree: 120
  neighbors: []
standards:
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-Intrastat-Reg-2019/2152"
  - "IAS-41"
  - "IFRS IAS-41 §10 recognition-criteria"
  - "IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell"
  - "IFRS IAS-41 §13 biological-transformation"
  - "IFRS IAS-41 §26 gains-losses-recognised-in-pnl"
  - "IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment"
  - "IFRS IAS-41 §40 disclosure-by-class"
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS-13"
  - "ISO 19011:2018 §6.4.6 audit-evidence-biological-assets"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls TOM-AGRI-01"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - balance
    - collections
    - entries
    - fields
    - fractal
    - hooks
    - identity
    - law
    - measurements
    - merge
  matrix:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
  backlinks:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
signatures:
  computationUuid: "7eb81eb3-8837-835c-90da-48502be58ccb"
  stages:
    - stage: path
      stageUuid: "78a30e64-5ab4-848b-8d59-1078f20f0656"
    - stage: trinity
      stageUuid: "2c2b3c52-24d9-8412-a58e-8b16a2f18cab"
    - stage: boundary
      stageUuid: "71e52ffc-ac61-8a97-8463-245dffe70934"
    - stage: links
      stageUuid: "c5ad9bd6-2f78-8953-b0ec-4f2dd0fbb856"
    - stage: horo
      stageUuid: "81f903bb-6e36-82d4-82fa-ffe388c5b837"
    - stage: seal
      stageUuid: "d4a7efab-2876-8dcc-8edc-862a227a0540"
    - stage: uuid
      stageUuid: "545f8812-d7c5-8a3f-b3c1-1ca0c85393b0"
version: 2
---
# biological-assets

**FORM: a living class measured at a fair value, not a cost.** Each row is one biological-asset class (dairy herd, beef herd, salmon stock, vineyard block, timber forest) carried at **fair-value-less-costs-to-sell** — IAS 41's measurement basis, *not* historical cost — so the carrying amount re-measures every reporting date and the change lands in P&L. That change splits two ways the standard insists on keeping apart: **biological transformation** (growth/birth/death — value created by the asset living) versus **price change** (the same units worth more or less in the market); both are computed deltas off the prior-period figure, read-only outputs of the re-measurement, not hand-entered.

This is an [[accounting|accountable]] [[collections|collection]] node — shared [[fields]] for the reference/currency/unit-of-measure/status/audit line, [[hooks]] for the standard collection lifecycle, [[access]] gated on the `agriculture` feature. The fair-value figure is classified by an [[fair/value/measurements]] relation (the IFRS-13 Level-1/2/3 input hierarchy — its twin atom, they [[merge|compose]] both ways), and the re-measurement posts a [[journal/entries|journal entry]] (read-only back-reference) so the [[balance]] the row reports is the same value the ledger carries — one number, two views, content-addressed ([[identity]]). Maturity (immature → mature → old) and status (active → harvested/sold/lost) are the asset's lifecycle ring.

**The bearer-plant carve-out is the trap.** Since the 2016 IAS-41 amendment, **bearer plants** (the vine, the apple tree — the productive plant itself) are NOT biological assets; they moved to IAS 16 (PP&E) and are *not* re-measured to fair value. Only the **produce** growing on them (the grapes, the fruit before harvest) stays in IAS 41. That is why `classKind` carries a distinct *vineyard/orchard PRODUCE* option flagged `bearer plant ⇒ IAS 16` — the plant and its produce part on the standards boundary, and miscoding the plant as a biological asset is the classic restatement error. At the point of harvest (the IAS 41 §13 transformation event — birth/death/growth/harvest, the forward `harvest-events` pairing the code comment notes) the asset transfers to inventory; the status flips to `harvested`.

This is the [[fractal]] same form one scale down from the [[fair/value/measurements]] register it points at — a measured balance that re-prices against a hierarchy of inputs.

**Law — [[law]]: a living class is carried at fair-value-less-costs-to-sell (never cost), re-measured each reporting date, with the change split into biological-transformation vs price-change; bearer plants are carved out to IAS-16.**

## Standards
- IFRS IAS-41 §10 recognition-criteria
- IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell
- IFRS IAS-41 §13 biological-transformation
- IFRS IAS-41 §26 gains-losses-recognised-in-pnl
- IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment
- IFRS IAS-41 §40 disclosure-by-class
- IFRS IFRS-13 fair-value-input-hierarchy
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-biological-assets
- SOX §404 internal-controls TOM-AGRI-01
- ISO 27001 A.5.23 cloud-service-tenant-isolation

## Common mistakes

- Carrying a biological asset at cost — IAS 41 is fair-value-less-costs-to-sell, re-measured each reporting date; the P&L change is the point.
- Coding a bearer plant (vine, tree) as a biological asset — since 2016 the *plant* is IAS 16 PP&E; only its *produce* is IAS 41 (the `vineyard_produce` option).
- Lumping the value change into one number — IAS 41 keeps biological-transformation and price-change separate (§26 vs §51); both are read-only computed deltas.
