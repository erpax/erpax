---
name: assets
description: "Use when measuring, re-measuring, or disclosing IAS 41 biological assets — livestock, aquaculture, annual/perennial crops, forestry, vineyard produce — at fair-value-less-costs-to-sell; biological-transformation vs. price-change P&L split; bearer-plant IAS-16 carve-out; harvest-event transformation lifecycle. The IAS-41 biological-asset measurement collection."
atomPath: "biological/assets"
coordinate: "biological/assets · 2/share · 10830cd8"
contentUuid: "1782bc80-7256-54e5-978b-a67936613907"
diamondUuid: "bf76fbd2-0810-8f7d-9813-bd0e7024692c"
uuid: "10830cd8-e78d-84b4-a3e4-2cde48311c14"
horo: 2
typography:
  partition: biological
  bondDegree: 120
standards:
  - "IAS-41"
  - "IFRS IAS-41 §10 recognition-criteria"
  - "IFRS IAS-41 §10 recognition-criteria`"
  - "IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell"
  - "IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell`"
  - "IFRS IAS-41 §13 biological-transformation"
  - "IFRS IAS-41 §13 biological-transformation`"
  - "IFRS IAS-41 §26 gains-losses-recognised-in-pnl"
  - "IFRS IAS-41 §26 gains-losses-recognised-in-pnl`"
  - "IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment"
  - "IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment`"
  - "IFRS IAS-41 §40 disclosure-by-class"
  - "IFRS IAS-41 §40 disclosure-by-class`"
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS IFRS-13 fair-value-input-hierarchy`"
  - "IFRS-13"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls TOM-AGRI-01"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0dd9a152-a613-872a-b32f-c12ad04ebaff"
  stages:
    - stage: path
      stageUuid: "78a30e64-5ab4-848b-8d59-1078f20f0656"
    - stage: trinity
      stageUuid: "2c2b3c52-24d9-8412-a58e-8b16a2f18cab"
    - stage: boundary
      stageUuid: "71e52ffc-ac61-8a97-8463-245dffe70934"
    - stage: links
      stageUuid: "e5c5ea89-6960-8184-b985-28d0dec16a26"
    - stage: horo
      stageUuid: "533637bb-c997-8a1d-907f-f67d0e05f491"
    - stage: seal
      stageUuid: "3db92f29-073f-82ee-9982-e9e81fa80aad"
    - stage: uuid
      stageUuid: "38fe33ad-5e1f-8bca-bd0a-0c09c5113204"
version: 2
---
# biological-assets

**FORM: a living class measured at a fair value, not a cost.** Each row is one biological-asset class (dairy herd, beef herd, salmon stock, vineyard block, timber forest) carried at **fair-value-less-costs-to-sell** — IAS 41's measurement basis, *not* historical cost — so the carrying amount re-measures every reporting date and the change lands in P&L. That change splits two ways the standard insists on keeping apart: **biological transformation** (growth/birth/death — value created by the asset living) versus **price change** (the same units worth more or less in the market); both are computed deltas off the prior-period figure, read-only outputs of the re-measurement, not hand-entered.

This is an [[accounting|accountable]] [[collections|collection]] node — shared [[field]] for the reference/currency/unit-of-measure/status/audit line, [[hooks]] for the standard collection lifecycle, [[access]] gated on the `agriculture` feature. The fair-value figure is classified by an [[fair/value/measurements]] relation (the IFRS-13 Level-1/2/3 input hierarchy — its twin atom, they [[merge|compose]] both ways), and the re-measurement posts a [[journal/entries|journal entry]] (read-only back-reference) so the [[balance]] the row reports is the same value the ledger carries — one number, two views, content-addressed ([[identity]]). Maturity (immature → mature → old) and status (active → harvested/sold/lost) are the asset's lifecycle ring.

**The bearer-plant carve-out is the trap.** Since the 2016 IAS-41 amendment, **bearer plants** (the vine, the apple tree — the productive plant itself) are NOT biological assets; they moved to IAS 16 (PP&E) and are *not* re-measured to fair value. Only the **produce** growing on them (the grapes, the fruit before harvest) stays in IAS 41. That is why `classKind` carries a distinct *vineyard/orchard PRODUCE* option flagged `bearer plant ⇒ IAS 16` — the plant and its produce part on the standards boundary, and miscoding the plant as a biological asset is the classic restatement error. At the point of harvest (the IAS 41 §13 transformation event — birth/death/growth/harvest, the forward `harvest-events` pairing the code comment notes) the asset transfers to inventory; the status flips to `harvested`.

This is the [[fractal]] same form one scale down from the [[fair/value/measurements]] register it points at — a measured balance that re-prices against a hierarchy of inputs.

**Law — [[law]]: a living class is carried at fair-value-less-costs-to-sell (never cost), re-measured each reporting date, with the change split into biological-transformation vs price-change; bearer plants are carved out to IAS-16.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IAS-41 §10 recognition-criteria`
- `@standard IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell`
- `@standard IFRS IAS-41 §13 biological-transformation`
- `@standard IFRS IAS-41 §26 gains-losses-recognised-in-pnl`
- `@standard IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment`
- `@standard IFRS IAS-41 §40 disclosure-by-class`
- `@standard IFRS IFRS-13 fair-value-input-hierarchy`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`

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
