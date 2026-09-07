---
name: dom
description: "Use when code must branch on whether a real browser DOM is available — a default boolean that is true only when window, window.document and document.createElement all exist, guarding browser-only work on the server or in non-DOM runtimes."
atomPath: "can/use/dom"
coordinate: "can/use/dom · 1/base · 08acfc4d"
contentUuid: "f726b4cc-c25a-5818-ab57-5d9fe9c2575d"
diamondUuid: "0d552a6a-5e9f-8660-9416-d501da1f595f"
uuid: "08acfc4d-b5e5-8a52-94c0-62b00a29cb45"
horo: 1
typography:
  partition: can
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "60443bc1-2353-83cc-b014-d260f46ccf6e"
  stages:
    - stage: path
      stageUuid: "d11783ef-9d3c-8511-b6c8-17852c6fe8ed"
    - stage: trinity
      stageUuid: "7889388c-af9c-8eda-99b9-faeb3590b933"
    - stage: boundary
      stageUuid: "e8bf5c52-a4ed-810c-860f-7864dabe6660"
    - stage: links
      stageUuid: "a7fb584c-519f-8a61-9090-170bc604ba67"
    - stage: horo
      stageUuid: "cf42e17e-4d68-8191-81a4-1ca08ecd9716"
    - stage: seal
      stageUuid: "d825b003-5a69-8c00-bf54-bec9e89fe535"
    - stage: uuid
      stageUuid: "c1bd178e-df95-87cb-85dc-937797703e9b"
version: 2
---
# can/use/dom — is a real DOM present

A default-exported boolean: `true` only when `window`, `window.document` and `window.document.createElement` are all present. It is the single guard for code that may run both in the browser and on the server (or in a non-DOM runtime like a Worker or a Node test), so DOM-only work never runs where there is no DOM.

Matter-twin: `src/can/use/dom/index.ts` (default `boolean`).

**Law — [[law]]: branch on DOM availability through this one guard — never poke `window` or `document` directly — so browser-only work is inert on the server.**
