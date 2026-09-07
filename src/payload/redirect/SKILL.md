---
name: redirect
description: Use when reasoning about redirect — resolves a requested path against the redirects collection and sends the reader on.
atomPath: "payload/redirect"
coordinate: "payload/redirect · 8/crest · 9f226168"
contentUuid: "ed9e0fbd-350a-5ed3-bd37-9267d7fe030c"
diamondUuid: "5c83a8fa-ea5a-8323-bb07-39092882d558"
uuid: "9f226168-c337-8f06-ad0a-dc314f30e324"
horo: 8
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
  computationUuid: "eb333ab7-a2cb-8e64-9868-56d7330f5e49"
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
      stageUuid: "b1bcc7fd-5532-8f54-917b-fa32ab80b4e2"
    - stage: seal
      stageUuid: "3bdfd795-b586-8ac9-83c1-38168aec3075"
    - stage: uuid
      stageUuid: "dd89fece-9bc8-85cf-a233-fd8d21ddbde1"
version: 2
---
# payload/redirect — a moved page answers with its new address, not a 404

`PayloadRedirects` resolves a requested path against the redirects collection and sends the
reader on. A link published once should keep working after the content moves, which is the
whole reason the collection exists.

Composes: [[law]].
