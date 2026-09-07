---
name: text
description: "Use when reasoning about text — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/text"
coordinate: "blocks/form/text · 7/descent · 16b870d1"
contentUuid: "3d88700c-a4d3-5044-ac29-07d853e4e7a0"
diamondUuid: "6247c250-70c3-8efc-ac02-0c8d3f4efbdf"
uuid: "16b870d1-16d8-8840-8880-ed1ac3586b72"
horo: 7
typography:
  partition: blocks
  bondDegree: 69
standards: []
bindings: []
signatures:
  computationUuid: "0696a3f2-67a4-8e0a-814e-d317665e6175"
  stages:
    - stage: path
      stageUuid: "c36d565a-7ed1-8dff-8649-84a6b4d0bb98"
    - stage: trinity
      stageUuid: "532d58d2-0a8b-8851-9e45-adbe3d8c855c"
    - stage: boundary
      stageUuid: "9c04da31-c569-8122-8583-18d037a00594"
    - stage: links
      stageUuid: "7d19830c-83b0-8005-8ff1-4b0055b52d24"
    - stage: horo
      stageUuid: "4c294919-0ffd-87f2-9d8c-92969d516c49"
    - stage: seal
      stageUuid: "9cee9f4d-d847-8e7f-905a-32849119bd60"
    - stage: uuid
      stageUuid: "4d46cca2-eff8-8e21-aff3-cfccc7ef6703"
version: 2
---
# blocks/form/text — the label names the control, or the control has no name

A `<label htmlFor="x">` and an `<input id="x">` are bound by a string that appears twice. Change
one side and nothing moves on screen: the field still renders, still accepts input, still submits.
What disappears is the **accessible name** — and with it, every screen reader's only way to say what
the field is for. That is WCAG 2.2 §1.3.1 (info and relationships) and §4.1.2 (name, role, value),
and it is invisible to a human looking at the page.

So the binding is what the proof beside this asserts: render the field, ask for the control **by its
label**, and get it. A broken `htmlFor`/`id` pair fails immediately.

**Law — [[law]]: a form control is named by its label or it is not named at all. The `for`/`id` pair is a string written twice, and breaking it changes nothing a sighted user can see — so the proof asks for the control by its label, never by its id.**

**Honest boundary.** This proves the control is reachable by its accessible name and carries the
right input type. It does not prove the browser's own validation for that type is sufficient — an
`input type="email"` accepts `a@b`, and server-side validation remains the authority ([[rules]]).
It proves the field is *nameable*, never that the form as a whole is usable.

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: the label/control pair is programmatically determinable.
- **WCAG 2.2 §4.1.2** — name, role, value.
- **WHATWG HTML** — the `for`/`id` association.

Composes: [[blocks]] · [[ui]] · [[law]].
