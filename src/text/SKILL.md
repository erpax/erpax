---
name: text
description: "Use when parsing or persisting prose — text decomposes into word ⊕ digit tokens, each a content-addressed diamond; parse walks text, save folds tokens into a typography-style root without one-folder-per-word sprawl."
atomPath: text
coordinate: "text · 7/descent · 0957bbb2"
contentUuid: "bfa3c450-c68f-522b-9a13-aca4f6ed920d"
diamondUuid: "2ed2a0e3-d2f2-836b-b6cc-51eec7989965"
uuid: "0957bbb2-2f33-803a-855d-ba127fece630"
horo: 7
typography:
  partition: text
  bondDegree: 69
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "2e58ed0f-d08d-82f5-98b3-e770874f0f91"
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
      stageUuid: "c21b9a92-7d8a-80c5-b2eb-3682cc4bb12c"
    - stage: seal
      stageUuid: "8ce9b919-77fe-8068-9447-588efebdafbb"
    - stage: uuid
      stageUuid: "164dbc1d-976c-8c07-b93f-08bc02ea2788"
version: 2
---
# text — words ⊕ digits

Prose at the atomic layer is **only [[word]] tokens and [[digit]] numeric tokens** — letters spell words, digits spell numbers. A [[diamond]] per token: `uuid(jcs({ kind, value }))`, the same content-address math as [[quantum/boundary]]. **Parse** walks text → emits the positioned sequence; **save** persists into the computed in-memory index and folds a [[typography]]-style root over every token uuid. No one-folder-per-English-word sprawl — save is index + optional persistence API, not mass filesystem atoms.

Entangled with — [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[law]] · [[pronounceable]] · [[document]] · [[markup]] · [[speech]]

**Law — [[law]]: text is words ⊕ digits at the token layer — parse emits a positioned word/digit sequence, each token content-addressed as a [[diamond]]; save persists into the computed index and folds a [[typography]]-style root, never one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
