---
name: state
description: "Use when reasoning about state — The control is the ordinary Radix combobox (blocks/form/select), named only by its bound label."
atomPath: "blocks/form/state"
coordinate: "blocks/form/state · 1/base · f1984987"
contentUuid: "09e7d097-a8e5-510b-8590-5475798afb49"
diamondUuid: "d36acda9-5bb4-88af-8ccd-c55bf0ab6e68"
uuid: "f1984987-f186-8e36-87e1-aad449151ef2"
horo: 1
typography:
  partition: blocks
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "9972edcf-6fb5-84e0-989a-5c85838c542f"
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
      stageUuid: "3b0af080-7058-869c-8d8a-73cc83a94f7f"
    - stage: seal
      stageUuid: "b11527bb-18b8-825a-b77d-ac46533251ce"
    - stage: uuid
      stageUuid: "072e7bc8-6d5f-8057-b244-12e7e1ae785d"
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
