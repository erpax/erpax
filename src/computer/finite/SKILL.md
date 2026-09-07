---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking seal guardians to automata theory under computer."
atomPath: "computer/finite"
coordinate: "computer/finite · 1/base · 46307f8e"
contentUuid: "be7d0112-eacc-5935-89d7-0a10e495c011"
diamondUuid: "e3268fa8-0f15-8173-9f6e-e341230ff8d0"
uuid: "46307f8e-ed5f-852c-800e-fc92a566278e"
horo: 1
typography:
  partition: computer
  bondDegree: 11
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "40e63237-a71a-8d76-a864-c1c6498d17cd"
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
      stageUuid: "3f3d197f-f9fc-87eb-97d5-5d4f92e92438"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "303300bd-29a2-8bdf-935b-0d2a947aa5c7"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
