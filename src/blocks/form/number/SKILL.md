---
name: number
description: "Use when reasoning about number — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/number"
coordinate: "blocks/form/number · 7/descent · 4ca3036d"
contentUuid: "722fe231-57c0-5c44-9236-91d8858d5fdb"
diamondUuid: "36600002-5715-8674-991a-8ecf5a0a6d21"
uuid: "4ca3036d-f447-8605-b94e-ff52f68dd458"
horo: 7
typography:
  partition: blocks
  bondDegree: 65
standards: []
bindings: []
signatures:
  computationUuid: "c94e3b4d-1742-85bc-981d-ba6758ae6ccd"
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
      stageUuid: "c9780748-38cd-8ddc-9088-1cb229fb6fbc"
    - stage: seal
      stageUuid: "bf02deea-a937-8951-a682-0d80e5ff5de8"
    - stage: uuid
      stageUuid: "3d86a01d-6f4c-8baa-9575-0980829a1abe"
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
