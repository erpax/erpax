---
name: textarea
description: "Use when reasoning about textarea — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/textarea"
coordinate: "blocks/form/textarea · 4/weave · 74c4a780"
contentUuid: "c096b900-183f-564f-8985-26565edbbea2"
diamondUuid: "90f7550e-1d8a-8101-a866-068d175cbdd9"
uuid: "74c4a780-c853-860e-89dd-abed5cfe329a"
horo: 4
typography:
  partition: blocks
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "a1d6b9b2-0748-83c8-9e33-d24b56f0a6d8"
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
      stageUuid: "8e5c5d37-9d90-8cf7-8c67-3a50186e1f96"
    - stage: seal
      stageUuid: "23256ea3-742d-881f-83ae-c54718a7d103"
    - stage: uuid
      stageUuid: "493d0593-34de-860b-b05b-5731fcfe96d7"
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
