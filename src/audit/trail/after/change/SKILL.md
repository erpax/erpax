---
name: change
description: "Use when emitting an audit event after a Payload write — the afterChange hook builds a canonical AuditEntry, logs it to the streaming aggregator, and persists a durable, Merkle-chained row to the audit-events collection for tamper-evident SOX evidence."
atomPath: audit/trail/after/change
coordinate: audit/trail/after/change · 1/base · 5c8551a4
contentUuid: "5af2f4de-d026-595c-bc28-dabf5dffa56b"
diamondUuid: "ed0f3d9f-e48f-8e72-acd6-574041febe2b"
uuid: "5c8551a4-fd31-8a8d-b911-a3175f3afbd7"
horo: 1
bonds:
  in:
    - after
    - audit
    - balance
    - changes
    - law
  out:
    - audit
    - balance
    - changes
    - law
typography:
  partition: audit
  bondDegree: 15
  neighbors: []
standards:
  - "ISO-19011:2018 §6.4.6 audit-evidence-collection"
  - "NIST FIPS-180-4 sha-256"
  - "NIST-FIPS-180-4"
  - "RFC-9562"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls evidence-preservation"
  - "rfc-9562 uuid event-id"
bindings: []
neighbors:
  wikilink:
    - audit
    - hooks
    - law
  matrix:
    - audit
    - balance
    - changes
    - law
  backlinks:
    - audit
    - balance
    - changes
    - law
signatures:
  computationUuid: "3879f846-4ae7-8d13-9003-020b20c2d7d1"
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
      stageUuid: "b06f7816-d70d-85eb-b6ad-78151e05737d"
    - stage: seal
      stageUuid: "be6e5db3-52ed-8e1c-9240-8cc23b01210f"
    - stage: uuid
      stageUuid: "e42a53eb-be95-8687-8441-f0ffe9ba8f76"
version: 2
---
# audit/trail/after/change — the [[audit]] afterChange emitter

A factory that returns a Payload `afterChange` [[hooks]] bound to a collection slug. On every create/update it builds a canonical `AuditEntry` (per ISO 19011:2018 §6.4.6 — id, timestamp, operation, document, tenant, actor, status snapshot) and emits it on two channels: channel 1 is `req.payload.logger.info` for streaming aggregators, channel 2 is a durable `audit-events` row whose `rowHash` chains to the prior row's hash (a SHA-256 Merkle chain) so any later insert or mutation breaks the chain. The durable write is guarded — it only fires when both tenant and document ids are present, and a write failure logs loudly instead of blocking the source write. The hook always returns `doc`.

Matter-twin: `src/audit/trail/after/change/index.ts` (`auditTrailAfterChange`). Composes the [[audit]] entry shape from the standards module.

**Law — [[law]]: every write emits a canonical audit entry on two channels — a streaming log and a Merkle-chained durable row — and the source write is never blocked by an audit failure.**
