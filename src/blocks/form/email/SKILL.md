---
name: email
description: "Use when reasoning about email — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/email"
coordinate: "blocks/form/email · 1/base · 2cbe83f2"
contentUuid: "cb09667e-07fc-5cf7-98f7-98f34a5ef12f"
diamondUuid: "29c30ec6-5147-87be-ba3c-144c24e82dbe"
uuid: "2cbe83f2-c89e-8318-be74-09d135b4cf82"
horo: 1
typography:
  partition: blocks
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "1e3b7845-f5fd-8d7d-b40d-d281329c6a43"
  stages:
    - stage: path
      stageUuid: "d55a01c8-60f3-8b93-8ea3-1a312429dd6d"
    - stage: trinity
      stageUuid: "ed8698b5-9296-8c61-840a-5ddb2902e8f6"
    - stage: boundary
      stageUuid: "7e18d343-a58b-88f6-a62a-5a65f7eae939"
    - stage: links
      stageUuid: "46a87902-4624-8780-b0a7-bb567e7b247f"
    - stage: horo
      stageUuid: "0d055291-6626-8442-882c-23707ca0a268"
    - stage: seal
      stageUuid: "a3d9d98c-47fe-8542-889d-f61e3ce3dea1"
    - stage: uuid
      stageUuid: "474a24eb-f828-858f-8858-d8f6b9724306"
version: 2
---
# blocks/form/email — the label names the control, or the control has no name

A `<label htmlFor="x">` and an `<input id="x">` are bound by a string that appears twice. Change
one side and nothing moves on screen: the field still renders, still accepts input, still submits.
What disappears is the **accessible name** — and with it, every screen reader's only way to say what
the field is for. That is WCAG 2.2 §1.3.1 (info and relationships) and §4.1.2 (name, role, value),
and it is invisible to a human looking at the page.

So the binding is what the proof beside this asserts: render the field, ask for the control **by its
label**, and get it. A broken `htmlFor`/`id` pair fails immediately.

**Law — [[law]]: a form control is named by its label or it is not named at all — and a type is a claim about what the field accepts, so it is asserted, not assumed.**

**Honest boundary.** This proves the control is reachable by its accessible name and carries the
right input type. It does not prove the browser's own validation for that type is sufficient — an
`input type="email"` accepts `a@b`, and server-side validation remains the authority ([[rules]]).
It proves the field is *nameable*, never that the form as a whole is usable.

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: the label/control pair is programmatically determinable.
- **WCAG 2.2 §4.1.2** — name, role, value.
- **WHATWG HTML** — the `for`/`id` association.

Composes: [[blocks]] · [[ui]] · [[law]].
