---
name: text
description: "Use when parsing or persisting prose — text decomposes into word ⊕ digit tokens, each a content-addressed diamond; parse walks text, save folds tokens into a typography-style root without one-folder-per-word sprawl."
atomPath: text
coordinate: "text · 1/base · 43f2b9dc"
contentUuid: "54246081-e692-5726-ad55-e529be9f2fae"
diamondUuid: "e0f7c563-0a4c-85f0-a56b-ad919e94aa26"
uuid: "43f2b9dc-d686-824b-ae35-cbb91f13706e"
horo: 1
typography:
  partition: text
  bondDegree: 69
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "4a64487a-9d84-8ca1-85c6-d9036e8685cb"
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
      stageUuid: "ff3c77a2-4d94-859f-ac05-dcdd90a6d392"
    - stage: seal
      stageUuid: "8ce9b919-77fe-8068-9447-588efebdafbb"
    - stage: uuid
      stageUuid: "20b12825-7c9a-8bc7-a64a-38df7932ca11"
version: 2
---
# text — words ⊕ digits

Prose at the atomic layer is **only [[word]] tokens and [[digit]] numeric tokens** — letters spell words, digits spell numbers. A [[diamond]] per token: `uuid(jcs({ kind, value }))`, the same content-address math as [[quantum/boundary]]. **Parse** walks text → emits the positioned sequence; **save** persists into the computed in-memory index and folds a [[typography]]-style root over every token uuid. No one-folder-per-English-word sprawl — save is index + optional persistence API, not mass filesystem atoms.

Entangled with — [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[law]] · [[pronounceable]] · [[document]] · [[markup]] · [[speech]]

**Law — [[law]]: text is words ⊕ digits at the token layer — parse emits a positioned word/digit sequence, each token content-addressed as a [[diamond]]; save persists into the computed index and folds a [[typography]]-style root, never one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
