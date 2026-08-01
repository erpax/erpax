---
name: events
description: "Use when persisting or querying the durable ISO 19011 / SOX §404 evidence trail — every canonical write (orders, invoices, payments, journal entries, period locks) lands one append-only row queryable by tenant/collection/operation/user/timestamp; Merkle hash chain for tamper-evidence; no log-scraping required for auditors. The canonical audit-evidence collection."
atomPath: "audit/events"
coordinate: "audit/events · 4/weave · 276cc67e"
contentUuid: "8b30cc9f-ec09-57a6-bbb8-03065bb52eab"
diamondUuid: "c749a37a-2fc8-8dd7-8ecf-894600ae5a85"
uuid: "276cc67e-f034-83e5-a671-369c17fa5485"
horo: 4
typography:
  partition: audit
  bondDegree: 54
standards:
  - "5424 §6.2.1 syslog-severity-levels"
  - "GDPR Art.30 records-of-processing-activities"
  - "ISO 27037:2012 evidence-preservation"
  - "ISO 27037:2012 evidence-preservation`"
  - "ISO-19011"
  - "ISO-19011:2018 §6.4.6 audit-evidence-collection"
  - "ISO-19011:2018 §6.4.6 audit-evidence-collection`"
  - "ISO-19011:2018 §6.5 audit-conclusions"
  - "ISO-19011:2018 §6.5 audit-conclusions`"
  - "ISO-27037"
  - "ISO/IEC 27037:2012 evidence-preservation"
  - "ISO/IEC 27037:2012 evidence-preservation`"
  - "NIST FIPS-180-4 sha-256"
  - "NIST FIPS-180-4 sha-256`"
  - "NIST-FIPS-180-4"
  - "RFC-9562"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §302 disclosure-controls"
  - "SOX §404 internal-controls audit-tamper-evidence"
  - "SOX §404 internal-controls evidence-preservation"
  - "rfc-9562 uuid event-id"
  - "rfc-9562 uuid event-id`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e82bd094-5755-8b82-a45f-4be77bfdc845"
  stages:
    - stage: path
      stageUuid: "f934e69e-3f08-8563-bbd9-ba5342f878ad"
    - stage: trinity
      stageUuid: "1d31a972-abb4-87a7-8bb1-b78fb5e30848"
    - stage: boundary
      stageUuid: "03155da9-4ad3-838b-8704-c25659e05e87"
    - stage: links
      stageUuid: "76a23ae0-664d-8828-99a0-f95e91e22b86"
    - stage: horo
      stageUuid: "3918e6ab-3207-84d6-aa18-9457db367caf"
    - stage: seal
      stageUuid: "d2c77aca-e4b6-8acf-987b-b12b3b7acfb8"
    - stage: uuid
      stageUuid: "cc2f65cb-6753-87a9-a1f3-beab64f4ca40"
version: 2
---
# audit-events

Audit Events — persistent ISO 19011 / SOX §404 evidence trail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Append-only by design: read is tenant-scoped, create is the canonical hook only, update is forbidden, delete is admin-emergency. The durable, queryable evidence target — every canonical write (orders, invoices, payments, journal entries, subscriptions, fiscal periods, …) lands one row the auditor queries by `(tenant, collection, operation, user, timestamp)` instead of scraping logs.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19011:2018 §6.4.6 audit-evidence-collection`
- `@standard ISO-19011:2018 §6.5 audit-conclusions`
- `@standard ISO/IEC 27037:2012 evidence-preservation`
- `@standard rfc-9562 uuid event-id`
- `@standard NIST FIPS-180-4 sha-256`
- `@standard ISO 27037:2012 evidence-preservation`

- ISO-19011:2018 §6.4.6 audit-evidence-collection
- ISO-19011:2018 §6.5 audit-conclusions
- ISO/IEC 27037:2012 evidence-preservation
- SOC-2 CC4.1 monitoring-and-evaluation
- SOX §302 disclosure-controls
- SOX §404 internal-controls evidence-preservation
- GDPR Art.30 records-of-processing-activities
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §8.15 logging
- ISO-19011:2018 audit-trail
- rfc-9562 uuid event-id
- ISO-19011:2018 §6.4.6 audit-evidence-collection unique-event-identifier
- SOX §404 internal-controls evidence-preservation
- NIST FIPS-180-4 sha-256
- ISO 27037:2012 evidence-preservation
- ISO-19011:2018 §6.4.6 audit-evidence-immutability
- SOX §404 internal-controls audit-tamper-evidence

Composes: [[proof]] · [[identity]] · [[party]] · [[horo]] · [[standard]].
