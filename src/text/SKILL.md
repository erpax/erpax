---
name: text
description: "Use when parsing or persisting prose — text decomposes into word ⊕ digit tokens, each a content-addressed diamond; parse walks text, save folds tokens into a typography-style root without one-folder-per-word sprawl."
atomPath: text
coordinate: text · 8/crest · 8b9105a1
contentUuid: "a654b20a-48a4-532b-86df-a2b563ad2ee0"
diamondUuid: "049165a4-277e-87a6-ae42-28b837e0adea"
uuid: "8b9105a1-303a-82a5-ba4f-23f78b52ceda"
horo: 8
bonds:
  in:
    - atom
    - boundary
    - caption
    - credit
    - diamond
    - digit
    - digital
    - document
    - embedded
    - law
    - markup
    - object
    - phonetic
    - pronounceable
    - speech
    - typography
    - unit
    - word
  out:
    - atom
    - boundary
    - caption
    - credit
    - diamond
    - digit
    - digital
    - document
    - embedded
    - law
    - markup
    - object
    - phonetic
    - pronounceable
    - speech
    - typography
    - unit
    - word
typography:
  partition: text
  bondDegree: 62
  neighbors:
    - diamond
    - quantum/boundary
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
neighbors:
  wikilink:
    - atom
    - boundary
    - diamond
    - digit
    - document
    - law
    - markup
    - pronounceable
    - speech
    - typography
    - word
  matrix:
    - atom
    - boundary
    - caption
    - credit
    - diamond
    - digit
    - digital
    - document
    - embedded
    - law
    - markup
    - object
    - phonetic
    - pronounceable
    - speech
    - typography
    - unit
    - word
  backlinks:
    - atom
    - boundary
    - caption
    - credit
    - diamond
    - digit
    - digital
    - document
    - embedded
    - law
    - markup
    - object
    - phonetic
    - pronounceable
    - speech
    - typography
    - unit
    - word
signatures:
  computationUuid: "b52fbc3c-ca17-83dc-bc51-e70ce2943478"
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
      stageUuid: "c28ed301-5e9c-8a82-aab4-298dc5de1258"
    - stage: seal
      stageUuid: "c4fee420-0643-8d26-9251-2ec4efa2e33e"
    - stage: uuid
      stageUuid: "acf9bde1-f3db-817c-9ae1-ead35daf137d"
version: 2
---
# text — words ⊕ digits

Prose at the atomic layer is **only [[word]] tokens and [[digit]] numeric tokens** — letters spell words, digits spell numbers. A [[diamond]] per token: `uuid(jcs({ kind, value }))`, the same content-address math as [[quantum/boundary]]. **Parse** walks text → emits the positioned sequence; **save** persists into the computed in-memory index and folds a [[typography]]-style root over every token uuid. No one-folder-per-English-word sprawl — save is index + optional persistence API, not mass filesystem atoms.

Entangled with — [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[law]] · [[pronounceable]] · [[document]] · [[markup]] · [[speech]]

**Law — [[law]]: text is words ⊕ digits at the token layer — parse emits a positioned word/digit sequence, each token content-addressed as a [[diamond]]; save persists into the computed index and folds a [[typography]]-style root, never one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[word]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
