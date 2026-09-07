---
name: country
description: "Use when reasoning about country — The control is the ordinary Radix combobox (blocks/form/select): a whose only accessible name is the bound to its ."
atomPath: "blocks/form/country"
coordinate: "blocks/form/country · 7/descent · 5d6c2523"
contentUuid: "20bf7c7f-31d2-537b-bb39-66ebf432660b"
diamondUuid: "edf2cb94-d09f-8c9d-a4e1-480aa95f86c1"
uuid: "5d6c2523-7ccc-8414-bb1d-994961ac1672"
horo: 7
typography:
  partition: blocks
  bondDegree: 84
standards: []
bindings: []
signatures:
  computationUuid: "438d989c-0c29-8d15-96e9-d195e467c349"
  stages:
    - stage: path
      stageUuid: "680ab7ac-1c6e-8428-96c0-a3e4c8dfa4ef"
    - stage: trinity
      stageUuid: "7ea31ab8-12e5-8cdd-ac27-7154e0aae768"
    - stage: boundary
      stageUuid: "b94c07e4-5a89-8330-9a2f-1736278230dc"
    - stage: links
      stageUuid: "ffc8b45a-5d34-8e5f-9747-0accb9d2afd4"
    - stage: horo
      stageUuid: "530fa273-177c-8b5d-b843-01a5fd0736e5"
    - stage: seal
      stageUuid: "0321e80d-9971-8b79-bbe7-acb550f72cb8"
    - stage: uuid
      stageUuid: "72587b3f-0505-83b5-a712-66728d1b5a89"
version: 2
---
# blocks/form/country — 245 codes that must each be a real ISO 3166-1 alpha-2

The control is the ordinary Radix combobox ([[blocks]]/form/select): a `<button role="combobox">`
whose only accessible name is the `<label htmlFor>` bound to its `id`. What makes this atom
different is that **it ships data**, and data is where a silent wrong answer lives.

A country code is not free text. ISO 3166-1 alpha-2 fixes the shape — exactly two uppercase letters
— and a duplicate or a three-letter entry produces a form that submits a value no downstream system
recognises. Nothing on screen reveals it: the label reads fine, the option selects, and the failure
surfaces days later in a shipping address or a VAT determination.

So the proof is about the list, not the widget: **245 entries, every code two uppercase letters,
every code unique, every entry labelled.** That is checkable, and it is the property the rest of the
system relies on.

**Honest boundary.** This proves each code has the ISO *shape* and that the list is internally
consistent. It does not prove each code is *assigned* — a well-formed `XX` would pass — because the
authority for that is the ISO register and no copy of it lives here. Nor is it a claim about
completeness: 245 is what this list holds, not a statement that the register holds 245.

**Law — [[law]]: shipped reference data is checked against the standard that defines its shape. A
malformed country code looks exactly like a valid one in the form and fails somewhere else entirely,
so the list is proven where it is written.**

## Standards

- **ISO 3166-1 alpha-2** — two-letter country codes.
- **WCAG 2.2 §1.3.1 · §4.1.2** — label association; name, role, value.

Composes: [[blocks]]/form/select · [[identity]] · [[law]].
