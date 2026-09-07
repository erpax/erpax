---
name: service
description: "Use when reasoning about service — is the client for tenant administration — create, update, batch actions — and is the instance callers use."
atomPath: "tenant/service"
coordinate: "tenant/service · 4/weave · 11d1e079"
contentUuid: "bb9f5ba2-2f70-5bfd-ab99-acfacaacfe4e"
diamondUuid: "0148c7a2-5607-8f2c-b7b3-9adade359dc4"
uuid: "11d1e079-6a51-84d3-8e49-2a23d285fb4f"
horo: 4
typography:
  partition: tenant
  bondDegree: 183
standards:
  - "9110 http-semantics"
  - GDPR Art.28 processor
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "dbe92f1e-51c3-8d6f-8213-0ebc0a4ef77b"
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
      stageUuid: "bf26f7a8-db2a-8c39-a6ff-b6cf8ba93750"
    - stage: seal
      stageUuid: "5b7b9e1f-646e-844b-b912-e646229d5fba"
    - stage: uuid
      stageUuid: "fd15111c-81e6-8968-8649-38937fe12637"
version: 2
---
# tenant/service — the management API is reached through one typed client

`TenantService` is the client for tenant administration — create, update, batch actions — and
`tenantService` is the instance callers use. Every route it touches lives behind one object, so a
change to the admin API surfaces as a type error rather than a 404 at runtime.

Composes: [[tenant]] · [[law]].
