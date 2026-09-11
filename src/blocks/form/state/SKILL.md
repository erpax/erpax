---
name: state
description: "Use when reasoning about state — The control is the ordinary Radix combobox (blocks/form/select), named only by its bound label."
atomPath: "blocks/form/state"
coordinate: "blocks/form/state · 4/weave · 353c7e87"
contentUuid: "c9e6acbb-095d-53e5-853c-c4bc358cfc7c"
diamondUuid: "4a4762e9-4450-818b-ad33-d90a97dc3a3b"
uuid: "353c7e87-3891-8009-abcc-140ce040fdac"
horo: 4
typography:
  partition: blocks
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "e2031826-1410-8502-91f7-f5674ba046f8"
  stages:
    - stage: path
      stageUuid: "b0ba0211-77f5-84e4-8a8e-fd25c42b3dc1"
    - stage: trinity
      stageUuid: "ddbd4654-9a2f-8cf0-a89d-6830255beb39"
    - stage: boundary
      stageUuid: "28d7de71-94ef-8ac7-a515-99a592c27e22"
    - stage: links
      stageUuid: "5e49189d-6bb6-8304-9c44-05e0662648bb"
    - stage: horo
      stageUuid: "cd1b5853-9694-88ce-9f17-6cdda926184e"
    - stage: seal
      stageUuid: "b11527bb-18b8-825a-b77d-ac46533251ce"
    - stage: uuid
      stageUuid: "5cc31faf-3fdb-8eca-8296-0f8960f852e8"
version: 2
---
# blocks/form/state — 50 subdivision codes, and the two-letter shape they must keep

The control is the ordinary Radix combobox ([[blocks]]/form/select), named only by its bound label.
The substance is the list: the fifty US states, each carrying the two-letter code that ISO 3166-2:US
and USPS both use.

Fifty is a fact, and it is the interesting one. A list that has quietly lost an entry looks
completely normal — the dropdown opens, the states are there, and the missing one is simply a state
nobody in that state can select. Nothing errors. So the count is asserted, alongside the shape and
the uniqueness that make each entry usable downstream.

**Honest boundary.** Fifty states is this list's scope and the proof pins it. That deliberately
excludes DC, Puerto Rico and the other territories — a form needing them needs a different list, and
this SKILL says so rather than letting a caller discover it from a missing option. As with
[[blocks]]/form/country, the shape is checked and *assignment* is not: a well-formed `XX` would pass,
because the register is not carried here.

**Law — [[law]]: a fixed-size reference list asserts its size. A silently truncated list produces a
form that works perfectly for everyone except the people it dropped.**

## Standards

- **ISO 3166-2:US** — subdivision codes for the United States.
- **WCAG 2.2 §1.3.1 · §4.1.2** — label association; name, role, value.

Composes: [[blocks]]/form/select · [[law]].
