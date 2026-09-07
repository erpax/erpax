---
name: mode
description: Use when reasoning about mode — reads the operating mode and refuses an operation the mode does not permit; fails closed rather than degrading.
atomPath: "safety/mode"
coordinate: "safety/mode · 7/descent · 1826ac44"
contentUuid: "9b2667a4-4322-5c44-aa5d-b64afbe6f5f9"
diamondUuid: "aeb36863-897e-8e6a-ad3f-c5c2e98cd048"
uuid: "1826ac44-0340-810c-b48b-566a1c61d1fb"
horo: 7
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
  computationUuid: "c6e3fd88-67e1-8d2b-b529-a70344d856d9"
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
      stageUuid: "b4d8fdbe-bb40-8842-a4cb-bea684312930"
    - stage: seal
      stageUuid: "1003986f-0ca2-8bff-a7e2-0b958e6e4363"
    - stage: uuid
      stageUuid: "461948dd-b5f5-8dcd-ba25-d29ccc7dcf20"
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
