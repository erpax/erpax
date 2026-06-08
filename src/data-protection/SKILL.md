---
name: "data-protection"
description: "Use when a contract or processing agreement specifies data-protection obligations — processor/controller roles, permitted uses, security measures (encryption, access controls, breach notification), DPA terms."
atomPath: "data-protection"
coordinate: "data-protection · 4/weave · 11c34328"
contentUuid: "31984b7c-4f51-5fa7-9732-447b7672b444"
diamondUuid: "6d4c4df3-f724-80cf-be36-28b6ddb4425c"
uuid: "11c34328-346f-80a7-9c38-ddac64c97e59"
horo: 4
bonds:
  in:
    - activities
    - biometric
    - consent
    - contracts
    - law
    - matter
    - records
    - sanitization
  out:
    - activities
    - biometric
    - consent
    - contracts
    - law
    - matter
    - records
    - sanitization
typography:
  partition: "data-protection"
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - consent
    - contracts
    - law
    - matter
    - records
  matrix:
    - activities
    - biometric
    - consent
    - contracts
    - law
    - matter
    - records
    - sanitization
  backlinks:
    - activities
    - biometric
    - consent
    - contracts
    - law
    - matter
    - records
    - sanitization
signatures:
  computationUuid: "d2366220-6262-8d8b-9785-b30f3966100b"
  stages:
    - stage: path
      stageUuid: "449fdc8c-601c-8ea9-b071-f126fc01fa70"
    - stage: trinity
      stageUuid: "0244910f-5336-8b42-b7a1-4eecff4a438d"
    - stage: boundary
      stageUuid: "3e679d78-5edc-8e15-926b-6b2d2cd2fabf"
    - stage: links
      stageUuid: "c6339492-30d4-828f-a402-47944db50767"
    - stage: horo
      stageUuid: "8b4885a1-242d-88f5-94d1-6405e30ed67e"
    - stage: seal
      stageUuid: "e630790c-51bb-822c-a403-38b3d7e35d23"
    - stage: uuid
      stageUuid: "4cb472c0-f919-8c70-a4ff-aab7c975e48e"
version: 2
---
# data-protection

Use when a contract or processing agreement specifies data-protection obligations — processor/controller roles, permitted uses, security measures (encryption, access controls, breach notification), DPA terms.

Composes: [[Contracts]] · [[matter]] · [[data/processing/activities]] · [[consent/records]] · [[consent]].

**Law — [[law]]: a data-protection clause fixes the processor/controller roles and the permitted uses plus security measures (encryption, access controls, breach notification) — the DPA terms a [[matter]] must carry whenever personal data is processed.**

## Standards
- GDPR-Art-28
- GDPR-Art-32
- UK-GDPR
