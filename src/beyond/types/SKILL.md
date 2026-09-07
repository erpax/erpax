---
name: types
description: "Use when you need the shared type vocabulary for the next-horizon conservation primitives (Laws 11-20+22) — causal provenance, deterministic replay, tenant-isolation proof, bitemporal coordinates, cost and carbon metrics, post-quantum signatures, self-explainability, reversible inverse-effects, and AI-decision provenance — what no current standard fully demands yet every regulator will within five years."
atomPath: "beyond/types"
coordinate: "beyond/types · 2/share · 4fcbd908"
contentUuid: "0dccf7a6-b8a9-5ac2-a704-21f9ad6cebda"
diamondUuid: "d8e10336-ccb3-8c9c-a65e-3ac8ca110954"
uuid: "4fcbd908-99ff-85b7-94a8-5177a24864a4"
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
  computationUuid: "5d1e97e4-d793-8e19-a3aa-4021d0db8e14"
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
      stageUuid: "54baa222-4882-82f8-bd11-94a5066ed243"
    - stage: seal
      stageUuid: "8e94cffe-7f5a-8bcb-b904-27a8be669fe6"
    - stage: uuid
      stageUuid: "e2095d47-fabc-81bd-8ee7-3f54b20576bc"
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
