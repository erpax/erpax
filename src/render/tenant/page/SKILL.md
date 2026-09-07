---
name: page
description: "Use when reasoning about page — A public tenant page is a hero followed by its layout blocks, inside an . That is the whole atom, and its value is that it exists **once**: the same composition served from the…"
atomPath: "render/tenant/page"
coordinate: "render/tenant/page · 1/base · 41dabec0"
contentUuid: "8b9b1e3a-76e9-5b0f-85d7-06c289fb7b3e"
diamondUuid: "08c4034d-e764-8017-8c21-bf094e0be888"
uuid: "41dabec0-c4a8-8f9e-b980-b8c492164a33"
horo: 1
typography:
  partition: render
  bondDegree: 141
standards: []
bindings: []
signatures:
  computationUuid: "781254e6-df76-8ace-bdb7-f3275bc0ee3c"
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
      stageUuid: "f4735516-fad4-8e85-8e6f-a9c983ef9a34"
    - stage: seal
      stageUuid: "6fef39a2-e9c5-8195-b29c-157cb937f4c7"
    - stage: uuid
      stageUuid: "0cde3d0c-4c87-8f29-8701-7ce780f18762"
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
