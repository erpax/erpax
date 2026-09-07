---
name: dom
description: "Use when code must branch on whether a real browser DOM is available — a default boolean that is true only when window, window.document and document.createElement all exist, guarding browser-only work on the server or in non-DOM runtimes."
atomPath: "can/use/dom"
coordinate: "can/use/dom · 7/descent · 5ac85258"
contentUuid: "8507bf95-223f-56d8-9812-3a26d8611cf8"
diamondUuid: "a540649e-86c1-86cd-8684-ff11352eed21"
uuid: "5ac85258-81eb-8135-b3d4-b650900b3dfd"
horo: 7
typography:
  partition: can
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "72117b9a-00df-8b6e-9bcc-2355e017db86"
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
      stageUuid: "4dd11346-de24-8ed0-9a06-5bc07afbb746"
    - stage: seal
      stageUuid: "d825b003-5a69-8c00-bf54-bec9e89fe535"
    - stage: uuid
      stageUuid: "62a3098e-a9ed-8290-9eb5-316a54b1e401"
version: 2
---
# can/use/dom — is a real DOM present

A default-exported boolean: `true` only when `window`, `window.document` and `window.document.createElement` are all present. It is the single guard for code that may run both in the browser and on the server (or in a non-DOM runtime like a Worker or a Node test), so DOM-only work never runs where there is no DOM.

Matter-twin: `src/can/use/dom/index.ts` (default `boolean`).

**Law — [[law]]: branch on DOM availability through this one guard — never poke `window` or `document` directly — so browser-only work is inert on the server.**
