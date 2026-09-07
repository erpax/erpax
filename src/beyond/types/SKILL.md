---
name: types
description: "Use when you need the shared type vocabulary for the next-horizon conservation primitives (Laws 11-20+22) — causal provenance, deterministic replay, tenant-isolation proof, bitemporal coordinates, cost and carbon metrics, post-quantum signatures, self-explainability, reversible inverse-effects, and AI-decision provenance — what no current standard fully demands yet every regulator will within five years."
atomPath: "beyond/types"
coordinate: "beyond/types · 2/share · 3612dd40"
contentUuid: "08e3596d-8bc7-599f-bd59-320db1550f5a"
diamondUuid: "2178eead-6fa9-8076-997c-abdcc6838840"
uuid: "3612dd40-62ac-8a02-9325-a6901b3d6bcf"
horo: 2
typography:
  partition: beyond
  bondDegree: 85
standards:
  - ESRS E1 (climate change disclosures — gCO2e per activity)
  - "EU AI Act 2024/1689 (Annex IV — technical documentation)"
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
signatures:
  computationUuid: "25b04e06-ffaf-81ab-b7d2-21dfe62fc3c0"
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
      stageUuid: "5943537a-a4aa-820a-bc64-bf049b2b4cd2"
    - stage: seal
      stageUuid: "8e94cffe-7f5a-8bcb-b904-27a8be669fe6"
    - stage: uuid
      stageUuid: "d28a5191-64e8-89fd-a100-0b2fec901ea9"
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
