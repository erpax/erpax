---
name: requests
description: "Use when an occupant, operator, or sensor raises an FM service ticket — corrective, preventive, predictive, compliance, safety, or move request — against a property, space, or fixed asset; SLA priority, triage, promotion to a work order. The IWMS/CMMS service-request intake register per ISO 41001 §8.1."
atomPath: "maintenance/requests"
coordinate: "maintenance/requests · 1/base · e673010b"
contentUuid: "60b18914-28ee-5905-bbfc-8c64ee589900"
diamondUuid: "88278c79-f247-8497-89cb-c3cee2310e05"
uuid: "e673010b-5bf7-8c4b-95f1-2bc1921a6a0a"
horo: 1
typography:
  partition: maintenance
  bondDegree: 37
standards:
  - "ISO-41001"
  - "ISO-41001:2018 §8.1 facility-management operational-control"
  - "ISO-41001:2018 §8.1 facility-management operational-control`"
  - "ISO-41011:2017 facility-management vocabulary"
  - "ISO-41011:2017 facility-management vocabulary`"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management corrective-maintenance"
  - "ISO-55000:2014 asset-management corrective-maintenance`"
  - "ISO-8601-1:2019 date-time reported-at sla"
  - "ISO-8601-1:2019 date-time reported-at sla`"
  - "SOX §404 internal-controls fm-service-delivery"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "700637ce-2391-817b-b709-573eae9339ab"
  stages:
    - stage: path
      stageUuid: "3e2a2352-6111-8acd-bc92-da0ce002cc25"
    - stage: trinity
      stageUuid: "5454504c-43da-8b5f-aace-fb17f5afcde8"
    - stage: boundary
      stageUuid: "34ff701f-7967-8d2c-b43c-c41ffa031880"
    - stage: links
      stageUuid: "36f13c9d-1e61-814b-b286-3eb804f6464d"
    - stage: horo
      stageUuid: "8c8affb2-b0fd-8419-8672-87ecf0b32575"
    - stage: seal
      stageUuid: "fb7d93a3-cfc7-8590-93d5-ad300983803c"
    - stage: uuid
      stageUuid: "361566cf-99c8-8f4f-bdc9-0f62842b22b5"
version: 2
---
# maintenance-requests

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-41001:2018 §8.1 facility-management operational-control`
- `@standard ISO-41011:2017 facility-management vocabulary`
- `@standard ISO-55000:2014 asset-management corrective-maintenance`
- `@standard ISO-8601-1:2019 date-time reported-at sla`

- ISO-41001:2018 §8.1 facility-management operational-control
- ISO-41011:2017 facility-management vocabulary
- ISO-55000:2014 asset-management corrective-maintenance
- ISO-8601-1:2019 date-time reported-at sla
- ISO-19011:2018 audit-trail maintenance-request-evidence
- SOX §404 internal-controls fm-service-delivery
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[maintenance/work/orders]] · [[Properties]] · [[Spaces]] · [[fixed/assets]] · [[bookable/resources]] · [[Users]].

**Law — [[law]]: a maintenance request is the FM service-ticket intake raised against a property/space/asset — triaged by SLA priority and promoted to a [[maintenance/work/orders]] work order for execution.**
