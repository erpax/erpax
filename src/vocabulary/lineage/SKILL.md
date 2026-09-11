---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
atomPath: "vocabulary/lineage"
coordinate: "vocabulary/lineage · 1/base · dc5a766b"
contentUuid: "248704a4-b0ab-52e0-b451-d640769ebbc6"
diamondUuid: "7843f59f-72a4-8b02-83a7-c06b1b14be77"
uuid: "dc5a766b-9e66-8e6e-892a-cf45342f3e6b"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 98
standards: []
bindings: []
signatures:
  computationUuid: "b4d2412c-1ffe-8864-b6d1-995ce37f9b0f"
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
      stageUuid: "87397f29-4c20-8f88-a8d8-dbad671e43c3"
    - stage: seal
      stageUuid: "8d2c6b1a-a31a-87e0-9f98-70e94621185e"
    - stage: uuid
      stageUuid: "4e8ec906-0fe1-8d36-873d-0c104936d12e"
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
