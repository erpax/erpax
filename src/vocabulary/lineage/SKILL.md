---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
atomPath: "vocabulary/lineage"
coordinate: "vocabulary/lineage · 2/share · e5c56049"
contentUuid: "6bf74947-2745-5c17-9d8e-dc22a1803621"
diamondUuid: "f925a13e-af91-8735-b858-88595535bde7"
uuid: "e5c56049-8c3c-866e-b95d-93a0fe2824f9"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 89
standards: []
bindings: []
signatures:
  computationUuid: "84ebc870-100d-8e0e-8c4b-4742cfbfbc10"
  stages:
    - stage: path
      stageUuid: "af972014-9f28-80b4-ba5c-08b7a8f2fd8f"
    - stage: trinity
      stageUuid: "43887ccc-06fb-8d31-acd6-82f4e0650e43"
    - stage: boundary
      stageUuid: "8ade1be1-0d06-8573-9a84-57541b3463a8"
    - stage: links
      stageUuid: "ae5719f3-ed7d-8857-a38b-aed0197e0050"
    - stage: horo
      stageUuid: "0c98e7d2-a1a6-81fe-90f6-1a9e7779a557"
    - stage: seal
      stageUuid: "8d2c6b1a-a31a-87e0-9f98-70e94621185e"
    - stage: uuid
      stageUuid: "3035967c-a455-82f2-a7ec-f25ef590b8ad"
version: 2
---
# lineage

Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement.

**Food traceability is lineage made law.** In [[agriculture]] the provenance chain is regulated: one-step-back / one-step-forward tracing (FDA FSMA §204) assigns a **traceability lot code (TLC)** at first [[postharvest|packing]] and logs **critical tracking events (CTEs)** with **key data elements (KDEs)** at each handoff — harvest, cooling, packing, shipping, receiving. This is the same **content-addressed audit** law as [[supto]] (a lot code IS a content address; CTEs are append-only events): forging the chain costs O(N) rewrites while verifying is O(1) ([[proof]]). [[organic]] / [[certification]] chain-of-custody (no commingling, 5-year records) and [[grade]] / [[lots]] recalls all ride this one spine — trace-back is lineage read upstream.

Composes: [[identity]] · [[history]] · [[ingest]] · [[federation]] · [[audit/events]] · sacred · [[proof]] · [[profane]] · [[agriculture]] · [[supto]] · [[lots]] · [[grade]] · [[postharvest]] · [[organic]] · [[certification]] · [[harvest]].

## Standards
- W3C PROV (provenance)
- Data lineage standards (OpenMetadata)
- FDA FSMA §204 — food traceability (one-up/one-back, TLC/CTE/KDE); GS1 CTE/KDE chain-of-custody
