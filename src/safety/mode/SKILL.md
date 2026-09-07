---
name: mode
description: Use when reasoning about mode — reads the operating mode and refuses an operation the mode does not permit; fails closed rather than degrading.
atomPath: "safety/mode"
coordinate: "safety/mode · 4/weave · af81aa93"
contentUuid: "b68c4ea6-023c-5448-9db2-7f0470364bed"
diamondUuid: "56ebd90b-d630-881a-8541-360d24769727"
uuid: "af81aa93-9f9b-8617-b61d-c7b83b0c501f"
horo: 4
typography:
  partition: safety
  bondDegree: 41
standards:
  - "ISO/IEC 27001 Annex A.14.2.5 secure-systems-engineering"
  - "NIST SP 800-160 §3.4.2 trustworthy secure design"
  - "OWASP ASVS V14 Configuration (hard-coded production mode)"
  - "OWASP-ASVS"
bindings: []
signatures:
  computationUuid: "ffc32be3-0e1b-8f60-a9e1-aec22e3bd1db"
  stages:
    - stage: path
      stageUuid: "4eb3cf13-3c1b-8c71-a221-0790cdfb3fb4"
    - stage: trinity
      stageUuid: "61b6e8cf-ecfe-8f83-9b2b-f7a439af62bc"
    - stage: boundary
      stageUuid: "0a084923-357f-8687-b64a-874c3b8372a2"
    - stage: links
      stageUuid: "7d245d13-c5c9-84bb-a291-8ea90fa2157d"
    - stage: horo
      stageUuid: "58838263-bfd5-89ea-ba02-030b0a58f745"
    - stage: seal
      stageUuid: "1003986f-0ca2-8bff-a7e2-0b958e6e4363"
    - stage: uuid
      stageUuid: "e2a9c98a-6d21-8b12-9a35-8bebee25c72b"
version: 2
---
# safety/mode — an agent that can rewrite the guarantee is not bounded by it

`getSafetyMode` reads the operating mode and `requireSafetyMode` refuses an operation the mode
does not permit; `assertMinimumMode` fails closed rather than degrading.
`UUID_FAMILY_ESCAPE_HATCHES` names every path that can bypass the uuid guarantees — declared in
the open, because an undeclared hatch is one nobody audits — and `attackSurfaceReport` counts them.

**Honest boundary.** This bounds what the declared hatches allow. A capability reached some other
way is outside its model, which is precisely why the list is written down rather than inferred.

Composes: [[uuid]] · [[law]].
