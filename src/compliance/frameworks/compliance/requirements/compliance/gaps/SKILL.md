---
name: gaps
description: "Use when identifying, tracking or remediating compliance deficiencies — missing controls, design deficiencies, operating gaps, documentation gaps — against a requirement; severity, status lifecycle (identified → in-remediation → closed), root cause, risk exposure, target closure date, audit trail. The per-tenant gap and deficiency register."
atomPath: "compliance/frameworks/compliance/requirements/compliance/gaps"
coordinate: "compliance/frameworks/compliance/requirements/compliance/gaps · 4/weave · 94567a50"
contentUuid: "4490947b-4a47-5919-aa85-16ec011db264"
diamondUuid: "bb9e2ba2-e7bf-8295-b9ea-62e841526e9f"
uuid: "94567a50-d63d-8c4b-9b8f-9dd345982e2d"
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
  computationUuid: "6de012ee-291d-83ed-9967-bf3335fdde32"
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
      stageUuid: "d3ba3f34-74e3-8a1c-b926-fde02d436440"
    - stage: seal
      stageUuid: "aea2f889-e3d6-8ad2-a6ad-3f925bece28b"
    - stage: uuid
      stageUuid: "5f770c8d-c444-8a4a-aad5-de5ecc7786ff"
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
