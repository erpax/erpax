---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: status · 2/share · 1d1c6362
contentUuid: "5babc774-0d23-54f5-a098-1d4cdacfbe89"
diamondUuid: "1675207b-32a2-821f-9c29-f956c044f72e"
uuid: "1d1c6362-2129-8b73-bfd1-743f413aba3d"
horo: 2
bonds:
  in:
    - action
    - active
    - age
    - approved
    - attrition
    - career
    - creative
    - delivery
    - diffusion
    - drug
    - enumeration
    - escalation
    - fields
    - force
    - game
    - incentive
    - item
    - legal
    - market
    - medical
    - nonprofit
    - order
    - passenger
    - prescription
    - queue
    - reason
    - reservation
    - resolution
    - server
    - study
    - ticket
    - work
  out:
    - action
    - active
    - age
    - approved
    - attrition
    - career
    - creative
    - delivery
    - diffusion
    - drug
    - enumeration
    - escalation
    - fields
    - force
    - game
    - incentive
    - item
    - legal
    - market
    - medical
    - nonprofit
    - order
    - passenger
    - prescription
    - queue
    - reason
    - reservation
    - resolution
    - server
    - study
    - ticket
    - work
typography:
  partition: status
  bondDegree: 96
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - fields
  matrix:
    - action
    - active
    - age
    - approved
    - attrition
    - career
    - creative
    - delivery
    - diffusion
    - drug
    - enumeration
    - escalation
    - fields
    - force
    - game
    - incentive
    - item
    - legal
    - market
    - medical
    - nonprofit
    - order
    - passenger
    - prescription
    - queue
    - reason
    - reservation
    - resolution
    - server
    - study
    - ticket
    - work
  backlinks:
    - action
    - active
    - age
    - approved
    - attrition
    - career
    - creative
    - delivery
    - diffusion
    - drug
    - enumeration
    - escalation
    - fields
    - force
    - game
    - incentive
    - item
    - legal
    - market
    - medical
    - nonprofit
    - order
    - passenger
    - prescription
    - queue
    - reason
    - reservation
    - resolution
    - server
    - study
    - ticket
    - work
signatures:
  computationUuid: "aa11a23b-a236-8c98-9f4e-85cde1483588"
  stages:
    - stage: path
      stageUuid: "49a1e297-a7e1-8e23-ba3f-17ea6ee99175"
    - stage: trinity
      stageUuid: "fa39638b-5a8c-8f7d-a1c4-610230247ec6"
    - stage: boundary
      stageUuid: "a7c17657-f964-8685-9ec5-12b184c741e6"
    - stage: links
      stageUuid: "9224b7a9-ec4b-84cc-adc7-7097009dfc2f"
    - stage: horo
      stageUuid: "9e499f2d-6ff5-84d4-847b-f6ec3cb026b0"
    - stage: seal
      stageUuid: "befe7dc4-0236-8565-809b-a59bd629efb6"
    - stage: uuid
      stageUuid: "2c982bcb-645e-84a8-a885-c811c115ae7d"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[fields]].
