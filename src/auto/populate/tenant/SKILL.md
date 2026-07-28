---
name: tenant
description: "Use when auto-populating the multi-tenant tenant field from the request user before validation — a beforeValidate hook that copies req.user.tenants[0].tenant onto the incoming data for tenant isolation."
atomPath: "auto/populate/tenant"
coordinate: "auto/populate/tenant · 2/share · 65597364"
contentUuid: "626e7ed9-b882-569f-ac1d-f2a7bdc0ef97"
diamondUuid: "8357ad2d-7375-8d63-8d83-e74cc2a00a95"
uuid: "65597364-6af4-86a1-a5b4-cb29b301f573"
horo: 2
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
  computationUuid: "dfa64bc6-f2b8-8257-8698-162ce430b1fa"
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
      stageUuid: "f6f26c66-e187-85ff-8bc0-74a631416d67"
    - stage: seal
      stageUuid: "38ae8a87-9312-83d9-b316-aa86479d8d23"
    - stage: uuid
      stageUuid: "d94282fc-7168-8e53-b43e-749bd51e5179"
version: 2
---
# auto/populate/tenant — tenant isolation from the request user

A Payload `beforeValidate` [[hooks]] that pins a row to the writer's tenant. When a request [[user]] is present, it reads the first entry of the canonical `req.user.tenants[]` shape and, if that tenant reference is neither undefined nor null, writes it onto `data.tenant` — so a row cannot be created against a tenant the writer does not occupy. The legacy `autoPopulateHost` alias is fully retired in favour of the canonical [[tenant]] term.

Matter-twin: `src/auto/populate/tenant/index.ts` — `autoPopulateTenant` (a `CollectionBeforeValidateHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: a row's [[tenant]] is derived from the request [[user]], not the client — the first `req.user.tenants[]` reference is stamped onto the data before validation, the seam of cloud-tenant isolation.**

@security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
