---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
atomPath: "vocabulary/lineage"
coordinate: "vocabulary/lineage · 7/descent · 9848d18a"
contentUuid: "f1e90e92-28e7-5efd-bf08-d69e56730b58"
diamondUuid: "d0d6fba5-e85d-8a66-b91d-d854b46bb1bc"
uuid: "9848d18a-a5ec-808c-bcea-79acc76fc5e6"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 98
standards: []
bindings: []
signatures:
  computationUuid: "0e04d372-16fd-8236-9546-1b1e42cbf9df"
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
      stageUuid: "d41743bc-eda4-8875-8bc1-f84cf984b1d2"
    - stage: seal
      stageUuid: "8d2c6b1a-a31a-87e0-9f98-70e94621185e"
    - stage: uuid
      stageUuid: "3da0153e-06f0-8e97-b6c3-7b54cf1cbb3d"
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
