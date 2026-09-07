---
name: snapshots
description: "Use when capturing or replaying immutable point-in-time snapshots of a fiscal period — on creation, amendment, validation, closing, or regulatory audit; chaining priorSnapshot for tamper-detection; attaching eIDAS QES signatures on critical amendments. The fiscal-period audit-chain snapshot node."
atomPath: "fiscal/periods/fiscal/period/snapshots"
coordinate: "fiscal/periods/fiscal/period/snapshots · 2/share · 77ced084"
contentUuid: "75b50d26-2a86-5980-8ebb-19beed759acf"
diamondUuid: "76684011-65c7-823d-b07d-f4cf09521c62"
uuid: "77ced084-270c-8e8f-b456-d0044c54a2f6"
horo: 2
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
  computationUuid: "2c8cf5b4-601c-836f-944f-a35122c3015c"
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
      stageUuid: "d298bba4-2c0d-8926-acfd-3cb38d038f73"
    - stage: seal
      stageUuid: "d8757962-66a2-8481-8f62-0a54912185e0"
    - stage: uuid
      stageUuid: "26bfdb01-c5fb-810c-8036-6d9721031455"
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
