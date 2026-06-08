---
name: failures
description: "Use when capturing, retrying, or auditing failed transactions — payment retries, e-invoice rejections, bank-import errors, GL-post failures — with retry count, error payload, escalation status, and SOX §404 disposition evidence. The active operator error-queue and failure-audit trail."
atomPath: transaction/failures
coordinate: transaction/failures · 5/round · 6d514055
contentUuid: "f55f5669-ab84-5fd1-9161-3b799b7b074e"
diamondUuid: "a27585d9-022a-8da2-85f2-cd808e542449"
uuid: "6d514055-2ddc-8a7d-a9ce-cc046ca8cc31"
horo: 5
bonds:
  in:
    - access
    - accounting
    - failure
    - hooks
    - identity
    - law
    - proof
    - standard
    - transaction
  out:
    - access
    - accounting
    - failure
    - hooks
    - identity
    - law
    - proof
    - standard
    - transaction
typography:
  partition: transaction
  bondDegree: 28
  neighbors: []
standards:
  - "7807 problem-details-for-http-apis status-code"
  - "ISO-19011:2018 audit-trail failure-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time transaction-date"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOC-2 CC7.3 system-incident-response"
  - "SOX §404 internal-controls failure-disposition TOM-FAIL-01"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - hooks
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - access
    - accounting
    - failure
    - hooks
    - identity
    - law
    - proof
    - standard
    - transaction
  backlinks:
    - access
    - accounting
    - failure
    - hooks
    - identity
    - law
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "74a39911-fdc0-8291-a6e5-8c9420aea534"
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
      stageUuid: "3de7cebd-5b66-861c-b401-b8c5a3815c62"
    - stage: seal
      stageUuid: "f07783db-fc27-860b-9ed0-46cae4416da9"
    - stage: uuid
      stageUuid: "85bb566c-9701-8bef-8a91-4d7302b62ce6"
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
