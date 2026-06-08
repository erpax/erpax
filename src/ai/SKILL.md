---
name: ai
description: "Use when invoking any AI inference in erpax — invoice OCR, bank-transaction matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding, semantic search, or audit summarisation. Every AI call goes through the single `callWorkersAi` gate (entitlement, audit row, tenant scope, risk class, metering); the AI services barrel."
atomPath: ai
coordinate: ai · 4/weave · 120e69b4
contentUuid: "e04a68d7-3b30-58de-9976-8a59bb0c9cf1"
diamondUuid: "d84b469d-6228-851d-90d5-96143cca7dcf"
uuid: "120e69b4-ee6e-89e2-953d-106134f1b117"
horo: 4
bonds:
  in:
    - bindings
    - identity
    - industry
    - law
    - models
  out:
    - bindings
    - identity
    - industry
    - law
    - models
typography:
  partition: ai
  bondDegree: 31
  neighbors:
    - agent
    - cloudflare
    - diamond
    - secret
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU AI Act 2024 transparency-and-risk-classification"
  - "EU-2002/58"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-2023/1113"
  - "EU-2023/2854"
  - "EU-2023/956-CBAM"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "EU-Intrastat-Reg-2019/2152"
  - "GDPR Art.22(3) right-to-human-intervention"
  - "ILO-C001"
  - "ISO-20022"
  - "ISO-27001"
  - "ISO-27037"
  - "ISO-8601-1"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC-23894"
  - "ISO/IEC-25010"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-42001"
  - "NIST-AI-RMF"
  - "NIST-FIPS-180-4"
  - "RFC-4122"
  - "RFC-8785"
  - "RFC-9562"
  - "UN-CEFACT"
  - "WCAG-2.1"
  - "WCO-HS"
bindings:
  - ai/AI
  - vectorize/VECTORIZE_DOCS
neighbors:
  wikilink:
    - industry
    - law
  matrix:
    - bindings
    - identity
    - industry
    - law
    - models
  backlinks:
    - bindings
    - identity
    - industry
    - law
    - models
signatures:
  computationUuid: "b9b4485a-c10a-8a37-abe0-60ec05dc66ea"
  stages:
    - stage: path
      stageUuid: "8e6da7ff-0947-8c12-b941-623c69161362"
    - stage: trinity
      stageUuid: "bd0fca7d-3bac-88ca-9531-f0948731efc9"
    - stage: boundary
      stageUuid: "4456c1a7-d28a-88cc-9348-470a0c7845fb"
    - stage: links
      stageUuid: "ff12b777-fa00-8f18-acf8-4acd6058dc07"
    - stage: horo
      stageUuid: "26f01e67-2099-84cb-8a16-2869cb734306"
    - stage: seal
      stageUuid: "f3b34506-5041-817c-816d-e538428e2450"
    - stage: uuid
      stageUuid: "df436b8c-ec32-80bf-bc92-7a2e565409f3"
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

- **ISO/IEC 42001:2023** — ai-management-system. Every `callWorkersAi` invocation produces an audit row.
- **GDPR Art. 22(3)** — right-to-human-intervention. High-risk AI decisions require a human gate; auto-accept is refused.
- **EU AI Act 2024** — transparency-and-risk-classification. Each model call carries a risk class that drives the decision path.
