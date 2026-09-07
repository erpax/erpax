---
name: page
description: "Use when reasoning about page — A public tenant page is a hero followed by its layout blocks, inside an . That is the whole atom, and its value is that it exists **once**: the same composition served from the…"
atomPath: "render/tenant/page"
coordinate: "render/tenant/page · 8/crest · 41987913"
contentUuid: "6dc73b04-e0e7-5a24-b0b4-684ec359e740"
diamondUuid: "447ac30a-02aa-8a0e-a12b-c545931b32a2"
uuid: "41987913-aeea-8ccb-9785-243d9c693443"
horo: 8
typography:
  partition: render
  bondDegree: 141
standards: []
bindings: []
signatures:
  computationUuid: "4f123f98-ada1-8b84-aea3-cb9cb843fb0f"
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
      stageUuid: "4b6b2e8c-c810-881c-9970-b74ef7b4b418"
    - stage: seal
      stageUuid: "6fef39a2-e9c5-8195-b29c-157cb937f4c7"
    - stage: uuid
      stageUuid: "8cf20912-de0f-8beb-93bc-5a23f560915f"
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
