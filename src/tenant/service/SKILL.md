---
name: service
description: "Use when reasoning about service — is the client for tenant administration — create, update, batch actions — and is the instance callers use."
atomPath: "tenant/service"
coordinate: "tenant/service · 1/base · 9f92925c"
contentUuid: "ed54f18a-9df7-5408-bebc-23168ff5bb0f"
diamondUuid: "e07cc8d1-9914-8d69-ac5e-dda94225f181"
uuid: "9f92925c-7519-8632-9e0a-2d5d7602c4f3"
horo: 1
typography:
  partition: tenant
  bondDegree: 183
standards:
  - "9110 http-semantics"
  - GDPR Art.28 processor
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "56e74508-11be-8f23-bbec-2f5149cbc5e6"
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
      stageUuid: "8e54770b-c2c6-8062-acbf-86b163c1f0f7"
    - stage: seal
      stageUuid: "5b7b9e1f-646e-844b-b912-e646229d5fba"
    - stage: uuid
      stageUuid: "3b2e5afe-2e02-8d0a-b5d9-3762c19836c9"
version: 2
---
# tenant/service — the management API is reached through one typed client

`TenantService` is the client for tenant administration — create, update, batch actions — and
`tenantService` is the instance callers use. Every route it touches lives behind one object, so a
change to the admin API surfaces as a type error rather than a 404 at runtime.

Composes: [[tenant]] · [[law]].
