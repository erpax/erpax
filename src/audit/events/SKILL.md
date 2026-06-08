---
name: events
description: "Use when persisting or querying the durable ISO 19011 / SOX §404 evidence trail — every canonical write (orders, invoices, payments, journal entries, period locks) lands one append-only row queryable by tenant/collection/operation/user/timestamp; Merkle hash chain for tamper-evidence; no log-scraping required for auditors. The canonical audit-evidence collection."
atomPath: audit/events
coordinate: audit/events · 8/crest · cedd07f4
contentUuid: "692b9140-491a-512f-981c-a7f6fcf2e4fb"
diamondUuid: "d5eba42c-8ae1-8698-9790-f408930773f9"
uuid: "cedd07f4-fd1e-81d6-a879-2e1c8c6e875d"
horo: 8
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
  - "ISO-19011"
  - "ISO-19011:2018 audit-trail"
  - "ISO-19011:2018 §6.4.6 audit-evidence-collection"
  - "ISO-19011:2018 §6.4.6 audit-evidence-collection unique-event-identifier"
  - "ISO-19011:2018 §6.4.6 audit-evidence-immutability"
  - "ISO-19011:2018 §6.5 audit-conclusions"
  - "ISO-27037"
  - "ISO/IEC 27037:2012 evidence-preservation"
  - "NIST FIPS-180-4 sha-256"
  - "NIST-FIPS-180-4"
  - "RFC-9562"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §302 disclosure-controls"
  - "SOX §404 internal-controls audit-tamper-evidence"
  - "SOX §404 internal-controls evidence-preservation"
  - "rfc-9562 uuid event-id"
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
  computationUuid: "bb3bffb9-9468-8d7e-8e78-b19cf1fdcb6a"
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
      stageUuid: "e6aea350-fb6e-89ec-a28f-7b7af597c2b4"
    - stage: seal
      stageUuid: "d2c77aca-e4b6-8acf-987b-b12b3b7acfb8"
    - stage: uuid
      stageUuid: "45761baf-bc03-8d41-a7d3-04300b22d944"
version: 2
---
# audit-events

Audit Events — persistent ISO 19011 / SOX §404 evidence trail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Append-only by design: read is tenant-scoped, create is the canonical hook only, update is forbidden, delete is admin-emergency. The durable, queryable evidence target — every canonical write (orders, invoices, payments, journal entries, subscriptions, fiscal periods, …) lands one row the auditor queries by `(tenant, collection, operation, user, timestamp)` instead of scraping logs.

## Standards
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
