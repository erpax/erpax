---
name: dom
description: "Use when code must branch on whether a real browser DOM is available — a default boolean that is true only when window, window.document and document.createElement all exist, guarding browser-only work on the server or in non-DOM runtimes."
atomPath: can/use/dom
coordinate: can/use/dom · 2/share · 06d96242
contentUuid: "85f1d27d-350e-564f-805b-610bd214d8dc"
diamondUuid: "714a5d21-f29f-8ba4-88df-99275c37a5c5"
uuid: "06d96242-c7e9-8efd-9105-965595e70440"
horo: 2
bonds:
  in:
    - law
    - use
  out:
    - law
typography:
  partition: can
  bondDegree: 3
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "ad22c798-6902-8496-aa51-dfefbc1e8efd"
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
      stageUuid: "cf50f502-43d4-80c7-b073-eb86b167a844"
    - stage: seal
      stageUuid: "d825b003-5a69-8c00-bf54-bec9e89fe535"
    - stage: uuid
      stageUuid: "d35394e9-822d-8dd7-9fbd-f3ebb72a679b"
version: 2
---
# can/use/dom — is a real DOM present

A default-exported boolean: `true` only when `window`, `window.document` and `window.document.createElement` are all present. It is the single guard for code that may run both in the browser and on the server (or in a non-DOM runtime like a Worker or a Node test), so DOM-only work never runs where there is no DOM.

Matter-twin: `src/can/use/dom/index.ts` (default `boolean`).

**Law — [[law]]: branch on DOM availability through this one guard — never poke `window` or `document` directly — so browser-only work is inert on the server.**
