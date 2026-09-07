---
name: sdk
description: "Use when reasoning about sdk — resolves the API base URL for the runtime it finds itself in, then returns a singleton in the browser and a fresh instance on the server."
atomPath: "payload/sdk"
coordinate: "payload/sdk · 1/base · 83d3b247"
contentUuid: "a789a92f-cca8-5e4a-ac4e-d1a26683328c"
diamondUuid: "384fc52f-6e20-8796-b7f5-213c7a9d93ee"
uuid: "83d3b247-918d-8e20-8ba6-0db2905f4529"
horo: 1
typography:
  partition: payload
  bondDegree: 3
standards:
  - "3986 uri base-url-resolution"
  - "6265 http-state-management cookies-credentials-include"
  - "9110 http-semantics"
bindings: []
signatures:
  computationUuid: "b5dd6258-6c2c-82a7-aaf5-3dd6a3f040d3"
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
      stageUuid: "e93a15d3-22ef-8b9a-80fe-6e33747d8fbe"
    - stage: seal
      stageUuid: "6af490de-c8ee-8d55-94a6-64a158d603f9"
    - stage: uuid
      stageUuid: "676f770b-b8b9-86ca-9fe1-cc0a695fdca5"
version: 2
---
# payload/sdk — one client per runtime, resolved rather than configured

`getPayloadSdk` resolves the API base URL for the runtime it finds itself in, then returns a
singleton in the browser and a fresh instance on the server. A shared instance on the server
would carry one request's credentials into another's.


Composes: [[law]].
