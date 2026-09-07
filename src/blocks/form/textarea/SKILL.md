---
name: textarea
description: "Use when reasoning about textarea — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/textarea"
coordinate: "blocks/form/textarea · 7/descent · 138cd586"
contentUuid: "8f8f7758-5cf3-5fd9-b41e-cfbd8d6dd661"
diamondUuid: "80f10da2-aa4d-8f88-9193-8a7ad9d1fdfa"
uuid: "138cd586-bec6-8d8a-95a8-f3e3af7e2c63"
horo: 7
typography:
  partition: blocks
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "70087206-2f5c-8944-a134-2400b7b28cca"
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
      stageUuid: "45e57766-3317-8c8c-90f6-37178eaea562"
    - stage: seal
      stageUuid: "23256ea3-742d-881f-83ae-c54718a7d103"
    - stage: uuid
      stageUuid: "4eda5b53-526c-8be1-8fa5-86e13c237c19"
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
