---
name: service
description: "Use when reasoning about service — is the client for tenant administration — create, update, batch actions — and is the instance callers use."
atomPath: "tenant/service"
coordinate: "tenant/service · 2/share · 2e06b858"
contentUuid: "a5c37ca1-9c2a-5c17-8e8f-d3c4af2adde2"
diamondUuid: "f497529e-29f4-8f24-bf46-004eb14e8885"
uuid: "2e06b858-5db6-84c3-b536-d860eb1f6a40"
horo: 2
typography:
  partition: tenant
  bondDegree: 183
standards:
  - "9110 http-semantics"
  - GDPR Art.28 processor
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "7d2f45c1-c30a-88e1-9dd2-a6d21e95476b"
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
      stageUuid: "fee6d689-e21a-8297-bdc5-3997f75edd3e"
    - stage: seal
      stageUuid: "5b7b9e1f-646e-844b-b912-e646229d5fba"
    - stage: uuid
      stageUuid: "8b75e9f6-1a5d-8233-b3e4-8295d9f40d48"
version: 2
---
# tenant/service — the management API is reached through one typed client

`TenantService` is the client for tenant administration — create, update, batch actions — and
`tenantService` is the instance callers use. Every route it touches lives behind one object, so a
change to the admin API surfaces as a type error rather than a 404 at runtime.

Composes: [[tenant]] · [[law]].
