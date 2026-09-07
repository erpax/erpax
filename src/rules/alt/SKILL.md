---
name: alt
description: "Use when reasoning about alt — **WCAG 2.2 is the largest block of undischarged conformance in this corpus** — 29 atoms cite it and nothing gates any criterion (proof/replaceable)."
atomPath: "rules/alt"
coordinate: "rules/alt · 7/descent · e9216d86"
contentUuid: "afb72819-d5a1-5c61-8d92-154160f43005"
diamondUuid: "fc48e606-9561-846a-a5f8-906800ccd0d4"
uuid: "e9216d86-717c-8b61-a090-0cc3e10bcccf"
horo: 7
typography:
  partition: rules
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "cb60d4c6-e610-80d4-bd3a-8a3de21f3262"
  stages:
    - stage: path
      stageUuid: "917fd325-022a-857c-bdf9-7429e21c777f"
    - stage: trinity
      stageUuid: "06d734f0-f009-8888-9d4c-3ff35a1f15eb"
    - stage: boundary
      stageUuid: "f4aa785f-930d-8ed7-8e2a-c379829dc3a5"
    - stage: links
      stageUuid: "5fec0a7b-c586-8d04-88bf-0ee9b42d1972"
    - stage: horo
      stageUuid: "152073bc-bee5-8bd1-b1be-27d013bacbb4"
    - stage: seal
      stageUuid: "6b29f18c-bb34-8fc1-bb02-e51587c3d3fa"
    - stage: uuid
      stageUuid: "cc61e0f4-349e-863c-bb65-0022c3a7d83e"
version: 2
---
# rules/alt — WCAG 2.2 §1.1.1, and the empty alt that declares an image decorative

**WCAG 2.2 is the largest block of undischarged conformance in this corpus** — 29 atoms cite it and nothing gates any criterion ([[proof]]/replaceable). You cannot discharge a 50-criterion standard; you discharge one criterion. This is §1.1.1, Non-text Content, Level A.

## The half that is invisible at every call site

`alt=""` is **valid WCAG**. It declares an image **decorative**, and a screen reader skips it entirely. So this:

```ts
alt = altFromResource || ''
```

turns *"the author left the CMS field blank"* into *"this image carries no information"* — silently, for every image in the collection. Conformance is asserted, the failure is unobservable, and no call site shows it. That is [[rules]]/unraised's default-ALLOW-by-omission living in the accessibility layer, and there are **2** of them, both in the image component every CMS image renders through.

| | count (2026-09-05) |
| --- | ---: |
| non-text elements with no accessible name at the call site | 8 |
| **accessible names defaulted to the empty string** | **2** |

## A raw-JSX reader would have reported near-perfect conformance

`<img>` appears **once** in 256 `.tsx` files, and `<svg>` once. The corpus renders through `next/image` and its own `Media` · `ImageMedia` · `Logo` components, so a gate reading only raw HTML elements finds 1 of a population of 8 and reports green over the rest — [[rules]]/domain, in the gate written to close a standard.

`NON_TEXT` is therefore **declared**: it is a fact about this codebase's component vocabulary and no theorem derives it. A component added tomorrow is invisible until it is named here, and that is the standing cost of the approach.

## Parsed, because a regex flags a page title

`title: \`Posts ${pageNumber || ''}\`` matches every pattern for "an empty-string fallback" and is a **page title**, not an accessible name. The check reads the grammar: a `||` or `??` whose right side is an empty string literal, assigned to `alt` or `ariaLabel` or `aria-label`. The false positive is pinned in the test.

**Honest boundary.** This is **one criterion of one standard**. Discharging §1.1.1 does not discharge WCAG 2.2, and [[proof]]/replaceable will still count the standard as assumed — correctly, because 49 other criteria remain. `unnamedNonText` reports where a name is not visible **at the call site**, which is weaker than absent: five of the eight `<Media>` sites derive their alt inside the component, and those are candidates for a reader, not violations. A spread is trusted. And an alt that exists says nothing about whether it is a **good** alternative — that is a human judgement no gate makes.

**Law — [[law]]: non-text content carries a text alternative, or explicitly says it is decorative. An empty alt is a decision, never a fallback — defaulting to it converts a missing field into a silent claim that the image means nothing.**

## Standards

- **WCAG 2.2 §1.1.1** — Non-text Content, Level A.
- **ISO/IEC 25010:2023 §5.7** — accessibility.

Composes: [[rules]]/unraised · [[rules]]/domain · [[proof]]/replaceable · [[law]].
