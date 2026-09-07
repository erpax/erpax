---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking seal guardians to automata theory under computer."
atomPath: "computer/finite"
coordinate: "computer/finite · 5/round · 972e3b83"
contentUuid: "524087c2-d7fb-53c6-bc3c-03bfbedc82b5"
diamondUuid: "1da41b7f-2da6-8d6a-b56b-767bdb3827ee"
uuid: "972e3b83-bf9e-8621-b681-738d4202b1fc"
horo: 5
typography:
  partition: computer
  bondDegree: 15
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "755e50bc-7c1a-8e76-be6a-ead4dbb9ec45"
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
      stageUuid: "fa3efc02-f301-8284-b24d-df55ee48c65f"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "1635cc68-4297-8b2e-b1b2-719d2f72d805"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
