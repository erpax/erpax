---
name: gaps
description: "Use when identifying, tracking or remediating compliance deficiencies — missing controls, design deficiencies, operating gaps, documentation gaps — against a requirement; severity, status lifecycle (identified → in-remediation → closed), root cause, risk exposure, target closure date, audit trail. The per-tenant gap and deficiency register."
atomPath: compliance/frameworks/compliance/requirements/compliance/gaps
coordinate: compliance/frameworks/compliance/requirements/compliance/gaps · 1/base · 89bac204
contentUuid: "6361ce22-fc09-58c0-9a50-f07aa0c058ee"
diamondUuid: "8f2b4ae3-a1b2-8e36-95d4-b64cda88038f"
uuid: "89bac204-2b69-8dd8-a8cd-91cec2bc2dc1"
horo: 1
bonds:
  in:
    - requirements
  out:
    - requirements
typography:
  partition: compliance
  bondDegree: 3
  neighbors: []
standards:
  - "ISO-19011:2018 nonconformity"
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management"
  - SOX §404 deficiency
  - "US-CTA-2021"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - requirements
  backlinks:
    - requirements
signatures:
  computationUuid: "d11b4e34-343f-89c6-8609-9ddccbf087bf"
  stages:
    - stage: path
      stageUuid: "79c246eb-57f4-8cff-afe3-e3b539110840"
    - stage: trinity
      stageUuid: "d72ef896-9b1f-83f5-a707-338e9d481089"
    - stage: boundary
      stageUuid: "9f79cc69-ca00-8deb-bbf3-88ff24d555f9"
    - stage: links
      stageUuid: "d381a5a3-e35f-86ff-8ed5-295ee2b1a856"
    - stage: horo
      stageUuid: "96ef5f5d-3c93-8797-a4c6-48d787920b02"
    - stage: seal
      stageUuid: "aea2f889-e3d6-8ad2-a6ad-3f925bece28b"
    - stage: uuid
      stageUuid: "b0281e1c-30a1-8473-bd1b-6ece83340af6"
version: 2
---
# compliance-gaps

Compliance Gaps — per-tenant gap and deficiency register against compliance requirements.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-37301:2021 compliance-management
- ISO-19011:2018 nonconformity
- SOX §404 deficiency
- ISO-27001 A.5.23 cloud-service-tenant-isolation
