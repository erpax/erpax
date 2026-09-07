---
name: ai
description: "Use when invoking any AI inference in erpax — invoice OCR, bank-transaction matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding, semantic search, or audit summarisation. Every AI call goes through the single `callWorkersAi` gate (entitlement, audit row, tenant scope, risk class, metering); the AI services barrel."
atomPath: ai
coordinate: "ai · 5/round · 25cbf626"
contentUuid: "860577fb-86f2-5a0b-a97d-4137d1ef646e"
diamondUuid: "6ebbcd0a-b51a-82b2-9092-78a3f4630d40"
uuid: "25cbf626-e105-8ba0-87ae-ed1d2ec79868"
horo: 5
typography:
  partition: ai
  bondDegree: 36
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
  computationUuid: "0f646dc9-6be8-8489-8f10-1944143c6e05"
  stages:
    - stage: path
      stageUuid: "8e6da7ff-0947-8c12-b941-623c69161362"
    - stage: trinity
      stageUuid: "bd0fca7d-3bac-88ca-9531-f0948731efc9"
    - stage: boundary
      stageUuid: "3abbe00d-d12c-84ed-99d5-d015eb1ef4f7"
    - stage: links
      stageUuid: "f3242731-2be8-8b63-9426-5f5881a9813e"
    - stage: horo
      stageUuid: "c30324ed-3a6e-851f-956c-5fd3dfbc9b49"
    - stage: seal
      stageUuid: "fc61a7fe-c9ef-81cd-8704-4946877a6865"
    - stage: uuid
      stageUuid: "3c76d6c5-9006-89e1-bd02-01c95d705302"
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
