---
name: tenant
description: "Use when auto-populating the multi-tenant tenant field from the request user before validation — a beforeValidate hook that copies req.user.tenants[0].tenant onto the incoming data for tenant isolation."
atomPath: "auto/populate/tenant"
coordinate: "auto/populate/tenant · 5/round · 570f6f4c"
contentUuid: "48bf0b18-42c6-5254-8a4b-498337a3586a"
diamondUuid: "9b2baa06-6eab-8a87-badf-f81d46b423a9"
uuid: "570f6f4c-6c95-865d-ad7b-43629fd2050b"
horo: 5
typography:
  partition: auto
  bondDegree: 59
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
bindings: []
signatures:
  computationUuid: "0da8467a-ca78-8e93-807a-60c51840d5f0"
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
      stageUuid: "ebd86d76-f1f3-8777-9d3a-f91721715d07"
    - stage: seal
      stageUuid: "38ae8a87-9312-83d9-b316-aa86479d8d23"
    - stage: uuid
      stageUuid: "5b993637-ab2e-8878-8fac-5caebfc42dfe"
version: 2
---
# auto/populate/tenant — tenant isolation from the request user

A Payload `beforeValidate` [[hooks]] that pins a row to the writer's tenant. When a request [[user]] is present, it reads the first entry of the canonical `req.user.tenants[]` shape and, if that tenant reference is neither undefined nor null, writes it onto `data.tenant` — so a row cannot be created against a tenant the writer does not occupy. The legacy `autoPopulateHost` alias is fully retired in favour of the canonical [[tenant]] term.

Matter-twin: `src/auto/populate/tenant/index.ts` — `autoPopulateTenant` (a `CollectionBeforeValidateHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: a row's [[tenant]] is derived from the request [[user]], not the client — the first `req.user.tenants[]` reference is stamped onto the data before validation, the seam of cloud-tenant isolation.**

@security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
