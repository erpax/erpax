---
name: redirect
description: Use when reasoning about redirect — resolves a requested path against the redirects collection and sends the reader on.
atomPath: "payload/redirect"
coordinate: "payload/redirect · 5/round · f747571b"
contentUuid: "aada989d-88fc-5e1e-aa2d-89a80ae6236f"
diamondUuid: "7e3f02f4-ab35-81d7-816b-fff687aacdae"
uuid: "f747571b-2ed8-874b-9776-c95a887cf57c"
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
  computationUuid: "16d9ad4a-142f-8804-b013-c54c560ad6c1"
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
      stageUuid: "740a9909-29b6-8741-9e4e-7785ab87e565"
    - stage: seal
      stageUuid: "3bdfd795-b586-8ac9-83c1-38168aec3075"
    - stage: uuid
      stageUuid: "196c5fac-8a18-89b5-aedd-c951445bad31"
version: 2
---
# payload/redirect — a moved page answers with its new address, not a 404

`PayloadRedirects` resolves a requested path against the redirects collection and sends the
reader on. A link published once should keep working after the content moves, which is the
whole reason the collection exists.

Composes: [[law]].
