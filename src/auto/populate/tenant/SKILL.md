---
name: tenant
description: "Use when auto-populating the multi-tenant tenant field from the request user before validation — a beforeValidate hook that copies req.user.tenants[0].tenant onto the incoming data for tenant isolation."
atomPath: auto/populate/tenant
coordinate: auto/populate/tenant · 4/weave · 9553f0eb
contentUuid: "f8389d38-b682-5785-8d76-5bd7c574d198"
diamondUuid: "642a5b0e-0641-82db-93e6-6938362ab78f"
uuid: "9553f0eb-d4b0-8a2f-aab0-9501d5e38250"
horo: 4
bonds:
  in:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
  out:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
typography:
  partition: auto
  bondDegree: 30
  neighbors: []
standards:
  - "ISO-19011:2018 audit-trail before-validate-hooks"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
bindings: []
neighbors:
  wikilink:
    - auto
    - hooks
    - law
    - tenant
    - user
  matrix:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
  backlinks:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
signatures:
  computationUuid: "9b410cd4-34a2-8e29-8eb6-7fa4dd126343"
  stages:
    - stage: path
      stageUuid: "50ef0294-610a-853e-99dc-12b2938cc581"
    - stage: trinity
      stageUuid: "74f7d872-6c45-8010-8853-3e679ff63e5b"
    - stage: boundary
      stageUuid: "6be93067-a03b-8f72-9f9c-b2032a470457"
    - stage: links
      stageUuid: "2ed099af-ac70-8709-961c-7978f11d8617"
    - stage: horo
      stageUuid: "e7b32473-cf6f-83a8-ac5a-3b8066a90e65"
    - stage: seal
      stageUuid: "38ae8a87-9312-83d9-b316-aa86479d8d23"
    - stage: uuid
      stageUuid: "9e7dfd95-002b-8122-a4a5-2c5f14a165b2"
version: 2
---
# auto/populate/tenant — tenant isolation from the request user

A Payload `beforeValidate` [[hooks]] that pins a row to the writer's tenant. When a request [[user]] is present, it reads the first entry of the canonical `req.user.tenants[]` shape and, if that tenant reference is neither undefined nor null, writes it onto `data.tenant` — so a row cannot be created against a tenant the writer does not occupy. The legacy `autoPopulateHost` alias is fully retired in favour of the canonical [[tenant]] term.

Matter-twin: `src/auto/populate/tenant/index.ts` — `autoPopulateTenant` (a `CollectionBeforeValidateHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: a row's [[tenant]] is derived from the request [[user]], not the client — the first `req.user.tenants[]` reference is stamped onto the data before validation, the seam of cloud-tenant isolation.**

@security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
