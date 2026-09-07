---
name: sdk
description: "Use when reasoning about sdk — resolves the API base URL for the runtime it finds itself in, then returns a singleton in the browser and a fresh instance on the server."
atomPath: "payload/sdk"
coordinate: "payload/sdk · 2/share · d8507ca3"
contentUuid: "84da97d7-2d46-586e-a9b3-2dc1316052f4"
diamondUuid: "42296e0f-c61a-8485-9008-c8ef4f10bf6b"
uuid: "d8507ca3-4f08-85e5-bdeb-67629aa00181"
horo: 2
typography:
  partition: payload
  bondDegree: 3
standards:
  - "3986 uri base-url-resolution"
  - "6265 http-state-management cookies-credentials-include"
  - "9110 http-semantics"
bindings: []
signatures:
  computationUuid: "d6d2709c-fcc8-8125-b279-716219769574"
  stages:
    - stage: path
      stageUuid: "6697bc99-f9bf-84ec-85f1-f6f768af2e59"
    - stage: trinity
      stageUuid: "d3904c37-8737-8b71-a8d3-1f3bc9384e94"
    - stage: boundary
      stageUuid: "eb3d8ad6-a390-8b69-98f7-98232b989c21"
    - stage: links
      stageUuid: "366a48c2-9004-8f15-8331-53acb1d469e2"
    - stage: horo
      stageUuid: "2dc0600b-f8f5-86fe-8917-cca6bd319245"
    - stage: seal
      stageUuid: "6af490de-c8ee-8d55-94a6-64a158d603f9"
    - stage: uuid
      stageUuid: "db7e6208-8a87-86c2-b240-6ed34dd7c0a4"
version: 2
---
# payload/sdk — one client per runtime, resolved rather than configured

`getPayloadSdk` resolves the API base URL for the runtime it finds itself in, then returns a
singleton in the browser and a fresh instance on the server. A shared instance on the server
would carry one request's credentials into another's.


Composes: [[law]].
