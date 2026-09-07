---
name: select
description: "Use when reasoning about select — A native announces itself. This one does not: the shadcn control renders a , whose accessible name comes from **nothing but** the bound to the trigger's ."
atomPath: "blocks/form/select"
coordinate: "blocks/form/select · 7/descent · 2e9e6181"
contentUuid: "a84226a8-08ce-5bd6-a71b-19e35d9beb15"
diamondUuid: "fa81cf5d-9ed2-8870-80b2-a4cc23948f82"
uuid: "2e9e6181-5529-8f8f-a1a4-3b155558b58f"
horo: 7
typography:
  partition: blocks
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "686dbf89-de54-858c-a849-56aa90f66032"
  stages:
    - stage: path
      stageUuid: "43aa11a8-dfc5-8afd-b782-719df2a1d457"
    - stage: trinity
      stageUuid: "09a678ae-1cb7-875c-8a99-0243d381db2e"
    - stage: boundary
      stageUuid: "a4ba5c27-04dc-8c2e-990e-005d9daf89a2"
    - stage: links
      stageUuid: "ba0d930d-3377-88ed-bb67-444ef333f6a3"
    - stage: horo
      stageUuid: "64ac8b47-a811-827b-b1d7-b271a280a1fd"
    - stage: seal
      stageUuid: "383b827b-062a-8a5e-8565-68e5f16aff0f"
    - stage: uuid
      stageUuid: "6b28ef42-5695-8ac0-8150-d26bde07641a"
version: 2
---
# blocks/form/select — a Radix trigger is a button, so the label is the only name it has

A native `<select>` announces itself. This one does not: the shadcn control renders a
`<button role="combobox">`, whose accessible name comes from **nothing but** the `<label htmlFor>`
bound to the trigger's `id`. Break that pair and the control still opens, still selects, still
submits — and a screen reader announces an unnamed button.

The value is carried by a `Controller` rather than by `register`, for the same reason the checkbox
needs `setValue`: no native change event ever fires ([[blocks]]/form/checkbox).

A `Select` receives its options as a prop, so the list is the caller's claim, not this atom's.

**Honest boundary.** The proof asserts the trigger is reachable by its label and carries the combobox
role. Radix renders its option list in a portal on open, so the proof does not enumerate the rendered
options — it checks the source of truth the list is built from instead, which is the part that can
silently go wrong.

**Law — [[law]]: a control that is not a native form element inherits no name from the platform. The
label association is the whole of its accessible name, and breaking it is invisible everywhere except
to the people who depend on it.**

## Standards

- **WCAG 2.2 §1.3.1 · §4.1.2** — label association; name, role, value.
- **WAI-ARIA 1.2** — `role="combobox"`.

Composes: [[blocks]] · [[ui]] · [[law]].
