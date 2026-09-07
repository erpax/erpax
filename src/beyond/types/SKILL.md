---
name: types
description: "Use when you need the shared type vocabulary for the next-horizon conservation primitives (Laws 11-20+22) — causal provenance, deterministic replay, tenant-isolation proof, bitemporal coordinates, cost and carbon metrics, post-quantum signatures, self-explainability, reversible inverse-effects, and AI-decision provenance — what no current standard fully demands yet every regulator will within five years."
atomPath: "beyond/types"
coordinate: "beyond/types · 7/descent · 59de5d2e"
contentUuid: "c85287ae-1b31-5f72-9a00-ae8970a11065"
diamondUuid: "0a8bd80d-3e1b-8fd1-82c5-17e42d2c4edb"
uuid: "59de5d2e-6b16-8b80-948e-47db97fdb983"
horo: 7
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
  computationUuid: "adda517e-c369-8d0d-ab1a-7d29e142e48e"
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
      stageUuid: "d8e64a02-bf74-887e-9105-5368a37325d7"
    - stage: seal
      stageUuid: "8e94cffe-7f5a-8bcb-b904-27a8be669fe6"
    - stage: uuid
      stageUuid: "8b1eb8e4-03ae-8697-83c9-185e6fa008d5"
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
