---
name: dom
description: "Use when code must branch on whether a real browser DOM is available — a default boolean that is true only when window, window.document and document.createElement all exist, guarding browser-only work on the server or in non-DOM runtimes."
atomPath: "can/use/dom"
coordinate: "can/use/dom · 5/round · f9335dea"
contentUuid: "6d5c897b-b98d-5968-a91f-d09a1b81353e"
diamondUuid: "201d3159-a000-85db-9586-8b5e8241ca17"
uuid: "f9335dea-f0b2-8069-b3a0-704b285534fa"
horo: 5
typography:
  partition: can
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "bda4fe15-e8e3-85aa-9425-f86936d700c7"
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
      stageUuid: "383fb720-be22-8275-8044-282cfab708c7"
    - stage: seal
      stageUuid: "d825b003-5a69-8c00-bf54-bec9e89fe535"
    - stage: uuid
      stageUuid: "3935ad83-7947-86a0-aa60-f31056c81648"
version: 2
---
# can/use/dom — is a real DOM present

A default-exported boolean: `true` only when `window`, `window.document` and `window.document.createElement` are all present. It is the single guard for code that may run both in the browser and on the server (or in a non-DOM runtime like a Worker or a Node test), so DOM-only work never runs where there is no DOM.

Matter-twin: `src/can/use/dom/index.ts` (default `boolean`).

**Law — [[law]]: branch on DOM availability through this one guard — never poke `window` or `document` directly — so browser-only work is inert on the server.**
