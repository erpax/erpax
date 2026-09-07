---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: "tenant · 7/descent · bee7b065"
contentUuid: "685e0af7-dde3-5991-b556-d8ba15a3c3a0"
diamondUuid: "ee0341c4-97c7-8640-8a38-afcd50ce27c3"
uuid: "bee7b065-077c-82d4-897e-447c337d66b6"
horo: 7
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
  computationUuid: "a3cef84f-0d12-8dda-9290-ce56dd80c6c3"
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
      stageUuid: "81dcdb94-8024-8d6d-9520-7e5f2c3da58f"
    - stage: seal
      stageUuid: "a585d6d1-00f2-8320-b8d0-873fd546a546"
    - stage: uuid
      stageUuid: "519034af-3206-888c-a98e-e017bc899068"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
