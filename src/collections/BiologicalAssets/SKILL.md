---
name: biological-assets
description: The biological-assets collection — Biological Assets — IAS 41 living plants + animals at fair-value
---

# biological-assets

**FORM: a living class measured at a fair value, not a cost.** Each row is one biological-asset class (dairy herd, beef herd, salmon stock, vineyard block, timber forest) carried at **fair-value-less-costs-to-sell** — IAS 41's measurement basis, *not* historical cost — so the carrying amount re-measures every reporting date and the change lands in P&L. That change splits two ways the standard insists on keeping apart: **biological transformation** (growth/birth/death — value created by the asset living) versus **price change** (the same units worth more or less in the market); both are computed deltas off the prior-period figure, read-only outputs of the re-measurement, not hand-entered.

This is an [[accounting|accountable]] [[collections|collection]] node — shared [[fields]] for the reference/currency/unit-of-measure/status/audit line, [[hooks]] for the standard collection lifecycle, [[access]] gated on the `agriculture` feature. The fair-value figure is classified by an [[FairValueMeasurements]] relation (the IFRS-13 Level-1/2/3 input hierarchy — its twin atom, they [[merge|compose]] both ways), and the re-measurement posts a [[JournalEntries|journal entry]] (read-only back-reference) so the [[balance]] the row reports is the same value the ledger carries — one number, two views, content-addressed ([[identity]]). Maturity (immature → mature → old) and status (active → harvested/sold/lost) are the asset's lifecycle ring.

**The bearer-plant carve-out is the trap.** Since the 2016 IAS-41 amendment, **bearer plants** (the vine, the apple tree — the productive plant itself) are NOT biological assets; they moved to IAS 16 (PP&E) and are *not* re-measured to fair value. Only the **produce** growing on them (the grapes, the fruit before harvest) stays in IAS 41. That is why `classKind` carries a distinct *vineyard/orchard PRODUCE* option flagged `bearer plant ⇒ IAS 16` — the plant and its produce part on the standards boundary, and miscoding the plant as a biological asset is the classic restatement error. At the point of harvest (the IAS 41 §13 transformation event — birth/death/growth/harvest, the forward `harvest-events` pairing the code comment notes) the asset transfers to inventory; the status flips to `harvested`.

This is the [[fractal]] same form one scale down from the [[FairValueMeasurements]] register it points at — a measured balance that re-prices against a hierarchy of inputs.

## Standards

The `@standard`/`@audit`/`@compliance`/`@security` banners on `index.ts` are the source of truth and the doc trinity renders them — they are not re-listed here ([[standard]]). The substance not derivable from a section number alone: IAS 41 measures at fair-value-**less-costs-to-sell** (§12) with the period change recognised in P&L (§26) and split between biological transformation (§13) and price (§51); recognition is the standard three-criteria gate (§10); disclosure is **by class** (§40), which is why one row = one class; the §30 bearer-plant amendment is the IAS-16 carve-out above; the fair-value input ranking is IFRS-13's three-level hierarchy.

## Common mistakes

- Carrying a biological asset at cost — IAS 41 is fair-value-less-costs-to-sell, re-measured each reporting date; the P&L change is the point.
- Coding a bearer plant (vine, tree) as a biological asset — since 2016 the *plant* is IAS 16 PP&E; only its *produce* is IAS 41 (the `vineyard_produce` option).
- Lumping the value change into one number — IAS 41 keeps biological-transformation and price-change separate (§26 vs §51); both are read-only computed deltas.
