---
name: snapshots
description: "Use when capturing or replaying immutable point-in-time snapshots of a fiscal period — on creation, amendment, validation, closing, or regulatory audit; chaining priorSnapshot for tamper-detection; attaching eIDAS QES signatures on critical amendments. The fiscal-period audit-chain snapshot node."
atomPath: "fiscal/periods/fiscal/period/snapshots"
coordinate: "fiscal/periods/fiscal/period/snapshots · 4/weave · e69dfb64"
contentUuid: "5c0bbd6b-b27b-51c4-9331-96992c7fe561"
diamondUuid: "dbac4751-7ea0-825c-aa0b-539e049a9886"
uuid: "e69dfb64-86d9-87d7-89f6-eb233d8bdf9d"
horo: 4
typography:
  partition: fiscal
  bondDegree: 28
standards:
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)"
  - "GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)`"
  - "NIST-SP-800-92"
  - "NIST-SP-800-92 (audit logging, integrity verification)"
  - "NIST-SP-800-92 (audit logging, integrity verification)`"
  - SOX
  - "SOX:2002 (access control audit evidence, change log)"
  - "SOX:2002 (access control audit evidence, change log)`"
  - eIDAS
  - "eIDAS:2014/910/EU (signature on critical amendments)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d6b41a3b-305a-8f90-a286-8a2adf6cccea"
  stages:
    - stage: path
      stageUuid: "42d7c04b-469d-8354-bfd8-d34c0d6851eb"
    - stage: trinity
      stageUuid: "c32266fd-942f-8621-a394-378de3d9afed"
    - stage: boundary
      stageUuid: "3236eec3-4207-8b50-89b1-8c027c51b1a5"
    - stage: links
      stageUuid: "e7134c4d-a15d-8f82-86bb-6974c073e606"
    - stage: horo
      stageUuid: "ebed4a2b-791c-85e6-a79a-eb23883d2487"
    - stage: seal
      stageUuid: "d8757962-66a2-8481-8f62-0a54912185e0"
    - stage: uuid
      stageUuid: "fbe096d3-2f68-80c5-a8ab-1de792c56193"
version: 2
---
# fiscal-period-snapshots

Immutable snapshots of FiscalPeriods at critical moments: creation, amendment, validation, closing, regulatory audit. Implements Law 60 (chain) and GDPR Art. 32 (audit trail for system modifications).

Composes: [[standard]] · [[access]] · [[proof]] · [[identity]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)`
- `@standard SOX:2002 (access control audit evidence, change log)`
- `@standard NIST-SP-800-92 (audit logging, integrity verification)`


- GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)
- eIDAS:2014/910/EU (signature on critical amendments)
- SOX:2002 (access control audit evidence, change log)
- NIST-SP-800-92 (audit logging, integrity verification)

**Law — [[law]]: a fiscal-period snapshot is an immutable point-in-time capture chained to its prior snapshot — the priorSnapshot link makes any hidden amendment detectable, and critical amendments carry an eIDAS QES signature, so the period's history is replayable and tamper-evident.**
