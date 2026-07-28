---
name: ai
description: "Use when invoking any AI inference in erpax — invoice OCR, bank-transaction matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding, semantic search, or audit summarisation. Every AI call goes through the single `callWorkersAi` gate (entitlement, audit row, tenant scope, risk class, metering); the AI services barrel."
atomPath: ai
coordinate: "ai · 1/base · 385e3d9b"
contentUuid: "a35559b3-e46a-5cad-ac6a-f1b3563b95d4"
diamondUuid: "37a36ecd-23ad-8bf5-8f39-067964b4ac76"
uuid: "385e3d9b-b930-8c08-acc1-76f9a7df1cf5"
horo: 1
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
  computationUuid: "87b85501-377f-8e73-9f56-5c5874613bc0"
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
      stageUuid: "42dc441e-75cf-804a-aff0-13a9623cc031"
    - stage: seal
      stageUuid: "fc61a7fe-c9ef-81cd-8704-4946877a6865"
    - stage: uuid
      stageUuid: "094926e0-28d1-8169-a6a4-7e7b162325c6"
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
