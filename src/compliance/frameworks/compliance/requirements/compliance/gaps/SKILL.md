---
name: gaps
description: "Use when identifying, tracking or remediating compliance deficiencies — missing controls, design deficiencies, operating gaps, documentation gaps — against a requirement; severity, status lifecycle (identified → in-remediation → closed), root cause, risk exposure, target closure date, audit trail. The per-tenant gap and deficiency register."
atomPath: "compliance/frameworks/compliance/requirements/compliance/gaps"
coordinate: "compliance/frameworks/compliance/requirements/compliance/gaps · 2/share · 300a0cb7"
contentUuid: "e6c3f87b-77db-5f41-9837-8ec7e9dd026b"
diamondUuid: "184a2856-331f-887f-b630-578eb67c9e4e"
uuid: "300a0cb7-808b-80e5-9ddf-b2570b5a5725"
horo: 2
bonds:
  in:
    - coincidence
    - law
    - rules
    - seeing
    - theorem
    - think
  out:
    - coincidence
    - law
    - rules
    - seeing
    - theorem
    - think
typography:
  partition: compliance
  bondDegree: 19
  neighbors: []
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management"
  - "ISO-37301:2021 compliance-management`"
  - SOX §404 deficiency
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - coincidence
    - law
    - rules
    - seeing
    - theorem
    - think
  backlinks:
    - coincidence
    - law
    - rules
    - seeing
    - theorem
    - think
signatures:
  computationUuid: "736666be-2c9c-8078-8f1d-7d9ee55c1fb2"
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
      stageUuid: "f56971fe-1d64-8322-933a-95ca7ab87530"
    - stage: seal
      stageUuid: "aea2f889-e3d6-8ad2-a6ad-3f925bece28b"
    - stage: uuid
      stageUuid: "573548bf-c2ba-80aa-9060-37af148c812e"
version: 2
---
# compliance-gaps

Compliance Gaps — per-tenant gap and deficiency register against compliance requirements.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37301:2021 compliance-management`

- ISO-37301:2021 compliance-management
- ISO-19011:2018 nonconformity
- SOX §404 deficiency
- ISO-27001 A.5.23 cloud-service-tenant-isolation
