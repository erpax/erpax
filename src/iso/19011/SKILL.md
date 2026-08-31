---
name: "19011"
description: Use when implementing or referencing ISO 19011 — Guidelines for auditing management systems.
atomPath: "iso/19011"
coordinate: "iso/19011 · 4/weave · 5b4daf92"
contentUuid: "cd6a98c2-c373-5abb-96b9-4b7bac36a58a"
diamondUuid: "7f349555-293e-815b-8ce6-fb052fa4b877"
uuid: "5b4daf92-2baa-8ce8-b084-4508ce29eece"
horo: 4
typography:
  partition: iso
  bondDegree: 1
standards:
  - "ISO-19011:2018 audit-trail"
  - "ISO-19011:2018 audit-trail`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "be3bc98a-b8ac-801d-a9dd-fdc4840f97a2"
  stages:
    - stage: path
      stageUuid: "d9d5a5ae-924a-8b0e-a4e6-31b63b7216ea"
    - stage: trinity
      stageUuid: "bca02873-2f98-8e7b-a80d-3831d7a02a2b"
    - stage: boundary
      stageUuid: "b844e7d7-b7b7-8df7-972f-b762d7ab2ba1"
    - stage: links
      stageUuid: "54b3115d-1d90-836a-85c4-eb083ec4dbcb"
    - stage: horo
      stageUuid: "b23d1ecc-cabd-80bf-9a47-56ab6ba09cb7"
    - stage: seal
      stageUuid: "87a2c432-eeaa-877e-9f7c-ef389f9efaf6"
    - stage: uuid
      stageUuid: "db4d8d98-3db7-81a8-bc41-f3b8eb7a85a8"
version: 2
---
# ISO 19011 — Guidelines for auditing management systems

**Edition:** ISO 19011:2018.
**Publisher:** <https://www.iso.org/standard/70017.html>
**Online browsing:** <https://www.iso.org/obp/ui/#iso:std:iso:19011:ed-3:v1:en>

## What's here

- `types.ts` — canonical audit-trail data shapes:
  - `AuditOperation` — `'create' | 'update' | 'delete'`
  - `AuditEntry` — the single source of truth for an audit-trail row
    (who/what/when/why), shared between the structured-log emitter
    (`auditTrailAfterChange`) and the durable `audit-events` collection
  - `AuditChangeRecord` — old/new pair for a single field change
  - `AuditTrailContext` — caller context carried through hook → log → collection
- `index.ts` — barrel for the public surface.

## Why a canonical types module

Per the project's standards convention (`docs/STANDARDS.md` §3), every
governing standard cited via `@audit ISO-19011:2018` should grep to a
single home that owns the types. Before this module, three places
defined overlapping shapes:

- `src/hooks/auditTrailAfterChange.ts` — built an inline log object
- `src/plugins/accounting/collections/AuditEvents.ts` — defined the
  persistent row shape
- domain-specific event payloads — duplicated `userId / tenantId / timestamp`

Now they all import `AuditEntry` from here. Drift becomes a compile-time
error; auditors querying `audit-events` see the same field names the
log aggregator emits.

## Out of scope

- The audit-evidence preservation model (ISO/IEC 27037:2012) — that's
  a separate folder if/when needed; this module covers the *shape* of
  the audit trail, not its retention/integrity guarantees.
- Statistical-sampling methodology for SOX testing — see
  `finance:sox-testing` skill and the `ControlTests` collection.

## Used by

- `src/hooks/auditTrailAfterChange.ts` — emits one `AuditEntry` per write.
- `src/plugins/accounting/collections/AuditEvents.ts` — persists `AuditEntry`.
- `src/plugins/accounting/collections/AuditFindings.ts` — references
  `AuditEntry.id` as evidence for a finding.

## References

- ISO 19011:2018 §6.4.6 — audit evidence collection.
- ISO 19011:2018 §6.5 — preparation of audit conclusions.
- SOX §404 — internal-controls evidence preservation.
- SOC 2 CC4.1 — monitoring and evaluation.

**Law — [[law]]: the audit-trail shape (`AuditEntry` who/what/when/why) has exactly one canonical home here that the log emitter and the durable `audit-events` collection both import — so drift between what auditors query and what the aggregator emits becomes a compile-time error, not a silent divergence.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19011:2018 audit-trail`

Composes: [[standards]].
