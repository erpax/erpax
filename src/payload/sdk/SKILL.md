---
name: sdk
description: "Use when reasoning about sdk — resolves the API base URL for the runtime it finds itself in, then returns a singleton in the browser and a fresh instance on the server."
atomPath: "payload/sdk"
coordinate: "payload/sdk · 7/descent · a77915ac"
contentUuid: "74266278-816a-5447-b947-ea3b1b5294f0"
diamondUuid: "a08ece8a-d2f9-829d-9f17-1a8c6cb9e277"
uuid: "a77915ac-86d9-8097-9012-624d4fb6533c"
horo: 7
typography:
  partition: payload
  bondDegree: 3
standards:
  - "3986 uri base-url-resolution"
  - "6265 http-state-management cookies-credentials-include"
  - "9110 http-semantics"
bindings: []
signatures:
  computationUuid: "fbe81db6-99c0-8664-ac2f-3ecf6cdb3229"
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
      stageUuid: "409d6275-c64b-87dd-9e8f-4852edc7c798"
    - stage: seal
      stageUuid: "6af490de-c8ee-8d55-94a6-64a158d603f9"
    - stage: uuid
      stageUuid: "be1cda35-4f49-89fd-a11f-3e42644093cb"
version: 2
---
# payload/sdk — one client per runtime, resolved rather than configured

`getPayloadSdk` resolves the API base URL for the runtime it finds itself in, then returns a
singleton in the browser and a fresh instance on the server. A shared instance on the server
would carry one request's credentials into another's.


Composes: [[law]].
