---
name: state
description: "Use when reasoning about state — The control is the ordinary Radix combobox (blocks/form/select), named only by its bound label."
atomPath: "blocks/form/state"
coordinate: "blocks/form/state · 4/weave · a9cc326f"
contentUuid: "79169003-86b0-5ffc-9a3d-3a6142bc2de2"
diamondUuid: "40ccbc9d-96f9-8c43-9b05-c1aad3e075e4"
uuid: "a9cc326f-812a-86e8-a85f-ea5580c1c24e"
horo: 4
typography:
  partition: blocks
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "9b8eac66-27d2-803b-8d7c-000df50823f9"
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
      stageUuid: "f69c1933-d1f5-8107-9fbd-4bebb58ac1a1"
    - stage: seal
      stageUuid: "b11527bb-18b8-825a-b77d-ac46533251ce"
    - stage: uuid
      stageUuid: "cf57f84b-7ccf-8ac6-b874-03e81694fbfe"
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
