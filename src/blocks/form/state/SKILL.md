---
name: state
description: "Use when reasoning about state — The control is the ordinary Radix combobox (blocks/form/select), named only by its bound label."
atomPath: "blocks/form/state"
coordinate: "blocks/form/state · 8/crest · 5a63f486"
contentUuid: "d056e07e-588b-54da-88ce-f6f52ca6c9f5"
diamondUuid: "19074996-1b80-8f9a-a31e-ef8308053c54"
uuid: "5a63f486-6538-8630-b5be-52951913e873"
horo: 8
typography:
  partition: blocks
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "f431a3ec-2fb7-8747-938a-a586f55a521e"
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
      stageUuid: "1326f51d-87fa-8a7e-bff3-d79aa6bc586c"
    - stage: seal
      stageUuid: "b11527bb-18b8-825a-b77d-ac46533251ce"
    - stage: uuid
      stageUuid: "f10965c8-4d28-81e9-aa9e-21dc7888e3b3"
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
