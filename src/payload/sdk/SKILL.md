---
name: sdk
description: "Use when reasoning about sdk — resolves the API base URL for the runtime it finds itself in, then returns a singleton in the browser and a fresh instance on the server."
atomPath: "payload/sdk"
coordinate: "payload/sdk · 2/share · 2712872b"
contentUuid: "e845a99e-ea8c-5ddc-83f2-c0db523641e6"
diamondUuid: "57cb08ee-f530-84b1-a6a7-3f49df86cc95"
uuid: "2712872b-a493-87b4-9690-91a920ec1d77"
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
  computationUuid: "50e77444-c876-8323-bcc0-44968baea26a"
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
      stageUuid: "3422e85e-583b-84e2-9019-a955f78bf59f"
    - stage: seal
      stageUuid: "6af490de-c8ee-8d55-94a6-64a158d603f9"
    - stage: uuid
      stageUuid: "904a27ef-c3b2-8e78-8c63-90b98648d010"
version: 2
---
# payload/sdk — one client per runtime, resolved rather than configured

`getPayloadSdk` resolves the API base URL for the runtime it finds itself in, then returns a
singleton in the browser and a fresh instance on the server. A shared instance on the server
would carry one request's credentials into another's.


Composes: [[law]].
