---
name: reports
description: "Use when submitting or tracking statutory filings — 10-K/20-F, 10-Q, SOX attestations, annual compliance reports — per legal entity per jurisdiction — filing status, due dates, regulator feedback, and linked audit findings. The regulatory-filing register."
atomPath: "legal/entities/regulatory/reports"
coordinate: "legal/entities/regulatory/reports · 8/crest · c466ff24"
contentUuid: "c0d16ab8-9ae4-5cb4-beef-c52318f214e1"
diamondUuid: "1e47892c-d16a-8927-ba26-a62d85f9ac7f"
uuid: "c466ff24-6cba-86c2-a73a-855fdac96155"
horo: 8
bonds:
  in:
    - accounting
    - balance
    - debit
    - law
    - path
  out:
    - accounting
    - balance
    - debit
    - law
    - path
typography:
  partition: legal
  bondDegree: 28
  neighbors: []
standards:
  - "SAF-T"
  - "SAF-T OECD standard-audit-file-tax"
  - XBRL
  - "XBRL business-reporting"
  - "local-regulatory-filing"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - accounting
    - balance
    - debit
    - law
    - path
  backlinks:
    - accounting
    - balance
    - debit
    - law
    - path
signatures:
  computationUuid: "2efcbca0-285c-833a-b74e-1595a1236885"
  stages:
    - stage: path
      stageUuid: "763d0e92-636c-8473-bf9f-47178fee4ad5"
    - stage: trinity
      stageUuid: "ce1ec4ef-9d6a-83e6-82ff-cdafe702beaa"
    - stage: boundary
      stageUuid: "90fdb745-1853-8b9b-8024-924f36ca4c65"
    - stage: links
      stageUuid: "6eccfbb3-f25c-825e-a1c4-b2d315daaaf6"
    - stage: horo
      stageUuid: "c29b76a0-5d99-880d-8754-8828c9b54baa"
    - stage: seal
      stageUuid: "485f02ef-b0d4-8724-a33a-89669e61e556"
    - stage: uuid
      stageUuid: "f297c5df-fec1-843b-9685-77ec15690623"
version: 2
---
# regulatory-reports

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SAF-T OECD standard-audit-file-tax
- XBRL business-reporting
- local-regulatory-filing
- ISO-27001 A.5.23 cloud-service-tenant-isolation
