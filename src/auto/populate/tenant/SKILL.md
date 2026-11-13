---
name: tenant
description: "Use when auto-populating the multi-tenant tenant field from the request user before validation — a beforeValidate hook that copies req.user.tenants[0].tenant onto the incoming data for tenant isolation."
atomPath: "auto/populate/tenant"
coordinate: "auto/populate/tenant · 7/descent · 66acbd8e"
contentUuid: "306f54d4-dd39-5940-b247-85fde120751e"
diamondUuid: "c7117c1b-920a-8b5d-b45a-8b843f9ad963"
uuid: "66acbd8e-02f3-8e33-87e1-ca88ef08aac0"
horo: 7
typography:
  partition: auto
  bondDegree: 58
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
bindings: []
signatures:
  computationUuid: "6c85ca10-11fd-8622-ae78-3ebba4ac97d5"
  stages:
    - stage: path
      stageUuid: "50ef0294-610a-853e-99dc-12b2938cc581"
    - stage: trinity
      stageUuid: "74f7d872-6c45-8010-8853-3e679ff63e5b"
    - stage: boundary
      stageUuid: "6be93067-a03b-8f72-9f9c-b2032a470457"
    - stage: links
      stageUuid: "0a2ba99c-7273-8a0e-a5c2-59f4fc6aacae"
    - stage: horo
      stageUuid: "ba88b9e1-d1c7-815e-bb4a-048aaa4bbdc0"
    - stage: seal
      stageUuid: "38ae8a87-9312-83d9-b316-aa86479d8d23"
    - stage: uuid
      stageUuid: "207ef29d-5784-859e-8b75-c1829410288b"
version: 2
---
# auto/populate/tenant — tenant isolation from the request user

A Payload `beforeValidate` [[hooks]] that pins a row to the writer's tenant. When a request user is present, it reads the first entry of the canonical `req.user.tenants[]` shape and, if that tenant reference is neither undefined nor null, writes it onto `data.tenant` — so a row cannot be created against a tenant the writer does not occupy. The legacy `autoPopulateHost` alias is fully retired in favour of the canonical [[tenant]] term.

Matter-twin: `src/auto/populate/tenant/index.ts` — `autoPopulateTenant` (a `CollectionBeforeValidateHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: a row's [[tenant]] is derived from the request user, not the client — the first `req.user.tenants[]` reference is stamped onto the data before validation, the seam of cloud-tenant isolation.**

@security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
