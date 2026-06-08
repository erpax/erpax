---
name: deferredrevenue
description: "Use when reasoning about deferredrevenue — Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position"
atomPath: deferredrevenue
coordinate: deferredrevenue · 5/round · 891c0e99
contentUuid: "04702057-ffb0-5abf-b37e-a992c33b0a8b"
diamondUuid: "b1b25d22-5e30-8cc5-b299-091bd0d66330"
uuid: "891c0e99-6344-8b13-8fba-e54d07cda942"
horo: 5
bonds:
  in:
    - accrual
    - contracts
    - deferral
    - entries
    - invoices
    - law
    - performances
    - prepaid
    - revenue
    - share
  out:
    - accrual
    - contracts
    - deferral
    - entries
    - invoices
    - law
    - performances
    - prepaid
    - revenue
    - share
typography:
  partition: deferredrevenue
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accrual
    - contracts
    - deferral
    - entries
    - invoices
    - law
    - performances
  matrix:
    - accrual
    - contracts
    - deferral
    - entries
    - invoices
    - law
    - performances
    - prepaid
    - revenue
    - share
  backlinks:
    - accrual
    - contracts
    - deferral
    - entries
    - invoices
    - law
    - performances
    - prepaid
    - revenue
    - share
signatures:
  computationUuid: "767b7fc2-dfa7-8e48-b427-ee6f0707cf74"
  stages:
    - stage: path
      stageUuid: "59f46214-5811-8514-8c18-86bd6eb6b325"
    - stage: trinity
      stageUuid: "cc5af615-c65c-84c9-a0b8-58cf2cf566eb"
    - stage: boundary
      stageUuid: "fc5e6e56-3d0b-898e-b9eb-2d0afce4b991"
    - stage: links
      stageUuid: "ac8ba571-0fb1-8ddf-a5af-fdce93bd9f18"
    - stage: horo
      stageUuid: "7fc2f78d-92c8-839c-a6ea-3633bba4de9a"
    - stage: seal
      stageUuid: "69db91c4-ca06-882a-a2ce-9cd2bf74792d"
    - stage: uuid
      stageUuid: "9bc6a1ee-3af5-8c6f-b5fb-4d7c740303a7"
version: 2
---
# deferredrevenue

Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position

Composes: [[Invoices]] · [[Contracts]] · [[customers/contracts/contract/performances]] · [[journal/entries]] · [[accrual]] · [[deferral]].

**Law — [[law]]: deferred revenue is a contract liability — cash received before the performance obligation is satisfied; it nets against contract assets to yield the net contract position ([[deferral]], the mirror of [[accrual]]).**

## Standards
- IFRS-15 §85-86 (contract liability)
- FASB ASC 606-10-45-1 (liability recognized for advance payment)
