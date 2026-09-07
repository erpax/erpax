---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: "tenant · 2/share · 21482bed"
contentUuid: "64cbe735-aa44-554f-a2cb-01640b97a70d"
diamondUuid: "abbc5546-6c2f-813f-9c83-7a91e5c3a785"
uuid: "21482bed-b02d-8940-90d9-3271de425b19"
horo: 2
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
  computationUuid: "ce6a3ff3-823f-8c93-aac7-705c52c14d9c"
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
      stageUuid: "f79545da-0809-8747-abad-ccc02a455602"
    - stage: seal
      stageUuid: "a585d6d1-00f2-8320-b8d0-873fd546a546"
    - stage: uuid
      stageUuid: "eee037d0-e841-816e-bd13-b76329bb8cff"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
