---
name: ai
description: "Use when invoking any AI inference in erpax — invoice OCR, bank-transaction matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding, semantic search, or audit summarisation. Every AI call goes through the single `callWorkersAi` gate (entitlement, audit row, tenant scope, risk class, metering); the AI services barrel."
atomPath: ai
coordinate: "ai · 1/base · 2eb77a91"
contentUuid: "248101b2-2ba9-5cd8-8b8f-64a87ed83487"
diamondUuid: "93dbdd87-4bb2-88e6-a274-2dc488be70b5"
uuid: "2eb77a91-e2e6-8782-8acc-4abbb8b6a97b"
horo: 1
typography:
  partition: ai
  bondDegree: 25
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU AI Act 2024 transparency-and-risk-classification"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "EU-Intrastat-Reg-2019/2152"
  - "GDPR Art.22(3) right-to-human-intervention"
  - "ISO-20022"
  - "ISO-27001"
  - "ISO-27037"
  - "ISO-8601-1"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC 42001:2023 ai-management-system`"
  - "ISO/IEC-23894"
  - "ISO/IEC-25010"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-42001"
  - "NIST-AI-RMF"
  - "NIST-FIPS-180-4"
  - "OWASP-ASVS"
  - "RFC-4122"
  - "RFC-8785"
  - "RFC-9562"
  - "UN-CEFACT"
  - "WCAG-2.1"
  - "WCO-HS"
  - "— the instrument reads SKILL.md) -->"
bindings:
  - "ai/AI"
  - "vectorize/VECTORIZE_DOCS"
signatures:
  computationUuid: "60aa5991-3535-8654-8705-b2e25a0d0c15"
  stages:
    - stage: path
      stageUuid: "8e6da7ff-0947-8c12-b941-623c69161362"
    - stage: trinity
      stageUuid: "bd0fca7d-3bac-88ca-9531-f0948731efc9"
    - stage: boundary
      stageUuid: "4456c1a7-d28a-88cc-9348-470a0c7845fb"
    - stage: links
      stageUuid: "f3242731-2be8-8b63-9426-5f5881a9813e"
    - stage: horo
      stageUuid: "6b3a7879-bb93-8d5d-b3f8-14967a81e2e3"
    - stage: seal
      stageUuid: "fc61a7fe-c9ef-81cd-8704-4946877a6865"
    - stage: uuid
      stageUuid: "49e0ad26-e698-860e-9c23-d437d7b9fb70"
version: 2
---
# ai — the AI services barrel

Every AI inference in erpax flows through one canonical entry point: `callWorkersAi` in `cloudflare-ai.ts`. That gate enforces five checks on every call: entitlement, audit row, tenant scope, risk class, and metering. The nine thin per-feature wrappers (invoice OCR, bank matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding/upsert, semantic search, audit summarisation) all call through it — never bypass it.

**GDPR Art. 22(3)** requires human intervention for automated decisions with legal/significant effect; sanctions screening hard-codes `aiRiskClass: 'high'` and the wrapper refuses any auto-accept path.

**EU AI Act 2024** transparency and risk classification governs the high-risk AI uses (sanctions, anomaly, fraud); every model invocation carries a risk class that gates the decision path.

**ISO/IEC 42001:2023** is the AI management system standard the `callWorkersAi` audit row fulfils: every inference is logged with tenant, model, risk class, and timing.

**Law — [[law]]: every AI inference flows through the one `callWorkersAi` gate (entitlement · audit row · tenant scope · risk class · metering) — no wrapper bypasses it, so each call is uuid-accounted and high-risk decisions are refused an auto-accept path.**

Industry failure modes (hallucination · audit fragmentation · prompt injection · multi-agent collision · cost runaway) map to erpax diamond remedies in [[ai/industry]] — pure fns + tests, not hand-listed mitigations.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 42001:2023 ai-management-system`


- **ISO/IEC 42001:2023** — ai-management-system. Every `callWorkersAi` invocation produces an audit row.
- **GDPR Art. 22(3)** — right-to-human-intervention. High-risk AI decisions require a human gate; auto-accept is refused.
- **EU AI Act 2024** — transparency-and-risk-classification. Each model call carries a risk class that drives the decision path.

## atoms

The children this atom carries — named here so none is an orphan in the fold:

- [[ai/models]]
