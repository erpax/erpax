---
name: textarea
description: "Use when reasoning about textarea — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/textarea"
coordinate: "blocks/form/textarea · 1/base · 92c37ab0"
contentUuid: "3a80cf2f-6c7b-571a-9b6c-2a94e4ba1626"
diamondUuid: "01e31eae-45f3-8d6b-8ab9-0feecfd39781"
uuid: "92c37ab0-b1b7-8bf2-914c-3f5739303e4a"
horo: 1
typography:
  partition: blocks
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "b16db401-3b22-8f07-9e0a-f19132e4744e"
  stages:
    - stage: path
      stageUuid: "5fa0b86f-f59a-84fa-bc4f-dcd9838ee6b0"
    - stage: trinity
      stageUuid: "47475f91-be20-8394-96f8-4b8424098ad9"
    - stage: boundary
      stageUuid: "8b56c03c-3345-8830-9f2b-ac54bda5750c"
    - stage: links
      stageUuid: "8da840eb-0a32-882d-8ea7-46bc6ae930fc"
    - stage: horo
      stageUuid: "03c6d3aa-8d94-8e95-a237-f1b749a80360"
    - stage: seal
      stageUuid: "23256ea3-742d-881f-83ae-c54718a7d103"
    - stage: uuid
      stageUuid: "35c5e128-9b96-849f-8766-7b12f6f527d1"
version: 2
---
# blocks/form/textarea — the label names the control, or the control has no name

A `<label htmlFor="x">` and an `<input id="x">` are bound by a string that appears twice. Change
one side and nothing moves on screen: the field still renders, still accepts input, still submits.
What disappears is the **accessible name** — and with it, every screen reader's only way to say what
the field is for. That is WCAG 2.2 §1.3.1 (info and relationships) and §4.1.2 (name, role, value),
and it is invisible to a human looking at the page.

So the binding is what the proof beside this asserts: render the field, ask for the control **by its
label**, and get it. A broken `htmlFor`/`id` pair fails immediately.

**Law — [[law]]: a form control is named by its label or it is not named at all — and a multi-line field is a `textarea`, never an input styled tall.**

**Honest boundary.** This proves the control is reachable by its accessible name and carries the
right input type. It does not prove the browser's own validation for that type is sufficient — an
`input type="email"` accepts `a@b`, and server-side validation remains the authority ([[rules]]).
It proves the field is *nameable*, never that the form as a whole is usable.

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: the label/control pair is programmatically determinable.
- **WCAG 2.2 §4.1.2** — name, role, value.
- **WHATWG HTML** — the `for`/`id` association.

Composes: [[blocks]] · [[ui]] · [[law]].
