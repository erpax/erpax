---
name: requests
description: "Use when an occupant, operator, or sensor raises an FM service ticket — corrective, preventive, predictive, compliance, safety, or move request — against a property, space, or fixed asset; SLA priority, triage, promotion to a work order. The IWMS/CMMS service-request intake register per ISO 41001 §8.1."
atomPath: maintenance/requests
coordinate: maintenance/requests · 2/share · 5f873bb7
contentUuid: "283c6cbf-0205-5a36-8a79-2675fe498e4d"
diamondUuid: "7845b59d-3ba3-83ac-aa27-65c9ae4b04ba"
uuid: "5f873bb7-75b7-877d-9074-caed070011fa"
horo: 2
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
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ILO-C100"
  - "ISO-19011:2018 audit-trail maintenance-request-evidence"
  - "ISO-41001"
  - "ISO-41001:2018 §8.1 facility-management operational-control"
  - "ISO-41011:2017 facility-management vocabulary"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management corrective-maintenance"
  - "ISO-8601-1:2019 date-time reported-at sla"
  - "SOX §404 internal-controls fm-service-delivery"
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
  computationUuid: "c08b303d-0990-838a-b438-7f0f699fb177"
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
      stageUuid: "643a24c1-0b12-82fc-8b30-293ec9790540"
    - stage: seal
      stageUuid: "fb7d93a3-cfc7-8590-93d5-ad300983803c"
    - stage: uuid
      stageUuid: "e305d136-476d-88b3-8fbb-cd2561de1c2a"
version: 2
---
# maintenance-requests

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-41001:2018 §8.1 facility-management operational-control
- ISO-41011:2017 facility-management vocabulary
- ISO-55000:2014 asset-management corrective-maintenance
- ISO-8601-1:2019 date-time reported-at sla
- ISO-19011:2018 audit-trail maintenance-request-evidence
- SOX §404 internal-controls fm-service-delivery
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[maintenance/work/orders]] · [[Properties]] · [[Spaces]] · [[fixed/assets]] · [[bookable/resources]] · [[Users]].

**Law — [[law]]: a maintenance request is the FM service-ticket intake raised against a property/space/asset — triaged by SLA priority and promoted to a [[maintenance/work/orders]] work order for execution.**
