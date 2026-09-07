---
name: sdk
description: "Use when reasoning about sdk — resolves the API base URL for the runtime it finds itself in, then returns a singleton in the browser and a fresh instance on the server."
atomPath: "payload/sdk"
coordinate: "payload/sdk · 7/descent · fc484f90"
contentUuid: "439d5458-8d86-5a65-8f3b-91364f7d96ef"
diamondUuid: "09ab650d-aa56-8ff4-9191-8ac09ed71458"
uuid: "fc484f90-d564-8e9b-aee3-a299f1007943"
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
  computationUuid: "bb794d0b-ea24-88b9-92c9-00e48e22ba0d"
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
      stageUuid: "aa461b2f-e3e2-82bb-b89e-4560c8d76b7e"
    - stage: seal
      stageUuid: "6af490de-c8ee-8d55-94a6-64a158d603f9"
    - stage: uuid
      stageUuid: "69145c3f-80cc-887b-bb2c-b5cbf46bc638"
version: 2
---
# payload/sdk — one client per runtime, resolved rather than configured

`getPayloadSdk` resolves the API base URL for the runtime it finds itself in, then returns a
singleton in the browser and a fresh instance on the server. A shared instance on the server
would carry one request's credentials into another's.


Composes: [[law]].
