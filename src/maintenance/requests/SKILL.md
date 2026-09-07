---
name: requests
description: "Use when an occupant, operator, or sensor raises an FM service ticket — corrective, preventive, predictive, compliance, safety, or move request — against a property, space, or fixed asset; SLA priority, triage, promotion to a work order. The IWMS/CMMS service-request intake register per ISO 41001 §8.1."
atomPath: "maintenance/requests"
coordinate: "maintenance/requests · 1/base · b7ec4f49"
contentUuid: "17df1722-b8b1-5e80-88cb-0605fcc683e9"
diamondUuid: "dd059b46-9831-8201-ab33-2b4930aa3f18"
uuid: "b7ec4f49-61f9-8d67-bbe1-08e9c431d7de"
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
  computationUuid: "21906fc6-fe5b-8f2e-a966-e3fe0d7e2135"
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
      stageUuid: "0352491c-5f61-8c9c-abc1-3b2843e109ca"
    - stage: seal
      stageUuid: "fb7d93a3-cfc7-8590-93d5-ad300983803c"
    - stage: uuid
      stageUuid: "0bb94206-6e3c-83c0-9897-dfa41bb9a1e4"
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
