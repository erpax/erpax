# website/shadcn — which widgets a site surface actually needs, declared once

The website is the e2e walkthroughs rendered, and a walkthrough is not prose: it is steps, states,
evidence and gaps. That needs a **widget vocabulary**, and a surface that reaches for a component
nobody installed renders blank at the one moment a reader is looking.

`SHADCN_SURFACE_MAP` declares, per `SiteSurface`, the component set that surface composes from.
`shadcnSurfaceFor` resolves one; `allRequiredShadcnComponents()` is the deduped union — the
install list, computed rather than maintained beside the map.

**Why it is DECLARED.** Which widgets a walkthrough page needs is a design judgement about what a
reader must see, not a fact derivable from the corpus. It is written in the open so it can be
argued with, the same seam [[rules]]/audience and [[proof]]/replaceable draw.

**Honest boundary.** This proves the *union* is consistent with the *map* — never that a surface's
set is sufficient, and never that the components are installed. A page that renders a component
outside its surface's set is invisible here.

It was nested from a barrel sibling `shadcn-components.ts`: a hyphenated matter file at an atom root
trips three axes at once (`stray-ts` · `multi-segment-file` · `alphanumeric-name`), and the lawful
form is the child atom it already was ([[rules]]/concentration · [[rules]]/hyphen).

Composes: [[website]] · [[rules]]/hyphen.
