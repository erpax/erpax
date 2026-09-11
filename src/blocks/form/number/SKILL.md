---
name: number
description: "Use when reasoning about number — A and an are bound by a string that appears twice. Change one side and nothing moves on screen: the field still renders, still accepts input, still submits."
atomPath: "blocks/form/number"
coordinate: "blocks/form/number · 7/descent · 4ca3036d"
contentUuid: "1e4a78c9-6994-54ed-b444-004f5461393b"
diamondUuid: "b687c46d-55eb-83bd-a590-c5434a0371d9"
uuid: "4ca3036d-f447-8605-b94e-ff52f68dd458"
horo: 7
typography:
  partition: blocks
  bondDegree: 226
standards: []
bindings: []
signatures:
  computationUuid: "994f3895-7171-8a60-9208-11b82042800f"
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
      stageUuid: "f3dfb7a4-1903-89a1-886f-f0778c1e356c"
    - stage: seal
      stageUuid: "bf02deea-a937-8951-a682-0d80e5ff5de8"
    - stage: uuid
      stageUuid: "c2dca60a-ed8f-87c2-99d1-af785a0a5e18"
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
