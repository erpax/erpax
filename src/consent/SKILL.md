---
name: consent
description: "Use when a contract or compliance regime requires explicit consent — who must consent, form (written/electronic/oral), revocation, withdrawal, withdrawal timeline, conditions."
atomPath: consent
coordinate: "consent · 5/round · 488b33ee"
contentUuid: "20dfaa16-2eb6-5acf-bab7-bab95d3bd59b"
diamondUuid: "39755be5-937a-889e-8e40-9c97a4ea17b5"
uuid: "488b33ee-7ecb-8727-af16-053fd3acd3e7"
horo: 5
bonds:
  in:
    - assignment
    - biometric
    - contracts
    - dataprotection
    - matter
    - notification
    - records
  out:
    - assignment
    - biometric
    - contracts
    - dataprotection
    - matter
    - notification
    - records
typography:
  partition: consent
  bondDegree: 21
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - contracts
    - matter
    - records
  matrix:
    - assignment
    - biometric
    - contracts
    - dataprotection
    - matter
    - notification
    - records
  backlinks:
    - assignment
    - biometric
    - contracts
    - dataprotection
    - matter
    - notification
    - records
signatures:
  computationUuid: "cd7f1567-311a-803d-8a8a-2321217f3ae3"
  stages:
    - stage: path
      stageUuid: "a5193824-78c2-85c2-a1fc-ee1757d8b955"
    - stage: trinity
      stageUuid: "72cc1667-21b5-839b-9f50-c3206dc6218b"
    - stage: boundary
      stageUuid: "b199e9c5-7044-8b2c-9e03-fe590d0f7aa4"
    - stage: links
      stageUuid: "3434fdcb-1d97-8dc3-9d56-68a2cd0a82b7"
    - stage: horo
      stageUuid: "7275e0a6-8fef-807b-b925-274267b8a47e"
    - stage: seal
      stageUuid: "6dd005cf-a812-856d-a856-961e0c517710"
    - stage: uuid
      stageUuid: "f96cbe81-00e1-8c12-b0a6-83ee78482f30"
version: 2
---
# consent

Use when a contract or compliance regime requires explicit consent — who must consent, form (written/electronic/oral), revocation, withdrawal, withdrawal timeline, conditions.

Composes: [[Contracts]] · [[matter]] · [[consent/records]].

## Standards
- GDPR-Art-7
- eIDAS-Art-25
- PECL-Art-2.101
