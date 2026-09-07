---
name: mode
description: Use when reasoning about mode — reads the operating mode and refuses an operation the mode does not permit; fails closed rather than degrading.
atomPath: "safety/mode"
coordinate: "safety/mode · 1/base · 12724de9"
contentUuid: "aeb3dc00-96d5-5e2f-adc4-f150875920ed"
diamondUuid: "317e4548-9136-80e6-9648-122411d7814e"
uuid: "12724de9-1e88-88dc-9d38-42f47699f903"
horo: 1
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
  computationUuid: "4104fa17-011a-8651-9c2f-701e81465d06"
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
      stageUuid: "8d9c634d-34c1-8aa8-b2f0-e2d13165996b"
    - stage: seal
      stageUuid: "1003986f-0ca2-8bff-a7e2-0b958e6e4363"
    - stage: uuid
      stageUuid: "7025c38c-81cb-85dc-8244-f2a0dc601eca"
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
