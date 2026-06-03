---
name: ai
description: Use when invoking any AI inference in erpax — invoice OCR, bank-transaction matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding, semantic search, or audit summarisation. Every AI call goes through the single `callWorkersAi` gate (entitlement, audit row, tenant scope, risk class, metering); the AI services barrel.
---

# ai — the AI services barrel

Every AI inference in erpax flows through one canonical entry point: `callWorkersAi` in `cloudflare-ai.ts`. That gate enforces five checks on every call: entitlement, audit row, tenant scope, risk class, and metering. The nine thin per-feature wrappers (invoice OCR, bank matching, sanctions screening, anomaly detection, tax classification, HS-code suggestion, document classification, vector embedding/upsert, semantic search, audit summarisation) all call through it — never bypass it.

**GDPR Art. 22(3)** requires human intervention for automated decisions with legal/significant effect; sanctions screening hard-codes `aiRiskClass: 'high'` and the wrapper refuses any auto-accept path.

**EU AI Act 2024** transparency and risk classification governs the high-risk AI uses (sanctions, anomaly, fraud); every model invocation carries a risk class that gates the decision path.

**ISO/IEC 42001:2023** is the AI management system standard the `callWorkersAi` audit row fulfils: every inference is logged with tenant, model, risk class, and timing.

## Standards

- **ISO/IEC 42001:2023** — ai-management-system. Every `callWorkersAi` invocation produces an audit row.
- **GDPR Art. 22(3)** — right-to-human-intervention. High-risk AI decisions require a human gate; auto-accept is refused.
- **EU AI Act 2024** — transparency-and-risk-classification. Each model call carries a risk class that drives the decision path.
