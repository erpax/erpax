---
name: checkbox
description: "Use when reasoning about checkbox — 's returns an and expects a **native** input to fire it. The shadcn checkbox is a Radix button with — it fires , and the native event never happens."
atomPath: "blocks/form/checkbox"
coordinate: "blocks/form/checkbox · 8/crest · d2bda10d"
contentUuid: "31c6cef1-2808-50e7-a0ba-e3b1174edab8"
diamondUuid: "9d1aa250-d0a7-8b41-9139-ec73598b0e44"
uuid: "d2bda10d-169b-84e2-80e3-ce1a622ae21e"
horo: 8
typography:
  partition: blocks
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "99458967-3b8f-83c3-b69b-c4ee25393b5e"
  stages:
    - stage: path
      stageUuid: "83e27cf2-abde-8c3e-9bec-6b650b6565bf"
    - stage: trinity
      stageUuid: "c0170c27-7f64-8333-8af3-174426537751"
    - stage: boundary
      stageUuid: "40320182-35ad-8969-bd5b-ce2a195e86bf"
    - stage: links
      stageUuid: "25562ceb-6425-8677-90ae-493904b44a66"
    - stage: horo
      stageUuid: "7bb1e69d-ea32-8047-95e8-fd5a4e10cc64"
    - stage: seal
      stageUuid: "c55af822-7101-8c63-93d2-774aaf73671c"
    - stage: uuid
      stageUuid: "3684e8e6-b869-82b6-ab85-e9f2571dfe79"
version: 2
---
# blocks/form/checkbox — the styled control is not an input, so the value must be written by hand

`react-hook-form`'s `register(name)` returns an `onChange` and expects a **native** input to fire it.
The shadcn checkbox is a Radix button with `role="checkbox"` — it fires `onCheckedChange`, and the
native event never happens. So `register` alone produces a field that looks checked, announces
itself as checked, and **submits nothing**.

That is why `setValue(props.name, checked)` is here. It is not belt-and-braces; it is the only path
by which the value reaches the form, and removing it breaks submission while changing nothing on
screen or in the accessibility tree.

The label binding is the ordinary one — `htmlFor={name}` against `id={name}` — and it matters more
here than for a text input, because a checkbox has no visible content of its own: without the label
association the control's accessible name is *empty*.

**Honest boundary.** The proof beside this asserts the control is reachable by its label, carries the
checkbox role, and that toggling it calls `setValue` with the new state. It does not run
`react-hook-form` for real, so it proves the wiring exists, never that a full form submit carries the
value — that is an integration property, and it is named rather than claimed.

**Law — [[law]]: a styled control that is not a native input does not register itself. Where the
platform event never fires, the value must be written to the form explicitly — and the failure is
silent, because the control still looks and announces exactly right.**

## Standards

- **WCAG 2.2 §1.3.1 · §4.1.2** — the label/control association and the control's name, role, value.
- **WAI-ARIA 1.2** — `role="checkbox"` and its checked state.

Composes: [[blocks]] · [[ui]] · [[law]].
