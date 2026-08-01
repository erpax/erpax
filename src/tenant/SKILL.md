---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: "tenant · 2/share · ecd4b8b7"
contentUuid: "29abe49b-172d-57ad-a707-e2c427f60999"
diamondUuid: "7385e652-09ab-82b4-8141-157003369107"
uuid: "ecd4b8b7-e437-85ac-bff0-d0d311dbb6d2"
horo: 2
typography:
  partition: tenant
  bondDegree: 0
standards:
  - BEPS
  - "Berlin-Group-PSD2"
  - "CoE-108+"
  - "ECMA-402"
  - "IFRS-9"
  - "ISO/IEC-12207"
  - "NIST-SP-800-108"
  - PSD2
  - "SWIFT-MT"
  - "UN-CEFACT"
  - "W3C-DID-1.0"
  - "WCO-HS"
bindings: []
signatures:
  computationUuid: "8f3c8ca4-f4ce-862b-bdfe-417856896394"
  stages:
    - stage: path
      stageUuid: "4c66b572-895c-8d84-8cc0-8c422684b9ec"
    - stage: trinity
      stageUuid: "405b92b6-54c9-887a-bff8-9e34eef335e4"
    - stage: boundary
      stageUuid: "7d9e8be1-d41b-839b-86f5-b00bae058529"
    - stage: links
      stageUuid: "788083c4-73e6-8e46-a522-f7b66f2af46e"
    - stage: horo
      stageUuid: "63d27d67-cbd0-80ef-8025-5d94efd70f76"
    - stage: seal
      stageUuid: "235a379b-38c5-8ad2-acf9-319e95140680"
    - stage: uuid
      stageUuid: "a14294a9-03c2-89a1-966d-8d101d9183b4"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
