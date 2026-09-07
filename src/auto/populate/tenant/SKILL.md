---
name: tenant
description: "Use when auto-populating the multi-tenant tenant field from the request user before validation — a beforeValidate hook that copies req.user.tenants[0].tenant onto the incoming data for tenant isolation."
atomPath: "auto/populate/tenant"
coordinate: "auto/populate/tenant · 2/share · 1a62785f"
contentUuid: "996fc282-514d-53b7-a1b7-115b5e3c5a18"
diamondUuid: "3f832e46-943f-8fd6-8e25-13d73efc93c9"
uuid: "1a62785f-d582-897e-be10-3610020c0806"
horo: 2
typography:
  partition: auto
  bondDegree: 59
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
bindings: []
signatures:
  computationUuid: "0bda56ae-3463-8100-a039-852b61f3fd33"
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
      stageUuid: "7e2671fb-0130-8e21-94cd-935513b11ed7"
    - stage: seal
      stageUuid: "38ae8a87-9312-83d9-b316-aa86479d8d23"
    - stage: uuid
      stageUuid: "d7f54b99-827e-8d92-82da-68bab70caf2a"
version: 2
---
# auto/populate/tenant — tenant isolation from the request user

A Payload `beforeValidate` [[hooks]] that pins a row to the writer's tenant. When a request [[user]] is present, it reads the first entry of the canonical `req.user.tenants[]` shape and, if that tenant reference is neither undefined nor null, writes it onto `data.tenant` — so a row cannot be created against a tenant the writer does not occupy. The legacy `autoPopulateHost` alias is fully retired in favour of the canonical [[tenant]] term.

Matter-twin: `src/auto/populate/tenant/index.ts` — `autoPopulateTenant` (a `CollectionBeforeValidateHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: a row's [[tenant]] is derived from the request [[user]], not the client — the first `req.user.tenants[]` reference is stamped onto the data before validation, the seam of cloud-tenant isolation.**

@security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
