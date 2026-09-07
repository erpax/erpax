---
name: dom
description: "Use when code must branch on whether a real browser DOM is available — a default boolean that is true only when window, window.document and document.createElement all exist, guarding browser-only work on the server or in non-DOM runtimes."
atomPath: "can/use/dom"
coordinate: "can/use/dom · 1/base · d4533b66"
contentUuid: "b7d54e25-cbb1-54e4-b193-13538735a696"
diamondUuid: "8da2b48d-33af-878a-bc1d-0a6ee5265d52"
uuid: "d4533b66-bcbb-8bfc-9980-90a74786c2df"
horo: 1
typography:
  partition: can
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "5bbb74af-236c-83d9-8b60-1f62cf095682"
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
      stageUuid: "e3af2086-7c3a-8b0d-a358-bb169269669e"
    - stage: seal
      stageUuid: "d825b003-5a69-8c00-bf54-bec9e89fe535"
    - stage: uuid
      stageUuid: "e300c0dc-81e9-8e04-8b0c-f2f857c19cfc"
version: 2
---
# can/use/dom — is a real DOM present

A default-exported boolean: `true` only when `window`, `window.document` and `window.document.createElement` are all present. It is the single guard for code that may run both in the browser and on the server (or in a non-DOM runtime like a Worker or a Node test), so DOM-only work never runs where there is no DOM.

Matter-twin: `src/can/use/dom/index.ts` (default `boolean`).

**Law — [[law]]: branch on DOM availability through this one guard — never poke `window` or `document` directly — so browser-only work is inert on the server.**
