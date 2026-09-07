---
name: failures
description: "Use when capturing, retrying, or auditing failed transactions — payment retries, e-invoice rejections, bank-import errors, GL-post failures — with retry count, error payload, escalation status, and SOX §404 disposition evidence. The active operator error-queue and failure-audit trail."
atomPath: "transaction/failures"
coordinate: "transaction/failures · 1/base · 62eca852"
contentUuid: "b8fbf29f-0756-5039-a9a0-32b1c1208f0f"
diamondUuid: "cce3df3f-80e7-8555-a825-9c1216d03446"
uuid: "62eca852-ab31-8d70-ad9d-3cddd095aa6d"
horo: 1
typography:
  partition: transaction
  bondDegree: 28
standards:
  - "7807 problem-details-for-http-apis status-code"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time transaction-date"
  - "ISO-8601-1:2019 date-time transaction-date`"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOC-2 CC7.3 system-incident-response"
  - "SOX §404 internal-controls failure-disposition TOM-FAIL-01"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ea056a0b-37d4-8c9f-b690-b30ab4aa86f8"
  stages:
    - stage: path
      stageUuid: "ea3765e6-99c3-82c9-86b2-84b37bc53e86"
    - stage: trinity
      stageUuid: "66d4a812-d28a-8156-8617-7c0fdc55c532"
    - stage: boundary
      stageUuid: "4ea5dbc1-a6f8-84c3-8ccb-2a3c9b2d49fd"
    - stage: links
      stageUuid: "73dc0222-02c3-82b4-8d58-e3ad1ef724cd"
    - stage: horo
      stageUuid: "cc27d9d6-c251-8cf8-8b91-9e018b7b5659"
    - stage: seal
      stageUuid: "137850dc-a305-8ff1-ab4a-60612b60bd37"
    - stage: uuid
      stageUuid: "7648ff00-196b-8687-8c8c-2335d26f736b"
version: 2
---
# transaction-failures

Transaction Failures — error queue for retry / SOX evidence trail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Captures every failed [[transaction]] (payment retry, e-invoice submission, bank import, GL post) with retry-count + last-error-message so SOX §404 controls can prove "we tried, and here's why it failed". Distinct from `audit-events` (the canonical event log) — this is the active **work-queue** the operator console drains.

Composes: [[accounting]] (control domain) · [[transaction]] (the failed exchange) · [[hooks]] (lifecycle mutations) · [[access]] (operator RBAC) · [[identity]] (failure reference) · [[proof]] (forensic audit trail) · [[standard]] (SOX/ISO compliance).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time transaction-date`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time transaction-date
- RFC 7807 problem-details-for-http-apis status-code
- ISO-19011:2018 audit-trail failure-evidence
- SOX §404 internal-controls failure-disposition TOM-FAIL-01
- SOC-2 CC4.1 monitoring-and-evaluation
- SOC-2 CC7.3 system-incident-response
- ISO-27001 A.5.24 incident-management-planning
- ISO-27002 §5.27 information-security-event-correction

**Law — [[law]]: a failed transaction is never silently dropped — it is retained in the queue with its retry count and last error until it succeeds or is dispositioned, leaving an auditable trail of every attempt.**
