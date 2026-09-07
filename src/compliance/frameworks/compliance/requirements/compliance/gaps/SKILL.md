---
name: gaps
description: "Use when identifying, tracking or remediating compliance deficiencies — missing controls, design deficiencies, operating gaps, documentation gaps — against a requirement; severity, status lifecycle (identified → in-remediation → closed), root cause, risk exposure, target closure date, audit trail. The per-tenant gap and deficiency register."
atomPath: "compliance/frameworks/compliance/requirements/compliance/gaps"
coordinate: "compliance/frameworks/compliance/requirements/compliance/gaps · 4/weave · 526aeed2"
contentUuid: "4d0a462e-6711-5d60-9292-b9a23573efc0"
diamondUuid: "d241f7ac-93c8-8b11-88f4-3cca8fc7c286"
uuid: "526aeed2-9597-8252-8091-b7f94ad2ff3a"
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
  computationUuid: "edb311c6-1931-887e-a7c4-2930fc565d32"
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
      stageUuid: "3804cdaf-6d32-8b45-9554-6955f297e61d"
    - stage: seal
      stageUuid: "aea2f889-e3d6-8ad2-a6ad-3f925bece28b"
    - stage: uuid
      stageUuid: "d080f258-1811-8f2f-8d2d-e1df639576c8"
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
