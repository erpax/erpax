---
name: redirect
description: Use when reasoning about redirect — resolves a requested path against the redirects collection and sends the reader on.
atomPath: "payload/redirect"
coordinate: "payload/redirect · 5/round · d664d87c"
contentUuid: "aff79659-f8f8-5e88-b8ba-b5974e51815d"
diamondUuid: "fa1082df-1b4e-87bb-b359-01619033ee13"
uuid: "d664d87c-de30-8a13-91ec-d30813a1405a"
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
  computationUuid: "a16bf75e-3f67-8bd6-b304-fce877c9594e"
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
      stageUuid: "7030c584-681f-8524-9874-fbe03b4b3d42"
    - stage: seal
      stageUuid: "3bdfd795-b586-8ac9-83c1-38168aec3075"
    - stage: uuid
      stageUuid: "307f9e79-b682-82c6-a1f3-60309739228c"
version: 2
---
# payload/redirect — a moved page answers with its new address, not a 404

`PayloadRedirects` resolves a requested path against the redirects collection and sends the
reader on. A link published once should keep working after the content moves, which is the
whole reason the collection exists.

Composes: [[law]].
