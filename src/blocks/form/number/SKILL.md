---
name: number
description: "Use when reasoning about number — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/number"
coordinate: "blocks/form/number · 1/base · 2cb5fbbe"
contentUuid: "bdefa10f-a777-5f18-9395-e86038106c2c"
diamondUuid: "73069abd-b04e-86c9-ab4f-8de0b1396ca9"
uuid: "2cb5fbbe-8f08-89b8-82c8-ce0e40c19182"
horo: 1
typography:
  partition: blocks
  bondDegree: 226
standards: []
bindings: []
signatures:
  computationUuid: "2c100c86-7bda-89b0-b725-3142f5c69aa0"
  stages:
    - stage: path
      stageUuid: "948ab81e-37a6-8c3b-9b82-1f5f46446f5f"
    - stage: trinity
      stageUuid: "b74d736b-6fe2-8a27-8e3d-f683442035fd"
    - stage: boundary
      stageUuid: "2bc3dd4c-948e-8ffc-aae7-80996f4ca380"
    - stage: links
      stageUuid: "e51eefcf-b51f-8498-ac46-2573a4b4ee1e"
    - stage: horo
      stageUuid: "b742ebf2-e891-85da-bc79-47c96c00e1dc"
    - stage: seal
      stageUuid: "bf02deea-a937-8951-a682-0d80e5ff5de8"
    - stage: uuid
      stageUuid: "45365939-80b9-8cfd-b2f1-fc9ccb9e618a"
version: 2
---
# blocks/form/number — the label names the control, or the control has no name

A `<label htmlFor="x">` and an `<input id="x">` are bound by a string that appears twice. Change
one side and nothing moves on screen: the field still renders, still accepts input, still submits.
What disappears is the **accessible name** — and with it, every screen reader's only way to say what
the field is for. That is WCAG 2.2 §1.3.1 (info and relationships) and §4.1.2 (name, role, value),
and it is invisible to a human looking at the page.

So the binding is what the proof beside this asserts: render the field, ask for the control **by its
label**, and get it. A broken `htmlFor`/`id` pair fails immediately.

**Law — [[law]]: a form control is named by its label or it is not named at all. A numeric field declares its type so the platform can offer the right keyboard and the right validation.**

**Honest boundary.** This proves the control is reachable by its accessible name and carries the
right input type. It does not prove the browser's own validation for that type is sufficient — an
`input type="email"` accepts `a@b`, and server-side validation remains the authority ([[rules]]).
It proves the field is *nameable*, never that the form as a whole is usable.

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: the label/control pair is programmatically determinable.
- **WCAG 2.2 §4.1.2** — name, role, value.
- **WHATWG HTML** — the `for`/`id` association.

Composes: [[blocks]] · [[ui]] · [[law]].
