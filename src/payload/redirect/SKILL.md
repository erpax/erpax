---
name: redirect
description: Use when reasoning about redirect — resolves a requested path against the redirects collection and sends the reader on.
atomPath: "payload/redirect"
coordinate: "payload/redirect · 5/round · 60b736a7"
contentUuid: "aecf5980-1c21-5a7e-a923-149ad7848e69"
diamondUuid: "4a2f11c3-0977-8719-b96e-fa4d0ae2dea3"
uuid: "60b736a7-fdaa-853a-846b-763d3894f53a"
horo: 5
typography:
  partition: payload
  bondDegree: 7
standards:
  - "3986 uniform-resource-identifier"
  - "9110 §15.4 redirection-3xx"
  - "9110 §15.4.2 301-moved-permanently"
  - "9110 §15.4.3 302-found"
  - "9110 §15.5.5 404-not-found"
bindings: []
signatures:
  computationUuid: "c536a6de-e6b4-88a7-a16b-5e3a67775e3a"
  stages:
    - stage: path
      stageUuid: "6eefb95a-e87e-8df2-8d48-0b522f00508b"
    - stage: trinity
      stageUuid: "9587dc41-b2e6-84ea-9a52-c57cd7de17e5"
    - stage: boundary
      stageUuid: "7ec9d279-3f4d-8009-a321-74e8e0b501a4"
    - stage: links
      stageUuid: "ee89372e-1507-8020-9ad8-2a86489af5ec"
    - stage: horo
      stageUuid: "bb591ddd-a49e-84c2-89bb-cfc7790e2cd8"
    - stage: seal
      stageUuid: "3bdfd795-b586-8ac9-83c1-38168aec3075"
    - stage: uuid
      stageUuid: "fafae195-a100-8c77-ac7e-6120ea62569d"
version: 2
---
# payload/redirect — a moved page answers with its new address, not a 404

`PayloadRedirects` resolves a requested path against the redirects collection and sends the
reader on. A link published once should keep working after the content moves, which is the
whole reason the collection exists.

Composes: [[law]].
