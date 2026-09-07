---
name: "19011"
description: Use when implementing or referencing ISO 19011 — Guidelines for auditing management systems.
atomPath: "iso/19011"
coordinate: "iso/19011 · 5/round · f9430472"
contentUuid: "224352f3-0a32-5d08-a4d4-5e6c44bd947e"
diamondUuid: "90bf8c8e-fe2c-8c5b-8a5e-6b2202966a09"
uuid: "f9430472-d931-8808-b280-e7b5529867ec"
horo: 5
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-19011:2018 audit-trail"
  - "ISO-19011:2018 audit-trail`"
  - "ISO/IEC-29119"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e4ddc080-bf3d-815a-8bd8-0daa2527362e"
  stages:
    - stage: path
      stageUuid: "d9d5a5ae-924a-8b0e-a4e6-31b63b7216ea"
    - stage: trinity
      stageUuid: "bca02873-2f98-8e7b-a80d-3831d7a02a2b"
    - stage: boundary
      stageUuid: "b844e7d7-b7b7-8df7-972f-b762d7ab2ba1"
    - stage: links
      stageUuid: "4131b842-6e73-8421-a899-9a1e7e5956cb"
    - stage: horo
      stageUuid: "f52e5828-3a26-85b7-8ae3-5cd984e57e21"
    - stage: seal
      stageUuid: "a90929be-cdef-8bf0-90ef-9966e376f97f"
    - stage: uuid
      stageUuid: "fb8bd44a-0ad2-805f-aecf-fd48068ada33"
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

- `src/audit/trail/after/change/index.ts` — built an inline log object
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

- `src/audit/trail/after/change/index.ts` — emits one `AuditEntry` per write.
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
