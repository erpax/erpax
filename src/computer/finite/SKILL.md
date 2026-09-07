---
name: finite
description: "Use when modeling finite-state machines — seal check FSM linking seal guardians to automata theory under computer."
atomPath: "computer/finite"
coordinate: "computer/finite · 2/share · b8070ada"
contentUuid: "a76a776a-6f9b-5b81-9c29-c8feebb37106"
diamondUuid: "7be4b886-a19f-8935-ba9b-fdc42e674ab3"
uuid: "b8070ada-4092-88ef-b58a-5c4892e070a2"
horo: 2
typography:
  partition: computer
  bondDegree: 11
standards:
  - "finite-state machine (deterministic transitions)"
bindings: []
signatures:
  computationUuid: "03557654-cd2a-8991-a8c7-00fc2dec32e1"
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
      stageUuid: "c595feae-b029-8a37-b058-0e906e22bae5"
    - stage: seal
      stageUuid: "914679fb-d19a-8c77-81dd-4ca7dda4eb5a"
    - stage: uuid
      stageUuid: "47f43413-2329-8a8e-b18a-41c4d6289804"
version: 2
---
# computer/finite — finite-state automata

`FiniteAutomaton` · `accepts` · `SEAL_CHECK_FSM` — guardian-shaped FSM (unsealed → checking → sealed). Links vocabulary [[finite]] to executable automata.

**Law — [[law]]: computer/finite is an accepting automaton — states and transitions, not glossary prose.**

@standard finite-state machine (deterministic transitions)
