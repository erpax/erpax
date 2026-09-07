---
name: page
description: "Use when reasoning about page — A public tenant page is a hero followed by its layout blocks, inside an . That is the whole atom, and its value is that it exists **once**: the same composition served from the…"
atomPath: "render/tenant/page"
coordinate: "render/tenant/page · 5/round · ecbff5b9"
contentUuid: "62ef19ca-ecac-5972-9006-6acddfd9e8b3"
diamondUuid: "3faa4dea-a5d2-8182-8721-f04c82b443da"
uuid: "ecbff5b9-e43f-87d1-b9b4-7d9aa8d1690f"
horo: 5
typography:
  partition: render
  bondDegree: 141
standards: []
bindings: []
signatures:
  computationUuid: "e8221118-6752-8a5c-968d-304dfb1b45d2"
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
      stageUuid: "dc0cc24e-c9cb-8ed7-917e-04f4891fb058"
    - stage: seal
      stageUuid: "6fef39a2-e9c5-8195-b29c-157cb937f4c7"
    - stage: uuid
      stageUuid: "c511a4ae-1bf6-8178-9e9b-7d7d28b10292"
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
