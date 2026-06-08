---
name: termination
description: "Use when modeling contract end conditions — termination for convenience, termination for cause, notice period, effect (wind-down obligations, survival clauses), remedies on termination."
atomPath: termination
coordinate: termination · 5/round · db0b291f
contentUuid: "2a911b90-d0c1-52ed-9c11-fc5a19bf1431"
diamondUuid: "fb30c19d-0ac3-8fb1-8f9a-95aa9a007cc0"
uuid: "db0b291f-a710-8d5f-a7cb-e3898c1fc215"
horo: 5
bonds:
  in:
    - close
    - contracts
    - forcemajeure
    - horo
    - law
    - liability
    - license
    - matter
    - remediation
  out:
    - close
    - contracts
    - forcemajeure
    - horo
    - law
    - liability
    - license
    - matter
    - remediation
typography:
  partition: termination
  bondDegree: 27
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - close
    - contracts
    - horo
    - law
    - liability
    - matter
    - remediation
  matrix:
    - close
    - contracts
    - forcemajeure
    - horo
    - law
    - liability
    - license
    - matter
    - remediation
  backlinks:
    - close
    - contracts
    - forcemajeure
    - horo
    - law
    - liability
    - license
    - matter
    - remediation
signatures:
  computationUuid: "61142219-bf7a-883b-9593-c8189646c0da"
  stages:
    - stage: path
      stageUuid: "9d2856f5-5589-8396-aaf2-cd446750b4a7"
    - stage: trinity
      stageUuid: "ea9404c1-ff8d-89ff-b050-8582193272fd"
    - stage: boundary
      stageUuid: "a642576d-9e76-8f69-80b9-123261ebcafc"
    - stage: links
      stageUuid: "f1b2e992-5017-87f7-8ff8-ef9d4ab3f849"
    - stage: horo
      stageUuid: "357bcc52-1616-84e6-8f4e-f3b35a14a182"
    - stage: seal
      stageUuid: "69367b6b-1aa9-8846-8d12-28339ec92edc"
    - stage: uuid
      stageUuid: "80e6fdf0-cd8a-8d10-a920-cedd3a93f179"
version: 2
---
# termination

Use when modeling contract end conditions — termination for convenience, termination for cause, notice period, effect (wind-down obligations, survival clauses), remedies on termination.

Composes: [[Contracts]] · [[matter]] · [[horo]] · [[liability]] · [[remediation]] · [[close]].

## Standards
- UCC-2-309
- PECL-Art-8.307

**Law — [[law]]: termination ends a contract's forward obligations but not its survivors — wind-down duties, survival clauses, and remedies persist past the end date; ending is a controlled transition, not erasure.**
