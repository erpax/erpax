---
name: held-for-sale-classifications
description: The held-for-sale-classifications collection — Held-for-Sale Classifications — IFRS 5 non-current assets / disposal
---

# held-for-sale-classifications

Held-for-Sale Classifications — IFRS 5 non-current assets / disposal.

A classification event: a source asset ([[FixedAssets]] · [[InvestmentProperties]] ·
[[BusinessCombinations]], reached polymorphically) meets IFRS 5 §6 criteria — sale
highly probable within 12 months (§8) at fair value less costs to sell. That triggers
§15 remeasurement to the lower of carrying amount and FV − CTS (the FV read from a
[[FairValueMeasurements]] hierarchy), depreciation suspended (§25), and presentation as
a separate balance-sheet line (§38); a discontinued operation (§32) is a separate major
line of business or geography. The impairment / disposal gain-loss posts a [[JournalEntries]]
[[entry]] that keeps the [[accounting]] [[balance]]; the lifecycle (classified → remeasured →
sale_pending → sold → reclassified) is a [[horo]] ring whose disposal terminus [[close]]s the
asset. Standards (IFRS 5, IFRS 13, ASC 205-20 / 360-10) and tenant-isolation posture are the
[[standard]] banners in `index.ts`, fused below.
