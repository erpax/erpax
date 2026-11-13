---
name: service
description: "Use when reasoning about service — is the client for tenant administration — create, update, batch actions — and is the instance callers use."
atomPath: "tenant/service"
coordinate: "tenant/service · 5/round · 9060f838"
contentUuid: "ea9d4789-dd9b-5c6a-93d1-a46c59e6bb08"
diamondUuid: "02f12783-49c7-82f9-850d-61ba2f678801"
uuid: "9060f838-a875-8b33-9e58-f3409bfaab47"
horo: 5
typography:
  partition: tenant
  bondDegree: 27
standards:
  - "9110 http-semantics"
  - GDPR Art.28 processor
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "618ad715-a20f-8c7c-97b2-b14ab40e5b5f"
  stages:
    - stage: path
      stageUuid: "f376a9bb-5f15-8b13-ada4-32ea1770458b"
    - stage: trinity
      stageUuid: "6bf8a2e6-2cec-8f77-901b-0b51a4a01125"
    - stage: boundary
      stageUuid: "5cd853f0-0ea2-8202-aea4-1864a4f48c16"
    - stage: links
      stageUuid: "d04bc1e2-44b7-8d36-a335-48d029fa7118"
    - stage: horo
      stageUuid: "9fdab65e-e6ab-8f12-9726-1b2833c55738"
    - stage: seal
      stageUuid: "5b7b9e1f-646e-844b-b912-e646229d5fba"
    - stage: uuid
      stageUuid: "2f5b8dc9-1a3f-87c4-b648-d93638097404"
version: 2
---
# tenant/service — the management API is reached through one typed client

`TenantService` is the client for tenant administration — create, update, batch actions — and
`tenantService` is the instance callers use. Every route it touches lives behind one object, so a
change to the admin API surfaces as a type error rather than a 404 at runtime.

Composes: [[tenant]] · [[law]].
