---
name: text
description: "Use when parsing or persisting prose — text decomposes into word ⊕ digit tokens, each a content-addressed diamond; parse walks text, save folds tokens into a typography-style root without one-folder-per-word sprawl."
atomPath: text
coordinate: "text · 5/round · 495e5971"
contentUuid: "722036f4-827d-57d8-a20c-2f3cc569b634"
diamondUuid: "8e862af3-ad84-8ee5-a631-bfefa6968e43"
uuid: "495e5971-8305-86e7-85ae-3e910f5df8cb"
horo: 5
typography:
  partition: text
  bondDegree: 69
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "6b9d6fd1-ee9b-82e9-a2b4-c7ac07b39217"
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
      stageUuid: "c004508a-4972-8df0-8055-204c10951845"
    - stage: seal
      stageUuid: "8ce9b919-77fe-8068-9447-588efebdafbb"
    - stage: uuid
      stageUuid: "9132b446-240e-80ac-8347-e6ea7fd00e6a"
version: 2
---
# text — words ⊕ digits

Prose at the atomic layer is **only [[word]] tokens and [[digit]] numeric tokens** — letters spell words, digits spell numbers. A [[diamond]] per token: `uuid(jcs({ kind, value }))`, the same content-address math as [[quantum/boundary]]. **Parse** walks text → emits the positioned sequence; **save** persists into the computed in-memory index and folds a [[typography]]-style root over every token uuid. No one-folder-per-English-word sprawl — save is index + optional persistence API, not mass filesystem atoms.

Entangled with — [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[law]] · [[pronounceable]] · [[document]] · [[markup]] · [[speech]]

**Law — [[law]]: text is words ⊕ digits at the token layer — parse emits a positioned word/digit sequence, each token content-addressed as a [[diamond]]; save persists into the computed index and folds a [[typography]]-style root, never one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
