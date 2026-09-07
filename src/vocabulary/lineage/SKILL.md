---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
atomPath: "vocabulary/lineage"
coordinate: "vocabulary/lineage · 4/weave · fa168b80"
contentUuid: "82483841-7568-5cf0-8207-5efdb097ab00"
diamondUuid: "db4d8189-dec9-8465-98bd-2b88066dd582"
uuid: "fa168b80-7154-8891-833e-6e85e62ece41"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 98
standards: []
bindings: []
signatures:
  computationUuid: "e0966f73-f480-8cb2-b3a1-ade08c9bc8c8"
  stages:
    - stage: path
      stageUuid: "af972014-9f28-80b4-ba5c-08b7a8f2fd8f"
    - stage: trinity
      stageUuid: "43887ccc-06fb-8d31-acd6-82f4e0650e43"
    - stage: boundary
      stageUuid: "b5197edb-2aad-866d-a55a-907a26a6de83"
    - stage: links
      stageUuid: "25f7e9fb-4565-8fe2-93a1-ff23340697d6"
    - stage: horo
      stageUuid: "2596b4d5-3596-8cd1-9e75-344e84ff345a"
    - stage: seal
      stageUuid: "8d2c6b1a-a31a-87e0-9f98-70e94621185e"
    - stage: uuid
      stageUuid: "0e24858b-c870-8862-a1cc-d2f56a29f6bf"
version: 2
---
# lineage

Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement.

**Food traceability is lineage made law.** In [[agriculture]] the provenance chain is regulated: one-step-back / one-step-forward tracing (FDA FSMA §204) assigns a **traceability lot code (TLC)** at first [[postharvest|packing]] and logs **critical tracking events (CTEs)** with **key data elements (KDEs)** at each handoff — harvest, cooling, packing, shipping, receiving. This is the same **content-addressed audit** law as [[supto]] (a lot code IS a content address; CTEs are append-only events): forging the chain costs O(N) rewrites while verifying is O(1) ([[proof]]). [[organic]] / [[certification]] chain-of-custody (no commingling, 5-year records) and [[grade]] / [[lots]] recalls all ride this one spine — trace-back is lineage read upstream.

Composes: [[identity]] · [[history]] · [[ingest]] · [[federation]] · [[audit/events]] · [[sacred]] · [[proof]] · [[profane]] · [[agriculture]] · [[supto]] · [[lots]] · [[grade]] · [[postharvest]] · [[organic]] · [[certification]] · [[harvest]].

## Standards
- W3C PROV (provenance)
- Data lineage standards (OpenMetadata)
- FDA FSMA §204 — food traceability (one-up/one-back, TLC/CTE/KDE); GS1 CTE/KDE chain-of-custody
