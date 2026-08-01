---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking [[seal]] guardians to automata theory under [[computer]]."
atomPath: "computer/finite"
coordinate: "computer/finite · 2/share · 629317af"
contentUuid: "b0c7bed9-46d5-5feb-b33b-e2b277c671af"
diamondUuid: "9fbc1481-66d3-811f-a53a-b15316f9b723"
uuid: "629317af-3984-8456-a0ac-587794ab1b96"
horo: 2
typography:
  partition: computer
  bondDegree: 15
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "6b73cd05-6511-8957-909d-94bade6e4115"
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
      stageUuid: "c8299294-7083-8e30-943b-805d7c4f56c8"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "f22b833f-b287-88e6-91e4-f8cc3a6cab4c"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
