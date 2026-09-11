---
name: textarea
description: "Use when reasoning about textarea — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/textarea"
coordinate: "blocks/form/textarea · 7/descent · 5543529e"
contentUuid: "be17a3a9-3256-5d9e-95fa-7c79b8042d8a"
diamondUuid: "da9f407b-7685-8657-aa64-9f86db3ba102"
uuid: "5543529e-24ed-8f9e-a31a-7119909df189"
horo: 7
typography:
  partition: blocks
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "0a695d8e-b571-83ad-8af0-c7e327cde7fe"
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
      stageUuid: "6d0b97f0-7f78-8532-8ee0-1fa3e81e54df"
    - stage: seal
      stageUuid: "23256ea3-742d-881f-83ae-c54718a7d103"
    - stage: uuid
      stageUuid: "a45a1dac-8cf3-8a81-b8f4-d079e8f297fb"
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
