---
name: page
description: "Use when reasoning about page — A public tenant page is a hero followed by its layout blocks, inside an . That is the whole atom, and its value is that it exists **once**: the same composition served from the…"
atomPath: "render/tenant/page"
coordinate: "render/tenant/page · 2/share · c36ba14d"
contentUuid: "81faff7a-47a9-5207-87c2-ebf70af3c371"
diamondUuid: "9ed11f4e-5653-8557-8298-ebe39fc95835"
uuid: "c36ba14d-4a60-8d7f-82aa-cf09a0531438"
horo: 2
typography:
  partition: render
  bondDegree: 141
standards: []
bindings: []
signatures:
  computationUuid: "a0df05fa-2dcc-85a0-9ffa-69f08aa26f42"
  stages:
    - stage: path
      stageUuid: "32c98eb3-94b3-87b2-9a35-5d9f93f29ff9"
    - stage: trinity
      stageUuid: "88a22038-a0ae-85b3-8e9a-b51c6db1b695"
    - stage: boundary
      stageUuid: "b8366b9f-f5aa-8b7c-adf4-e518a9445c26"
    - stage: links
      stageUuid: "16314bbc-fc9e-8e6c-8843-6ca028d68404"
    - stage: horo
      stageUuid: "68841ebe-f422-82c4-8326-d0e0a3eb6547"
    - stage: seal
      stageUuid: "6fef39a2-e9c5-8195-b29c-157cb937f4c7"
    - stage: uuid
      stageUuid: "28d7b234-a1f6-88d7-9bfd-2038db9333e2"
version: 2
---
# render/tenant/page — one composition, so a tenant page is the same page everywhere

A public tenant page is a hero followed by its layout blocks, inside an `<article>`. That is the
whole atom, and its value is that it exists **once**: the same composition served from the tenant
route and the main `[slug]` route means a page cannot render differently depending on how it was
reached.

The `<article>` element is the part worth stating. A page's main content is a self-contained
composition, and marking it as such is what lets a reader-mode, a crawler, and a screen reader's
landmark navigation each find the content rather than the chrome around it. A `<div>` would look
identical and carry none of that.

**Honest boundary.** This is composition only. The hero's dispatch is [[hero]]/render's — including
its handling of a type this build does not know — and each block's rendering belongs to its own atom.
An empty layout renders an empty article, which is correct: a page with no blocks yet is not an
error.

**Law — [[law]]: one route composition, used by every route that shows the same thing. Two
compositions of one page drift, and the drift is discovered by whoever reached the page the less
common way.**

## Standards

- **W3C HTML5** — the `article` element for self-contained content.
- **WCAG 2.2 §1.3.1** — info and relationships.

Composes: [[hero]]/render · `block` · [[law]].
