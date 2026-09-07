---
name: text
description: "Use when parsing or persisting prose — text decomposes into word ⊕ digit tokens, each a content-addressed diamond; parse walks text, save folds tokens into a typography-style root without one-folder-per-word sprawl."
atomPath: text
coordinate: "text · 7/descent · 2a4d8260"
contentUuid: "1d9462bc-3bc0-5ba3-9cd0-3cea1ce5a766"
diamondUuid: "9388f957-277e-8c75-a11f-bcdf86d30ee8"
uuid: "2a4d8260-ca07-808e-9b48-fb641b1cde4d"
horo: 7
typography:
  partition: text
  bondDegree: 69
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "f15e863f-980f-8b05-980d-90a53fd3ede5"
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
      stageUuid: "d76df797-3941-8361-ba6a-601e4595bdc8"
    - stage: seal
      stageUuid: "8ce9b919-77fe-8068-9447-588efebdafbb"
    - stage: uuid
      stageUuid: "2b5f1dac-7472-8bd6-803e-c46c601c48f6"
version: 2
---
# text — words ⊕ digits

Prose at the atomic layer is **only [[word]] tokens and [[digit]] numeric tokens** — letters spell words, digits spell numbers. A [[diamond]] per token: `uuid(jcs({ kind, value }))`, the same content-address math as [[quantum/boundary]]. **Parse** walks text → emits the positioned sequence; **save** persists into the computed in-memory index and folds a [[typography]]-style root over every token uuid. No one-folder-per-English-word sprawl — save is index + optional persistence API, not mass filesystem atoms.

Entangled with — [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[law]] · [[pronounceable]] · [[document]] · [[markup]] · [[speech]]

**Law — [[law]]: text is words ⊕ digits at the token layer — parse emits a positioned word/digit sequence, each token content-addressed as a [[diamond]]; save persists into the computed index and folds a [[typography]]-style root, never one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
