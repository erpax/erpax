---
name: mode
description: Use when reasoning about mode — reads the operating mode and refuses an operation the mode does not permit; fails closed rather than degrading.
atomPath: "safety/mode"
coordinate: "safety/mode · 5/round · d1d367ff"
contentUuid: "bb39b642-b6dd-596d-b17e-45ae9fe8b42a"
diamondUuid: "ab28816e-467e-8385-9974-599f8f4ce67a"
uuid: "d1d367ff-fe95-84d1-a4cf-19633e8b606d"
horo: 5
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
  computationUuid: "389e1b17-36b1-88ee-bebb-0134d31c23ad"
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
      stageUuid: "72e92f57-970d-83f9-a43c-b9af5e6f392f"
    - stage: seal
      stageUuid: "1003986f-0ca2-8bff-a7e2-0b958e6e4363"
    - stage: uuid
      stageUuid: "096d8a1e-4d31-848d-845e-ba6c27a3eab1"
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
