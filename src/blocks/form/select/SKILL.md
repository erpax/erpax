---
name: select
description: "Use when reasoning about select — A native announces itself. This one does not: the shadcn control renders a , whose accessible name comes from **nothing but** the bound to the trigger's ."
atomPath: "blocks/form/select"
coordinate: "blocks/form/select · 7/descent · 25fc545b"
contentUuid: "cce2f071-5d19-586d-a881-05f3e1ba60c9"
diamondUuid: "7158cc21-eb3c-8705-bb9b-d07f0a955a88"
uuid: "25fc545b-88f9-8182-b7d9-fa51c11f0f32"
horo: 7
typography:
  partition: blocks
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "c437a7c9-11a8-8fcc-abe1-6819ea78a7ba"
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
      stageUuid: "38d036e8-4b89-8b41-8541-787020b05278"
    - stage: seal
      stageUuid: "383b827b-062a-8a5e-8565-68e5f16aff0f"
    - stage: uuid
      stageUuid: "8f41a94e-3737-875c-80ab-401b858f16d0"
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
