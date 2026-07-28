---
name: "19011"
description: Use when implementing or referencing ISO 19011 — Guidelines for auditing management systems.
atomPath: "iso/19011"
coordinate: "iso/19011 · 1/base · 657f245a"
contentUuid: "29a0b4e6-6453-5fb8-b478-944a5324d95d"
diamondUuid: "c181325d-a144-86af-bdf5-944189fcbe5a"
uuid: "657f245a-c513-893f-8757-5518e7055584"
horo: 1
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-19011:2018 audit-trail"
  - "ISO-19011:2018 audit-trail`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - law
  matrix: []
  backlinks: []
signatures:
  computationUuid: "525d86e3-966b-8b80-85eb-be1ba16ddaea"
  stages:
    - stage: path
      stageUuid: "d9d5a5ae-924a-8b0e-a4e6-31b63b7216ea"
    - stage: trinity
      stageUuid: "b0bb3037-8df9-830c-b7e0-c65ab967b939"
    - stage: boundary
      stageUuid: "b844e7d7-b7b7-8df7-972f-b762d7ab2ba1"
    - stage: links
      stageUuid: "54b3115d-1d90-836a-85c4-eb083ec4dbcb"
    - stage: horo
      stageUuid: "040d7f81-cedd-808d-ba08-9a3f77d3aa78"
    - stage: seal
      stageUuid: "d820f8dd-36bb-8322-bdaf-cd95ddbc0fd1"
    - stage: uuid
      stageUuid: "a3424fb3-155f-8af8-8204-691b37a1f237"
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
