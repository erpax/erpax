---
name: text
description: "Use when reasoning about text — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/text"
coordinate: "blocks/form/text · 2/share · c25061d8"
contentUuid: "243b9e5e-1e3b-5ff1-8500-15aac5cfa149"
diamondUuid: "89045fae-14f5-8df6-9012-770be4211017"
uuid: "c25061d8-e1e0-838b-bb00-2836eca451ed"
horo: 2
typography:
  partition: blocks
  bondDegree: 69
standards: []
bindings: []
signatures:
  computationUuid: "ecc328ef-de15-818e-80b5-bcaa57fbd398"
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
      stageUuid: "99aec267-caf1-8138-9e27-e7d7d7386dd7"
    - stage: seal
      stageUuid: "9cee9f4d-d847-8e7f-905a-32849119bd60"
    - stage: uuid
      stageUuid: "4894c14a-0ad7-8e5d-bc36-49cf06993b7b"
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
