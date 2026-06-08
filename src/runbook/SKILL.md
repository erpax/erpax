---
name: runbook
description: "Use when documenting step-by-step standard operating procedures — incident response, system failover, deployment checklist, maintenance sequence. The executable playbook."
atomPath: runbook
coordinate: runbook · 2/share · 0aa1f168
contentUuid: "50a5e0e9-aa1a-5a8c-8715-1868abba7b0b"
diamondUuid: "8ac33915-787d-8098-a6d6-4cb6d63ad16f"
uuid: "0aa1f168-979e-8b19-b281-ae04c827b2f6"
horo: 2
bonds:
  in:
    - definitions
    - incident
    - law
    - schedule
  out:
    - definitions
    - incident
    - law
    - schedule
typography:
  partition: runbook
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - definitions
    - law
    - schedule
  matrix:
    - definitions
    - incident
    - law
    - schedule
  backlinks:
    - definitions
    - incident
    - law
    - schedule
signatures:
  computationUuid: "515a9621-84a5-80ee-9202-5944d0c15e01"
  stages:
    - stage: path
      stageUuid: "d55c90b4-fb45-83c2-a2fe-d79b2b9ac8a0"
    - stage: trinity
      stageUuid: "006dd836-a4df-8f8a-ae85-a3d4cc3b8250"
    - stage: boundary
      stageUuid: "20e8b9c3-5bee-8e18-af28-01b310d6ad2e"
    - stage: links
      stageUuid: "b1414759-7bc6-8db7-90fa-82317b78ed54"
    - stage: horo
      stageUuid: "12305c4e-84e0-85f3-b8d3-ca14c2162ee1"
    - stage: seal
      stageUuid: "ff337fb2-b1c9-82b2-af21-a7e6618144f8"
    - stage: uuid
      stageUuid: "4ed9e3fe-58c5-81cb-8e35-a39b0866880e"
version: 2
---
# runbook

Use when documenting step-by-step standard operating procedures — incident response, system failover, deployment checklist, maintenance sequence. The executable playbook.

Composes: [[workflow/definitions]] · [[schedule]].

## Standards
- ITIL (runbook/playbook)
- COBIT operational procedures

**Law — [[law]]: a runbook is an ordered, executable playbook of standard operating steps (incident response, failover, deployment, maintenance) — the procedure made repeatable so any operator runs it the same way.**
