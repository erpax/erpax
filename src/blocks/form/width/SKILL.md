# blocks/form/width — a field's width is a share of the form, and absent is not zero

One div, one style. `width={50}` means *half the form*, not fifty pixels — the value is a
**percentage**, because a form field's width is meaningful only relative to the form it sits in, and
a pixel width breaks the moment the container changes.

The interesting case is the missing one. `width` is optional, and the wrong reading of an absent
value is `0%` — a field rendered invisible with no error anywhere. So absent must produce **no
constraint at all**, and that is what the proof beside this pins: `maxWidth` is simply not set.

**Honest boundary.** This proves the style attribute carries the percentage and that an absent width
constrains nothing. It says nothing about whether the resulting layout is *good*, and nothing about
how the browser resolves a percentage inside a flex or grid parent.

**Law — [[law]]: an optional dimension defaults to unconstrained, never to zero. A field with no
width fills its container; a field with `width={0}` would vanish, and the difference between those
two readings is a form nobody can fill in.**

## Standards

- **CSS Box Model Level 3** — `max-width` as a percentage of the containing block.

Composes: [[blocks]] · [[law]].
