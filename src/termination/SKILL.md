---
name: termination
description: "Use when modeling contract end conditions — termination for convenience, termination for cause, notice period, effect (wind-down obligations, survival clauses), remedies on termination."
atomPath: termination
coordinate: "termination · 5/round · e0ec8d54"
contentUuid: "1d27111b-629f-5c5f-b3a3-83650682dc6e"
diamondUuid: "635d655e-e6f7-8c48-b579-7c893e3b299d"
uuid: "e0ec8d54-985d-86eb-9337-46190a045f4c"
horo: 5
typography:
  partition: termination
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "9adfe8d2-ab73-8ba7-9bba-0c133ce11aa8"
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
      stageUuid: "e32ca07c-b414-8502-b7d2-a9e3c7cd7adb"
    - stage: seal
      stageUuid: "55dc51da-cdda-894a-a9f1-2340789b1f2f"
    - stage: uuid
      stageUuid: "051e66e1-aa1d-82e6-ad11-40b7d947a6fd"
version: 2
---
# termination

Use when modeling contract end conditions — termination for convenience, termination for cause, notice period, effect (wind-down obligations, survival clauses), remedies on termination.

Composes: [[Contracts]] · [[matter]] · [[horo]] · [[liability]] · [[remediation]] · [[close]].

## Standards
- UCC-2-309
- PECL-Art-8.307

**Law — [[law]]: termination ends a contract's forward obligations but not its survivors — wind-down duties, survival clauses, and remedies persist past the end date; ending is a controlled transition, not erasure.**
