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
