---
name: text
description: "Use when reasoning about text — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/text"
coordinate: "blocks/form/text · 2/share · 0cadb8b2"
contentUuid: "730ce7f6-62a0-5b9c-9ce1-98d766d4af80"
diamondUuid: "38404be8-b713-851d-b34b-7f258382fbe4"
uuid: "0cadb8b2-f88a-8414-aa25-d2f89a190f37"
horo: 2
typography:
  partition: blocks
  bondDegree: 69
standards: []
bindings: []
signatures:
  computationUuid: "a81161fa-ef4f-849c-a544-25780aabcceb"
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
      stageUuid: "9af5acc6-5ef3-8a3c-a6c2-da349b1a5bd9"
    - stage: seal
      stageUuid: "9cee9f4d-d847-8e7f-905a-32849119bd60"
    - stage: uuid
      stageUuid: "5af92da6-34ba-8310-be9a-1f9d52465ec7"
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
