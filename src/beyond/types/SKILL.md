---
name: types
description: "Use when you need the shared type vocabulary for the next-horizon conservation primitives (Laws 11-20+22) — causal provenance, deterministic replay, tenant-isolation proof, bitemporal coordinates, cost and carbon metrics, post-quantum signatures, self-explainability, reversible inverse-effects, and AI-decision provenance — what no current standard fully demands yet every regulator will within five years."
atomPath: "beyond/types"
coordinate: "beyond/types · 5/round · e6fd5efc"
contentUuid: "33eb4080-a380-53a6-b45c-2706b43e9823"
diamondUuid: "917411d1-af47-8e51-a745-915f3ebe8c79"
uuid: "e6fd5efc-05cc-8e1f-9bd2-65f312580c1f"
horo: 5
bonds:
  in:
    - beyond
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  out:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
typography:
  partition: beyond
  bondDegree: 66
  neighbors:
    - agent
standards:
  - ESRS E1 (climate change disclosures — gCO2e per activity)
  - "EU AI Act 2024/1689 (Annex IV — technical documentation)"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "EU-ESRS"
  - "ISO 19944 cloud-services data-flow + jurisdiction"
  - "ISO 19944 cloud-services data-flow + jurisdiction`"
  - "ISRS 4400 agreed-upon-procedures (replay verification)"
  - "NIST FIPS 203 ML-KEM + FIPS 204 ML-DSA (PQC, 2024)"
  - "NIST FIPS 203 ML-KEM + FIPS 204 ML-DSA (PQC, 2024)`"
  - "NIST SP 800-208 stateful-hash-based-signatures (PQC)"
  - "NIST SP 800-208 stateful-hash-based-signatures (PQC)`"
  - "NIST-SP-800-63"
  - W3C PROV (Provenance Data Model)
  - "W3C PROV (Provenance Data Model)`"
  - "W3C-PROV-O"
  - XBRL
  - "XBRL inline-XBRL (machine-explainability of financial values)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - agent
    - audit
    - beyond
    - law
  matrix:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  backlinks:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
signatures:
  computationUuid: "8de6aaa2-6a38-83d3-bfb9-198a99753b4b"
  stages:
    - stage: path
      stageUuid: "9ff56465-1a02-8cc2-ab50-4c860c468098"
    - stage: trinity
      stageUuid: "972c7a33-b6de-80ea-8040-dfc2d1eb5b89"
    - stage: boundary
      stageUuid: "3a9f5de1-88c0-89ce-a73d-ae9c5ff44f59"
    - stage: links
      stageUuid: "2bb91e74-9495-85da-989e-f5637b25639d"
    - stage: horo
      stageUuid: "ed796be7-eecf-800f-895b-f272ecf90d4b"
    - stage: seal
      stageUuid: "0de5ce42-778c-8676-80d8-4a13990588fb"
    - stage: uuid
      stageUuid: "2ca84492-8688-8781-8c12-836414d75e4b"
version: 2
---
# beyond/types — beyond-current-standards type vocabulary

The shared, value-free **types** for the ten next-horizon conservation primitives — W3C PROV causality, ISRS-4400 deterministic replay, tenant-isolation provability, bitemporal coordinates, ESRS-E1 carbon, FIPS-203/204 post-quantum signatures, XBRL-style self-explainability, reversible inverse-effects, and EU-AI-Act AI provenance. Pure interfaces: they carry no runtime, only the contract every [[beyond]] [[law]] is measured against.

Matter-twin: `src/beyond/types/index.ts` — interfaces `CausalLink` · `Provenance` · `ReplayRequest` · `ReplayResult` · `TenantScopedQuery` · `BitemporalCoordinates` · `CostMetric` · `CarbonEstimate` · `PqcSignature` · `Explanation` · `AiProvenance`; the `PqcAlgorithm` and `InverseEffect` unions. Builds on [[audit]] leaves and the [[agent]] effect.

**Law — [[law]]: every value carries the provenance, cost, and reversibility a future regulator will demand — the type is the contract, asserted once and conserved everywhere.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C PROV (Provenance Data Model)`
- `@standard NIST SP 800-208 stateful-hash-based-signatures (PQC)`
- `@standard NIST FIPS 203 ML-KEM + FIPS 204 ML-DSA (PQC, 2024)`
- `@standard ISO 19944 cloud-services data-flow + jurisdiction`
