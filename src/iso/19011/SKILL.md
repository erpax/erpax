---
name: "19011"
description: "Use when implementing or referencing ISO 19011 — Guidelines for auditing management systems."
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
