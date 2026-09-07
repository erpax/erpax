---
name: email
description: "Use when reasoning about email — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/email"
coordinate: "blocks/form/email · 4/weave · 119b3255"
contentUuid: "15d22314-a594-5960-9f18-7973f695ddf3"
diamondUuid: "289b557d-9665-86ff-b346-eb7ee2a9f1c8"
uuid: "119b3255-72de-8fb1-89df-2a22fa936d89"
horo: 4
typography:
  partition: blocks
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "1aa6cc5f-9a96-8c36-a032-99bd670433af"
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
      stageUuid: "63e8c583-64be-80b0-9239-42f2ab16532d"
    - stage: seal
      stageUuid: "a3d9d98c-47fe-8542-889d-f61e3ce3dea1"
    - stage: uuid
      stageUuid: "3aabe09a-1165-89c1-8ab3-edf9dc7c53ef"
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
