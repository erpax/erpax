---
name: design
description: "Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form."
---

# design

Use when defining the visual and interaction form of an experience — wireframes, prototypes, design reviews, design systems, accessibility, user research insights applied to form.

Composes: [[component]] · [[theme]] · [[accessibility]] · [[research]] · [[standard]] · [[pixel]] · [[color]].

The design **system** is computed, not curated: every UI colour is some [[atom]]'s [[pixel]] — its content-[[uuid]] rendered (digit → A432 [[color]]). `token(uuid)` returns that atom's pixel colour, `palette(uuids)` the deduped colour set, `tokens({role: uuid})` the named role map. Matter-twin: `src/design/index.ts`.

## Standards
- design-thinking process
- WCAG accessibility
- usability heuristics

**Law — [[law]]: the design system holds no colour of its own — every token, palette entry and semantic role is read off an atom's [[pixel]] (`token(uuid) = pixel(uuid).color`), so not one hardcoded hex exists in it; to recolour a token is to recontent its atom (and change its identity), and the system can never drift from the corpus it renders.**

@audit every token/palette/role colour computed via pixel(uuid); zero hardcoded hex in the design system
@standard the analog aura — colour as a projection of one content-uuid (digit → A432 spectrum)
