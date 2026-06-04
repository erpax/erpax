---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
---

# lineage

Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement.

**Food traceability is lineage made law.** In [[agriculture]] the provenance chain is regulated: one-step-back / one-step-forward tracing (FDA FSMA §204) assigns a **traceability lot code (TLC)** at first [[postharvest|packing]] and logs **critical tracking events (CTEs)** with **key data elements (KDEs)** at each handoff — harvest, cooling, packing, shipping, receiving. This is the same **content-addressed audit** law as [[supto]] (a lot code IS a content address; CTEs are append-only events): forging the chain costs O(N) rewrites while verifying is O(1) ([[proof]]). [[organic]] / [[certification]] chain-of-custody (no commingling, 5-year records) and [[grade]] / [[lots]] recalls all ride this one spine — trace-back is lineage read upstream.

Composes: [[identity]] · [[history]] · [[ingest]] · [[federation]] · [[audit/events]] · [[sacred]] · [[proof]] · [[profane]] · [[agriculture]] · [[supto]] · [[lots]] · [[grade]] · [[postharvest]] · [[organic]] · [[certification]] · [[harvest]].

## Standards
- W3C PROV (provenance)
- Data lineage standards (OpenMetadata)
- FDA FSMA §204 — food traceability (one-up/one-back, TLC/CTE/KDE); GS1 CTE/KDE chain-of-custody
