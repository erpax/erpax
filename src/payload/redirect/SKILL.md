---
name: redirect
description: Use when reasoning about redirect — resolves a requested path against the redirects collection and sends the reader on.
atomPath: "payload/redirect"
coordinate: "payload/redirect · 8/crest · cd8df3a3"
contentUuid: "8be9cb22-22cd-5a55-ad39-089a137a4028"
diamondUuid: "48f3e780-2aba-8a97-bac3-8ce899e3f1ee"
uuid: "cd8df3a3-ed1d-8d25-bf0b-0388e5d9a008"
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
  computationUuid: "6dfba0b6-fdd7-8a7d-a767-6684233b9a76"
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
      stageUuid: "1fdd4b15-4dd2-8d60-80b8-683b2b9977cf"
    - stage: seal
      stageUuid: "3bdfd795-b586-8ac9-83c1-38168aec3075"
    - stage: uuid
      stageUuid: "3b3f1888-4734-8b22-b3ea-86925d5565d8"
version: 2
---
# payload/redirect — a moved page answers with its new address, not a 404

`PayloadRedirects` resolves a requested path against the redirects collection and sends the
reader on. A link published once should keep working after the content moves, which is the
whole reason the collection exists.

Composes: [[law]].
