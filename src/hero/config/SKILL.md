---
name: config
description: "Use when reasoning about config — The Payload field configuration for a page hero: , , , ."
atomPath: "hero/config"
coordinate: "hero/config · 3/3 · 7ff81974"
contentUuid: "3a2e560f-fa6d-5fec-98af-f2dd3f8de4e9"
diamondUuid: "f9dd509a-1cac-8f04-9d8c-cd4688f7ca36"
uuid: "7ff81974-8142-8ceb-b43b-4e71cf139673"
horo: 3
typography:
  partition: hero
  bondDegree: 161
standards:
  - "W3C HTML5 section-element"
  - "W3C-HTML5"
  - "WAI-ARIA 1.2 region-landmark-role"
  - "WCAG-2.1 §1.4.3 contrast-minimum hero-overlay"
  - "WCAG-2.1 §2.4.6 headings-and-labels"
  - schema.org WebPageElement
bindings: []
signatures:
  computationUuid: "e66967ed-8fd0-8572-aa5c-dffcc5ee1978"
  stages:
    - stage: path
      stageUuid: "5f0415da-fd92-849a-90a9-cde6ad6baf84"
    - stage: trinity
      stageUuid: "7d58a6a9-ae81-81f6-9d01-0839121613c7"
    - stage: boundary
      stageUuid: "f91a713b-79bb-8308-86f2-8d3e074d2661"
    - stage: links
      stageUuid: "3aac8b1b-021a-8f11-9dfc-d98678a20f19"
    - stage: horo
      stageUuid: "e77917f9-be9a-8bae-84a4-c0d474e24848"
    - stage: seal
      stageUuid: "48a7e885-d588-8db1-89be-31aab26b78e4"
    - stage: uuid
      stageUuid: "251a2f89-d40d-80f2-93e0-9bd8fc888405"
version: 2
---
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
