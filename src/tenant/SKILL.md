---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: "tenant · 1/base · 1916a10c"
contentUuid: "94d3de9c-cb4b-5924-8ca3-6540938b6968"
diamondUuid: "c27bccaf-257d-8c0c-9027-1b943fb996af"
uuid: "1916a10c-a3bb-89f2-a2f1-04489c9e1525"
horo: 1
typography:
  partition: tenant
  bondDegree: 59
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
  computationUuid: "9c2a32ed-9aec-8804-a2f9-c0404e9aae9f"
  stages:
    - stage: path
      stageUuid: "4c66b572-895c-8d84-8cc0-8c422684b9ec"
    - stage: trinity
      stageUuid: "405b92b6-54c9-887a-bff8-9e34eef335e4"
    - stage: boundary
      stageUuid: "adf2e38f-866f-84e7-b057-f89516c01883"
    - stage: links
      stageUuid: "788083c4-73e6-8e46-a522-f7b66f2af46e"
    - stage: horo
      stageUuid: "edceeb80-a40d-8f02-9c95-88b758efda7c"
    - stage: seal
      stageUuid: "a585d6d1-00f2-8320-b8d0-873fd546a546"
    - stage: uuid
      stageUuid: "367e3a4d-bd23-8bce-b150-1fb1852ee65e"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
