---
name: ai
description: "Use when invoking any AI inference in erpax — invoice OCR, bank-transaction matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding, semantic search, or audit summarisation. Every AI call goes through the single `callWorkersAi` gate (entitlement, audit row, tenant scope, risk class, metering); the AI services barrel."
atomPath: ai
coordinate: "ai · 4/weave · 1b8aa76c"
contentUuid: "c7ac75eb-022c-51c6-b994-8a8357a46874"
diamondUuid: "3143b593-af66-8e8e-b4c1-1c65132d25cd"
uuid: "1b8aa76c-ef8d-821e-afdb-53be7d7d871c"
horo: 4
typography:
  partition: ai
  bondDegree: 40
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
  computationUuid: "9a2fa57e-2190-87ad-9032-06b931f45337"
  stages:
    - stage: path
      stageUuid: "8e6da7ff-0947-8c12-b941-623c69161362"
    - stage: trinity
      stageUuid: "bd0fca7d-3bac-88ca-9531-f0948731efc9"
    - stage: boundary
      stageUuid: "3abbe00d-d12c-84ed-99d5-d015eb1ef4f7"
    - stage: links
      stageUuid: "ff12b777-fa00-8f18-acf8-4acd6058dc07"
    - stage: horo
      stageUuid: "14a5218a-1a0a-8fc4-8276-a4ccb3fb0dd6"
    - stage: seal
      stageUuid: "fc61a7fe-c9ef-81cd-8704-4946877a6865"
    - stage: uuid
      stageUuid: "8c8b3b59-8fe4-84bd-8574-97c521cbfc82"
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
