---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: "tenant · 4/weave · acf096ba"
contentUuid: "5fc97af6-c3db-56fd-89aa-c573a93c0b76"
diamondUuid: "cd368ea4-831e-8491-9aaf-77c09a4bb2fb"
uuid: "acf096ba-1896-8ed7-8d88-bb549438a30a"
horo: 4
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
  computationUuid: "e1eb3a1a-b789-8777-adb3-c925aabb4752"
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
      stageUuid: "40228da8-148f-89d3-8112-8a977d5174a3"
    - stage: seal
      stageUuid: "a585d6d1-00f2-8320-b8d0-873fd546a546"
    - stage: uuid
      stageUuid: "604673d5-70a7-853d-83de-0a2f19062054"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
