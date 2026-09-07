---
name: text
description: "Use when parsing or persisting prose — text decomposes into word ⊕ digit tokens, each a content-addressed diamond; parse walks text, save folds tokens into a typography-style root without one-folder-per-word sprawl."
atomPath: text
coordinate: "text · 8/crest · 56967aac"
contentUuid: "3effc432-9ceb-5548-a4d0-be915b1cd00d"
diamondUuid: "87c37243-2642-8add-b746-7ac24b12a68f"
uuid: "56967aac-a5cf-8184-8ff4-7a56e213a159"
horo: 8
typography:
  partition: text
  bondDegree: 69
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "9e8f41d5-6b54-8a4a-bb20-875a01f028ab"
  stages:
    - stage: path
      stageUuid: "5929976f-0e1a-839c-b523-c18068d40fc2"
    - stage: trinity
      stageUuid: "9b87a0b4-063a-849e-8e5b-17153947c223"
    - stage: boundary
      stageUuid: "cd890b3e-9cdc-8630-acbb-d49133f54e57"
    - stage: links
      stageUuid: "205d247b-8eef-8d14-b20b-df06f8c7a983"
    - stage: horo
      stageUuid: "a1dd2957-91fe-8b8f-b124-ef95c23c4bd6"
    - stage: seal
      stageUuid: "8ce9b919-77fe-8068-9447-588efebdafbb"
    - stage: uuid
      stageUuid: "dc63deb5-19e6-8e07-8640-642e5b185e8c"
version: 2
---
# text — words ⊕ digits

Prose at the atomic layer is **only [[word]] tokens and [[digit]] numeric tokens** — letters spell words, digits spell numbers. A [[diamond]] per token: `uuid(jcs({ kind, value }))`, the same content-address math as [[quantum/boundary]]. **Parse** walks text → emits the positioned sequence; **save** persists into the computed in-memory index and folds a [[typography]]-style root over every token uuid. No one-folder-per-English-word sprawl — save is index + optional persistence API, not mass filesystem atoms.

Entangled with — [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[law]] · [[pronounceable]] · [[document]] · [[markup]] · [[speech]]

**Law — [[law]]: text is words ⊕ digits at the token layer — parse emits a positioned word/digit sequence, each token content-addressed as a [[diamond]]; save persists into the computed index and folds a [[typography]]-style root, never one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
