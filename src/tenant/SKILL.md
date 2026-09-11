---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: "tenant · 5/round · d7b37787"
contentUuid: "21198bd1-b919-5967-8962-8f3bbebdbcd6"
diamondUuid: "49049980-124b-8b81-9abe-ebbf23f160bf"
uuid: "d7b37787-457d-84d9-b053-315eeba4812c"
horo: 5
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
  computationUuid: "0cd80408-4f57-8199-a349-311e197ce2f0"
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
      stageUuid: "1072dee2-95ef-846f-a972-d7ec3d5d80c8"
    - stage: seal
      stageUuid: "a585d6d1-00f2-8320-b8d0-873fd546a546"
    - stage: uuid
      stageUuid: "ba9ee4fb-83be-806c-9a02-6b698b4deae4"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
