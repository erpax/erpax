---
name: gaps
description: "Use when identifying, tracking or remediating compliance deficiencies — missing controls, design deficiencies, operating gaps, documentation gaps — against a requirement; severity, status lifecycle (identified → in-remediation → closed), root cause, risk exposure, target closure date, audit trail. The per-tenant gap and deficiency register."
atomPath: "compliance/frameworks/compliance/requirements/compliance/gaps"
coordinate: "compliance/frameworks/compliance/requirements/compliance/gaps · 4/weave · f22be602"
contentUuid: "cb295dfd-2ab9-5fc0-881a-ba3ea4aabfdb"
diamondUuid: "80df27fa-cf10-83a7-81f2-d35f07cafa15"
uuid: "f22be602-6347-890f-92a7-c495808b615b"
horo: 4
typography:
  partition: compliance
  bondDegree: 22
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management"
  - "ISO-37301:2021 compliance-management`"
  - SOX §404 deficiency
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e5048721-f1ae-8e01-b5b8-49b3a8dfb6c0"
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
      stageUuid: "556c6c3c-ba31-8bf3-9aaf-e2a6fc82a9d4"
    - stage: seal
      stageUuid: "aea2f889-e3d6-8ad2-a6ad-3f925bece28b"
    - stage: uuid
      stageUuid: "59fc5dab-9305-877f-85c3-313ecff6bc72"
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
