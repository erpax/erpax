---
name: service
description: "Use when reasoning about service — is the client for tenant administration — create, update, batch actions — and is the instance callers use."
atomPath: "tenant/service"
coordinate: "tenant/service · 5/round · 164bc016"
contentUuid: "474fa82b-b25d-567b-a7c4-ceae543c951b"
diamondUuid: "b1ca2b89-fa82-8bf4-9aaf-a8fe06f70bcf"
uuid: "164bc016-c7ab-87db-b45a-f2ba7917897f"
horo: 5
typography:
  partition: tenant
  bondDegree: 183
standards:
  - "9110 http-semantics"
  - GDPR Art.28 processor
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "49537fd3-eeb1-8bf8-828d-76fbd529cac5"
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
      stageUuid: "90592323-baa3-8d1c-bfe7-69cfe79b80d4"
    - stage: seal
      stageUuid: "5b7b9e1f-646e-844b-b912-e646229d5fba"
    - stage: uuid
      stageUuid: "e51978a7-1522-8ef4-ac27-fcb58d9cef8e"
version: 2
---
# tenant/service — the management API is reached through one typed client

`TenantService` is the client for tenant administration — create, update, batch actions — and
`tenantService` is the instance callers use. Every route it touches lives behind one object, so a
change to the admin API surfaces as a type error rather than a 404 at runtime.

Composes: [[tenant]] · [[law]].
