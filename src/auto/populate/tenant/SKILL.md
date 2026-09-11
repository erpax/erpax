---
name: tenant
description: "Use when auto-populating the multi-tenant tenant field from the request user before validation — a beforeValidate hook that copies req.user.tenants[0].tenant onto the incoming data for tenant isolation."
atomPath: "auto/populate/tenant"
coordinate: "auto/populate/tenant · 7/descent · 8a6c3caa"
contentUuid: "24893400-7258-5cf1-a5ed-20cbbb0a5b26"
diamondUuid: "1012dc55-cea2-873c-8e61-acdce361b042"
uuid: "8a6c3caa-0f4d-8294-8ce2-a39542322b19"
horo: 7
typography:
  partition: auto
  bondDegree: 59
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
bindings: []
signatures:
  computationUuid: "af1a980d-e7fc-8086-b0cf-bc7d54a30df8"
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
      stageUuid: "9e7d5b7f-0436-8c4d-9acd-1a72b6383d3e"
    - stage: seal
      stageUuid: "38ae8a87-9312-83d9-b316-aa86479d8d23"
    - stage: uuid
      stageUuid: "3596a635-f0b4-8e4d-bcf7-83856252efa6"
version: 2
---
# auto/populate/tenant — tenant isolation from the request user

A Payload `beforeValidate` [[hooks]] that pins a row to the writer's tenant. When a request [[user]] is present, it reads the first entry of the canonical `req.user.tenants[]` shape and, if that tenant reference is neither undefined nor null, writes it onto `data.tenant` — so a row cannot be created against a tenant the writer does not occupy. The legacy `autoPopulateHost` alias is fully retired in favour of the canonical [[tenant]] term.

Matter-twin: `src/auto/populate/tenant/index.ts` — `autoPopulateTenant` (a `CollectionBeforeValidateHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: a row's [[tenant]] is derived from the request [[user]], not the client — the first `req.user.tenants[]` reference is stamped onto the data before validation, the seam of cloud-tenant isolation.**

@security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
