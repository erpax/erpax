---
name: requests
description: "Use when an occupant, operator, or sensor raises an FM service ticket — corrective, preventive, predictive, compliance, safety, or move request — against a property, space, or fixed asset; SLA priority, triage, promotion to a work order. The IWMS/CMMS service-request intake register per ISO 41001 §8.1."
atomPath: "maintenance/requests"
coordinate: "maintenance/requests · 4/weave · 676af693"
contentUuid: "d9583cec-4c7a-5be6-9c36-cbb3ad26a00e"
diamondUuid: "1e1ba544-baaf-8b51-bc4a-ceb5f85f7ba7"
uuid: "676af693-8ff8-89fc-86f7-b7691cbb54b8"
horo: 4
bonds:
  in:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
  out:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
typography:
  partition: maintenance
  bondDegree: 37
  neighbors: []
standards:
  - "ILO-C100"
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
neighbors:
  wikilink:
    - assets
    - law
    - orders
    - properties
    - resources
    - spaces
    - users
  matrix:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
  backlinks:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
signatures:
  computationUuid: "4b31ee1f-980b-8f84-887e-fc688e36359e"
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
      stageUuid: "7992b984-22ec-8e8b-acc9-2381e6935e92"
    - stage: seal
      stageUuid: "fb7d93a3-cfc7-8590-93d5-ad300983803c"
    - stage: uuid
      stageUuid: "0252060d-fdd4-81fd-8c7f-efd73ecd0c49"
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
