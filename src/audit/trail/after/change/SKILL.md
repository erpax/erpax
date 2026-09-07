---
name: change
description: "Use when emitting an audit event after a Payload write — the afterChange hook builds a canonical AuditEntry, logs it to the streaming aggregator, and persists a durable, Merkle-chained row to the audit-events collection for tamper-evident SOX evidence."
atomPath: "audit/trail/after/change"
coordinate: "audit/trail/after/change · 7/descent · 0c6aab01"
contentUuid: "334915bf-1825-50ac-a1bb-00420b2c6008"
diamondUuid: "186ce4e4-3122-8d9e-a5fb-9f173aea318a"
uuid: "0c6aab01-2f54-846a-b07e-e60fc4aaee6c"
horo: 7
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
  computationUuid: "04c6dbec-54e0-85f5-b380-9f96b6586ebf"
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
      stageUuid: "e92e6550-2b93-890a-848d-24ad539d84ef"
    - stage: seal
      stageUuid: "be6e5db3-52ed-8e1c-9240-8cc23b01210f"
    - stage: uuid
      stageUuid: "882c428f-1cca-8d1c-b3a1-f34a883d6de0"
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
