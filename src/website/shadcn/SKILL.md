---
name: shadcn
description: "Use when reasoning about shadcn — The website is the e2e walkthroughs rendered, and a walkthrough is not prose: it is steps, states, evidence and gaps."
atomPath: "website/shadcn"
coordinate: "website/shadcn · 4/weave · 7d8cd5c3"
contentUuid: "8b62593f-3153-5c00-b4a6-ae9667322f4e"
diamondUuid: "80c68591-6bf0-8042-a55c-3de3ed9dc30d"
uuid: "7d8cd5c3-64ae-82c8-975d-17b403c35298"
horo: 4
typography:
  partition: website
  bondDegree: 9
standards:
  - W3C Open Graph + Schema.org (carried by surrounding pages)
  - "W3C WAI-ARIA 1.2 + WCAG 2.2 AA"
  - "shadcn/ui (Radix UI + Tailwind CSS)"
bindings: []
signatures:
  computationUuid: "c8908cc2-48ca-8362-8c55-25cbef83106b"
  stages:
    - stage: path
      stageUuid: "dcf95c29-550e-8f95-9209-2a9a24bc8e46"
    - stage: trinity
      stageUuid: "9a705c12-5bdd-8e31-a66d-ca11aab18d9a"
    - stage: boundary
      stageUuid: "fe975182-825e-826a-bcdd-d293621826b5"
    - stage: links
      stageUuid: "9d39f5eb-84c0-8655-9156-443fc9f9c64b"
    - stage: horo
      stageUuid: "044be4b4-2fcc-8ee7-8ce7-07f97c72416c"
    - stage: seal
      stageUuid: "0a7dd252-4ab6-8f7a-aa9b-f84cfc8aa2cd"
    - stage: uuid
      stageUuid: "3fbf0953-56e6-851d-a140-2abe5d100385"
version: 2
---
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
