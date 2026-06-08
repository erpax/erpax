---
name: "19011"
description: Use when implementing or referencing ISO 19011 — Guidelines for auditing management systems.
atomPath: iso/19011
coordinate: iso/19011 · 4/weave · c0050b20
contentUuid: "64a1394e-c197-5e66-9043-3601563e0711"
diamondUuid: "057be120-7adc-8714-89a7-bd88d4c1441b"
uuid: "c0050b20-6a3d-8e58-bd2f-b2d84c20d46b"
horo: 4
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-19011"
  - "ISO-19011:2018 audit-trail"
  - "ISO-19011:2018` should grep to a"
bindings: []
neighbors:
  wikilink:
    - law
  matrix: []
  backlinks: []
signatures:
  computationUuid: "647a07a7-feb5-8b45-81e1-93a555b4d8d9"
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
      stageUuid: "fa70834e-90af-86a9-84d4-6f2acfaa4796"
    - stage: seal
      stageUuid: "d820f8dd-36bb-8322-bdaf-cd95ddbc0fd1"
    - stage: uuid
      stageUuid: "090fb57d-d8a8-82b3-9939-da5e3400deba"
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
