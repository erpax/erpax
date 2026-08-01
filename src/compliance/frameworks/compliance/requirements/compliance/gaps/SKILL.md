---
name: gaps
description: "Use when identifying, tracking or remediating compliance deficiencies — missing controls, design deficiencies, operating gaps, documentation gaps — against a requirement; severity, status lifecycle (identified → in-remediation → closed), root cause, risk exposure, target closure date, audit trail. The per-tenant gap and deficiency register."
atomPath: "compliance/frameworks/compliance/requirements/compliance/gaps"
coordinate: "compliance/frameworks/compliance/requirements/compliance/gaps · 5/round · 1f1a7142"
contentUuid: "ab8f41ef-76d6-573e-88b5-a0d905491943"
diamondUuid: "6c9a1643-70c2-8bd6-a470-e9e6523e0646"
uuid: "1f1a7142-4390-8521-8254-f8dc1aca65d9"
horo: 5
typography:
  partition: compliance
  bondDegree: 19
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management"
  - "ISO-37301:2021 compliance-management`"
  - SOX §404 deficiency
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "552b9c06-9344-8e23-a438-b5191972fc87"
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
      stageUuid: "cbc114a9-30a8-8eb6-a9ff-9604bfc1df09"
    - stage: seal
      stageUuid: "aea2f889-e3d6-8ad2-a6ad-3f925bece28b"
    - stage: uuid
      stageUuid: "24106e73-5d4f-8a75-8e73-f71e947854a9"
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
