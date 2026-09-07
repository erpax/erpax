---
name: snapshots
description: "Use when capturing or replaying immutable point-in-time snapshots of a fiscal period — on creation, amendment, validation, closing, or regulatory audit; chaining priorSnapshot for tamper-detection; attaching eIDAS QES signatures on critical amendments. The fiscal-period audit-chain snapshot node."
atomPath: "fiscal/periods/fiscal/period/snapshots"
coordinate: "fiscal/periods/fiscal/period/snapshots · 2/share · ec08d167"
contentUuid: "8d4f68f2-c4ff-5d3c-8380-270373fbf218"
diamondUuid: "ee6d6e16-f415-80ef-ba02-15a1c348d6fb"
uuid: "ec08d167-cb9f-8959-a04d-fe85b2f62b76"
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
  computationUuid: "034340f3-9d43-8eb0-b56e-de456f47d2c1"
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
      stageUuid: "f8169ede-af72-8871-92c2-cb27c9f6f77c"
    - stage: seal
      stageUuid: "d8757962-66a2-8481-8f62-0a54912185e0"
    - stage: uuid
      stageUuid: "adebec28-627c-8c54-ac0a-7cd7996babda"
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
