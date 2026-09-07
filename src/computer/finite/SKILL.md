---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking seal guardians to automata theory under computer."
atomPath: "computer/finite"
coordinate: "computer/finite · 8/crest · e027b4b1"
contentUuid: "802c7bd2-6364-5ce4-a981-47445b3b82cc"
diamondUuid: "6ceb32c3-8edb-8177-8d30-13126ace9b11"
uuid: "e027b4b1-f300-85f7-8b00-edce8e13065d"
horo: 8
typography:
  partition: computer
  bondDegree: 11
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "5b65fd4d-fd6e-8019-8943-bdcc20758c0f"
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
      stageUuid: "d492fd2f-5fca-8be8-8c4c-71fcece35018"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "6e9d17f7-4c1c-804a-9c28-85866e761307"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
