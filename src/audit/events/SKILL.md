---
name: events
description: "Use when persisting or querying the durable ISO 19011 / SOX §404 evidence trail — every canonical write (orders, invoices, payments, journal entries, period locks) lands one append-only row queryable by tenant/collection/operation/user/timestamp; Merkle hash chain for tamper-evidence; no log-scraping required for auditors. The canonical audit-evidence collection."
atomPath: "audit/events"
coordinate: "audit/events · 2/share · 2422410a"
contentUuid: "5685b2b2-f063-5f2e-928b-556eb6d74b3a"
diamondUuid: "d34e057c-bcc7-8134-9b9b-74d5e08bfc81"
uuid: "2422410a-cedf-8a22-9e38-88ee0b886a16"
horo: 2
bonds:
  in:
    - audit
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
  out:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
typography:
  partition: audit
  bondDegree: 54
  neighbors: []
standards:
  - "5424 §6.2.1 syslog-severity-levels"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
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
neighbors:
  wikilink:
    - horo
    - identity
    - party
    - proof
    - standard
  matrix:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
  backlinks:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
signatures:
  computationUuid: "dbac5c9f-6663-8c32-a883-879953349de6"
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
      stageUuid: "ac2497bb-ad7b-8d57-8781-cff2310b7af2"
    - stage: seal
      stageUuid: "d2c77aca-e4b6-8acf-987b-b12b3b7acfb8"
    - stage: uuid
      stageUuid: "45e6db55-ec14-89ac-9b1e-2b61da5e7882"
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
