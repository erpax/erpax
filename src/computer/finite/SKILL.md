---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking seal guardians to automata theory under computer."
atomPath: "computer/finite"
coordinate: "computer/finite · 5/round · a074749d"
contentUuid: "67889b07-3f48-50a7-8afc-446741ed39b5"
diamondUuid: "c3b258cb-e2b6-82f0-b041-b93450ee4ee0"
uuid: "a074749d-10fe-8ff1-ac8d-5f35a86de1b9"
horo: 5
typography:
  partition: computer
  bondDegree: 11
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "029a8e4e-c90b-8472-8f6c-aaf9cfe032b5"
  stages:
    - stage: path
      stageUuid: "cedfbeda-5183-8114-a719-2b79812c47de"
    - stage: trinity
      stageUuid: "922e793d-76a8-85f4-b67e-d87b8e247514"
    - stage: boundary
      stageUuid: "0c201240-443b-84be-9fe7-3cddb17a05f6"
    - stage: links
      stageUuid: "4c13ba0c-eb17-86ab-8238-59d141dad66a"
    - stage: horo
      stageUuid: "bc90a700-9e20-8bcc-ace4-a6562ec62ec0"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "116f7b23-3863-8eda-bc49-8ff0e7af7620"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
