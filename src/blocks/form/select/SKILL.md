---
name: select
description: "Use when reasoning about select — A native announces itself. This one does not: the shadcn control renders a , whose accessible name comes from **nothing but** the bound to the trigger's ."
atomPath: "blocks/form/select"
coordinate: "blocks/form/select · 2/share · a4a43548"
contentUuid: "a16eb280-120c-5ca6-9b2a-2ccafe88c332"
diamondUuid: "e027ac37-7223-8a1a-8646-238ce2d987c3"
uuid: "a4a43548-60e8-8704-8779-899c471153a7"
horo: 2
typography:
  partition: blocks
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "9e80e703-81d0-8ca2-b7ab-1e2727d328df"
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
      stageUuid: "92362ee6-8254-844d-98eb-5a6af0254a7d"
    - stage: seal
      stageUuid: "383b827b-062a-8a5e-8565-68e5f16aff0f"
    - stage: uuid
      stageUuid: "ca77e7e9-a4ce-8871-a28b-2ff537646909"
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
