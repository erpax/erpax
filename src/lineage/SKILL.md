---
name: lineage
description: "Use when tracking data origin and transformation — source-to-target lineage, transformation tracking, column-level lineage, lineage visualization, provenance chain, audit trail of data movement."
atomPath: lineage
coordinate: lineage · 7/descent · 85671fa9
contentUuid: "4169a626-d7f1-5856-b716-ceb178ff481a"
diamondUuid: "84318061-1139-8d09-aef6-d23650044d21"
uuid: "85671fa9-b482-8c1d-9ce2-ba70d2cef5ca"
horo: 7
bonds:
  in:
    - accounting
    - agriculture
    - animal
    - aquaculture
    - baseline
    - breed
    - catholicism
    - certification
    - cloning
    - dna
    - empirical
    - events
    - federation
    - forestry
    - grade
    - harvest
    - history
    - identity
    - ingest
    - karma
    - livestock
    - lots
    - organic
    - orthodoxy
    - postharvest
    - profane
    - proof
    - sacred
    - shia
    - supto
    - terroir
  out:
    - accounting
    - agriculture
    - animal
    - aquaculture
    - baseline
    - breed
    - catholicism
    - certification
    - cloning
    - dna
    - empirical
    - events
    - federation
    - forestry
    - grade
    - harvest
    - history
    - identity
    - ingest
    - karma
    - livestock
    - lots
    - organic
    - orthodoxy
    - postharvest
    - profane
    - proof
    - sacred
    - shia
    - supto
    - terroir
typography:
  partition: lineage
  bondDegree: 98
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - certification
    - events
    - federation
    - grade
    - harvest
    - history
    - identity
    - ingest
    - lots
    - organic
    - postharvest
    - profane
    - proof
    - sacred
    - supto
  matrix:
    - accounting
    - agriculture
    - animal
    - aquaculture
    - baseline
    - breed
    - catholicism
    - certification
    - cloning
    - dna
    - empirical
    - events
    - federation
    - forestry
    - grade
    - harvest
    - history
    - identity
    - ingest
    - karma
    - livestock
    - lots
    - organic
    - orthodoxy
    - postharvest
    - profane
    - proof
    - sacred
    - shia
    - supto
    - terroir
  backlinks:
    - accounting
    - agriculture
    - animal
    - aquaculture
    - baseline
    - breed
    - catholicism
    - certification
    - cloning
    - dna
    - empirical
    - events
    - federation
    - forestry
    - grade
    - harvest
    - history
    - identity
    - ingest
    - karma
    - livestock
    - lots
    - organic
    - orthodoxy
    - postharvest
    - profane
    - proof
    - sacred
    - shia
    - supto
    - terroir
signatures:
  computationUuid: "8727c210-fc78-8326-a079-52185a48c1d8"
  stages:
    - stage: path
      stageUuid: "7f12ffdb-804b-8f67-96d2-d8e2d7e143ed"
    - stage: trinity
      stageUuid: "bd9a99f0-4f83-8e0e-b9f1-acb6d077e4f0"
    - stage: boundary
      stageUuid: "7cfebc6e-f280-83da-ade5-723f7244e580"
    - stage: links
      stageUuid: "61cd3c75-053d-805c-8faa-c312d0ad1182"
    - stage: horo
      stageUuid: "b80ea5fa-d62c-88a5-8acb-1c4346217dfb"
    - stage: seal
      stageUuid: "29e7be2a-d548-8ac5-ba06-079a6af5bc3a"
    - stage: uuid
      stageUuid: "87467d14-4901-810d-8f23-0a4945bf3f1c"
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
