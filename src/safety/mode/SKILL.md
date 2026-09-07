---
name: mode
description: Use when reasoning about mode — reads the operating mode and refuses an operation the mode does not permit; fails closed rather than degrading.
atomPath: "safety/mode"
coordinate: "safety/mode · 8/crest · 96c7159b"
contentUuid: "81cdd9bd-d660-5683-9f30-63820d56d6cd"
diamondUuid: "dd4809f7-446e-81e2-a0a7-3faea4695320"
uuid: "96c7159b-df03-88e5-a4cc-6f77381d54d6"
horo: 8
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
  computationUuid: "5557b2f8-c340-8e8a-8b88-52796c0c621f"
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
      stageUuid: "2c442894-b984-8e61-a011-138274e4d870"
    - stage: seal
      stageUuid: "1003986f-0ca2-8bff-a7e2-0b958e6e4363"
    - stage: uuid
      stageUuid: "c02a7347-2e41-8f06-a57b-e555ba4ddcdc"
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
