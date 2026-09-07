---
name: number
description: "Use when reasoning about number — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/number"
coordinate: "blocks/form/number · 5/round · 5c1eae31"
contentUuid: "35c29c8c-31af-58e9-83f1-e5a907dd7173"
diamondUuid: "8dab0e26-0c50-8f48-91d9-ea6a2ee9f3b0"
uuid: "5c1eae31-7d50-8556-9b11-1251a8de3996"
horo: 5
typography:
  partition: blocks
  bondDegree: 226
standards: []
bindings: []
signatures:
  computationUuid: "d0c1319e-3b0c-8f6a-8ae6-877e3c8b8dae"
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
      stageUuid: "ce6a5d3c-208d-8712-97b2-a62a00a68260"
    - stage: seal
      stageUuid: "bf02deea-a937-8951-a682-0d80e5ff5de8"
    - stage: uuid
      stageUuid: "28f3b5fa-4537-8d41-b8ea-3f000be90e1b"
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
