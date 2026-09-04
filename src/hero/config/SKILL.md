# hero/config — four hero types, and `none` is one of them

The Payload field configuration for a page hero: `highImpact`, `mediumImpact`, `lowImpact`, `none`.

`none` earns its place. Without an explicit "no hero" value, an editor who wants a page to start
directly with content has to leave the field empty, and an empty field is indistinguishable from an
unfinished one — nobody can tell a deliberate choice from an oversight, and neither can
[[hero]]/render, which must then guess. Naming the absence makes it a decision.

The three impact levels are a **scale**, not a taxonomy: they differ in visual weight, not in kind,
which is why they share one field rather than being separate blocks.

**Honest boundary.** This is configuration — the shape of the field and the values it admits. What
each hero renders belongs to its own atom under `heros`, and the dispatch that turns a value into a
component belongs to [[hero]]/render, which independently handles values this config no longer
declares.

**Law — [[law]]: an option set names its own absence. An empty field means "not yet decided" and a
`none` value means "decided: nothing" — collapsing the two makes an editor's choice unreadable.**

## Standards

- **schema.org WebPageElement** — the hero as a page element.
- **WAI-ARIA 1.2** — the region landmark.
- **WCAG 2.2 §1.4.3 · §2.4.6** — contrast over the hero overlay; headings and labels.

Composes: [[hero]]/render · `heros` · [[law]].
