---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
atomPath: tenant
coordinate: tenant · 7/descent · df2a1e12
contentUuid: "d422e198-6699-5f40-938a-80c7c91ba677"
diamondUuid: "48749c71-545d-8e90-9cfd-84c263be7c8e"
uuid: "df2a1e12-6998-8ec9-9e96-cbc3cbcf9f0c"
horo: 7
bonds:
  in:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
  out:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
typography:
  partition: tenant
  bondDegree: 0
  neighbors: []
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
  - "re-exports only; the truth lives in ./remote/secret"
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - organization
    - tenants
  matrix:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
  backlinks:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
signatures:
  computationUuid: "7227604c-4a8f-8dc2-97df-ce7e91352b8f"
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
      stageUuid: "82d0787c-7ef3-8001-92ca-9c119688b392"
    - stage: seal
      stageUuid: "235a379b-38c5-8ad2-acf9-319e95140680"
    - stage: uuid
      stageUuid: "a14e544c-73bc-883c-b453-ff5fa4a26f56"
version: 2
---
# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
