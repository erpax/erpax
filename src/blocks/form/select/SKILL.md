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
