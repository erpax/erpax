---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
atomPath: "vocabulary/lineage"
coordinate: "vocabulary/lineage · 7/descent · 4d0cef42"
contentUuid: "fc8d169e-c9be-5fa4-99a5-1ab4c38f90e9"
diamondUuid: "f9d28f38-c286-8241-be12-275b53d06c0f"
uuid: "4d0cef42-f6fb-8ec4-9c5d-3c361cb648ec"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 96
standards: []
bindings: []
signatures:
  computationUuid: "9402b629-e6ee-8a99-bfdd-804a312bc9bc"
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
      stageUuid: "361f273f-e008-8916-97bb-72ca480bae9b"
    - stage: seal
      stageUuid: "8d2c6b1a-a31a-87e0-9f98-70e94621185e"
    - stage: uuid
      stageUuid: "d4856f0f-5600-8c9f-95aa-a0c8f5bf980e"
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
