---
name: "19011"
description: Use when implementing or referencing ISO 19011 — Guidelines for auditing management systems.
atomPath: "iso/19011"
coordinate: "iso/19011 · 4/weave · 00efbcb5"
contentUuid: "d4297e68-77c9-51ae-864c-8a9518d7b836"
diamondUuid: "e2606102-4cd9-8f5a-bdd4-4b65141a3a62"
uuid: "00efbcb5-9fc8-8bc5-a4f0-9b865dd59a5a"
horo: 4
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
  computationUuid: "c79d70ab-7531-8d24-a515-b1e22c02057e"
  stages:
    - stage: path
      stageUuid: "d9d5a5ae-924a-8b0e-a4e6-31b63b7216ea"
    - stage: trinity
      stageUuid: "bca02873-2f98-8e7b-a80d-3831d7a02a2b"
    - stage: boundary
      stageUuid: "b844e7d7-b7b7-8df7-972f-b762d7ab2ba1"
    - stage: links
      stageUuid: "d0ac05fe-c571-8c73-aae1-3e3954f6cf51"
    - stage: horo
      stageUuid: "01ebc971-80d8-843b-9af1-b15f36d84736"
    - stage: seal
      stageUuid: "a90929be-cdef-8bf0-90ef-9966e376f97f"
    - stage: uuid
      stageUuid: "9707d2bb-ced6-8a14-837a-4bc285747b96"
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
