---
name: change
description: "Use when emitting an audit event after a Payload write — the afterChange hook builds a canonical AuditEntry, logs it to the streaming aggregator, and persists a durable, Merkle-chained row to the audit-events collection for tamper-evident SOX evidence."
atomPath: "audit/trail/after/change"
coordinate: "audit/trail/after/change · 4/weave · d9c34208"
contentUuid: "41d20c19-f5c3-5c88-a8ff-5cff5022e09b"
diamondUuid: "4b6e04cb-9d30-8d67-bf89-5a6671db3a04"
uuid: "d9c34208-fd9d-86c8-8271-67e03c7b583d"
horo: 4
typography:
  partition: audit
  bondDegree: 18
standards:
  - "NIST FIPS-180-4 sha-256"
  - "NIST FIPS-180-4 sha-256`"
  - "NIST-FIPS-180-4"
  - "RFC-9562"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls evidence-preservation"
  - "rfc-9562 uuid event-id"
  - "rfc-9562 uuid event-id`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "83d5bfbf-e2ac-8f03-ba8b-0bef02170c4e"
  stages:
    - stage: path
      stageUuid: "be6ac1fb-54a3-82cd-8b82-f3991779d2f4"
    - stage: trinity
      stageUuid: "54517233-37a0-89cd-bea6-4673e248e565"
    - stage: boundary
      stageUuid: "2070abf1-5980-826d-9215-14e9516269e4"
    - stage: links
      stageUuid: "cac2ce41-769e-83ec-b339-e93ef9a9e1c5"
    - stage: horo
      stageUuid: "09db127d-df40-87bb-9d2c-30a9cb8308f2"
    - stage: seal
      stageUuid: "be6e5db3-52ed-8e1c-9240-8cc23b01210f"
    - stage: uuid
      stageUuid: "c8e78360-c10f-8fd4-be12-62745013f8e4"
version: 2
---
# audit/trail/after/change — the [[audit]] afterChange emitter

A factory that returns a Payload `afterChange` [[hooks]] bound to a collection slug. On every create/update it builds a canonical `AuditEntry` (per ISO 19011:2018 §6.4.6 — id, timestamp, operation, document, tenant, actor, status snapshot) and emits it on two channels: channel 1 is `req.payload.logger.info` for streaming aggregators, channel 2 is a durable `audit-events` row whose `rowHash` chains to the prior row's hash (a SHA-256 Merkle chain) so any later insert or mutation breaks the chain. The durable write is guarded — it only fires when both tenant and document ids are present, and a write failure logs loudly instead of blocking the source write. The hook always returns `doc`.

Matter-twin: `src/audit/trail/after/change/index.ts` (`auditTrailAfterChange`). Composes the [[audit]] entry shape from the standards module.

**Law — [[law]]: every write emits a canonical audit entry on two channels — a streaming log and a Merkle-chained durable row — and the source write is never blocked by an audit failure.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard rfc-9562 uuid event-id`
- `@standard NIST FIPS-180-4 sha-256`
