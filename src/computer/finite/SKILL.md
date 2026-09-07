---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking [[seal]] guardians to automata theory under [[computer]]."
atomPath: "computer/finite"
coordinate: "computer/finite · 5/round · 972e3b83"
contentUuid: "d19588b1-c7c4-519a-822a-8eeb84058fcf"
diamondUuid: "c444119f-6aea-8a10-8191-4b54bba6d300"
uuid: "972e3b83-bf9e-8621-b681-738d4202b1fc"
horo: 5
typography:
  partition: computer
  bondDegree: 15
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "db7bf199-0480-8bd4-a811-364c0657f00f"
  stages:
    - stage: path
      stageUuid: "cedfbeda-5183-8114-a719-2b79812c47de"
    - stage: trinity
      stageUuid: "922e793d-76a8-85f4-b67e-d87b8e247514"
    - stage: boundary
      stageUuid: "0c201240-443b-84be-9fe7-3cddb17a05f6"
    - stage: links
      stageUuid: "5dd7884d-b9a5-80e1-9909-a836de4644b9"
    - stage: horo
      stageUuid: "fa3efc02-f301-8284-b24d-df55ee48c65f"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "1a93ff81-2f2b-8471-a456-ed9ad4f309a6"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
