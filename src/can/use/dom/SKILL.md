---
name: dom
description: "Use when code must branch on whether a real browser DOM is available — a default boolean that is true only when window, window.document and document.createElement all exist, guarding browser-only work on the server or in non-DOM runtimes."
atomPath: "can/use/dom"
coordinate: "can/use/dom · 4/weave · ed572ce5"
contentUuid: "4a893072-9123-5641-bc15-f43711561e65"
diamondUuid: "117a90a7-e936-800f-8c87-46917e16b6b2"
uuid: "ed572ce5-0fc9-850e-8b14-25cdba90e760"
horo: 4
typography:
  partition: can
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "b61d37a5-37c7-85a6-a72a-056cacd31829"
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
      stageUuid: "6c4c7c65-3351-8240-ad41-4041b722e38d"
    - stage: seal
      stageUuid: "d825b003-5a69-8c00-bf54-bec9e89fe535"
    - stage: uuid
      stageUuid: "f69edb6b-8de7-8fb5-a92e-97a8130c68a7"
version: 2
---
# can/use/dom — is a real DOM present

A default-exported boolean: `true` only when `window`, `window.document` and `window.document.createElement` are all present. It is the single guard for code that may run both in the browser and on the server (or in a non-DOM runtime like a Worker or a Node test), so DOM-only work never runs where there is no DOM.

Matter-twin: `src/can/use/dom/index.ts` (default `boolean`).

**Law — [[law]]: branch on DOM availability through this one guard — never poke `window` or `document` directly — so browser-only work is inert on the server.**
