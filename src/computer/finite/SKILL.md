---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking seal guardians to automata theory under computer."
atomPath: "computer/finite"
coordinate: "computer/finite · 1/base · c205875c"
contentUuid: "81de41a3-9411-5708-b65e-e07dbec41365"
diamondUuid: "02a07bdd-ad50-866c-824b-42702f47004b"
uuid: "c205875c-21b5-80c4-916a-1fbd277add07"
horo: 1
typography:
  partition: computer
  bondDegree: 11
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "c40019b0-8ed9-8334-a764-c69a9f4aa41f"
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
      stageUuid: "68c4ebf2-6bdc-8fab-9314-652f99f88a37"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "4e62c686-30ad-8322-8635-e376197879c1"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
