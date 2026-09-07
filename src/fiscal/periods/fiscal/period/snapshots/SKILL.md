---
name: snapshots
description: "Use when capturing or replaying immutable point-in-time snapshots of a fiscal period — on creation, amendment, validation, closing, or regulatory audit; chaining priorSnapshot for tamper-detection; attaching eIDAS QES signatures on critical amendments. The fiscal-period audit-chain snapshot node."
atomPath: "fiscal/periods/fiscal/period/snapshots"
coordinate: "fiscal/periods/fiscal/period/snapshots · 1/base · 3042e5db"
contentUuid: "314f37d1-9219-50b9-aa58-fc18ec0be6b1"
diamondUuid: "702c9aa8-c5a4-8de7-a66f-eed9bd5b212f"
uuid: "3042e5db-267f-86c6-b4fd-3a803e5636b2"
horo: 1
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
  computationUuid: "efeb2ab5-3a1b-8167-9104-3184f74dea65"
  stages:
    - stage: path
      stageUuid: "42d7c04b-469d-8354-bfd8-d34c0d6851eb"
    - stage: trinity
      stageUuid: "c32266fd-942f-8621-a394-378de3d9afed"
    - stage: boundary
      stageUuid: "3236eec3-4207-8b50-89b1-8c027c51b1a5"
    - stage: links
      stageUuid: "dcc4a99d-67a6-81d7-b107-c255f27c97ad"
    - stage: horo
      stageUuid: "460df694-a61e-8731-ac2a-364f4f0ca48e"
    - stage: seal
      stageUuid: "d8757962-66a2-8481-8f62-0a54912185e0"
    - stage: uuid
      stageUuid: "1910b43e-4f35-86dc-b295-76960cbc98b3"
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
