---
name: share
description: "Use when a page needs an Open Graph image without uploading one, or a formula needs to show its own result — shareImage draws a document's SEO-plugin title and description over its content-uuid's identity animation (1200×630, pure SMIL, no Media row, no R2 object, no Payload request), and coilImage draws the coiled rosetta turning: trinities rotating inside a parent turning the other way, crosses as edges by their measured faces."
atomPath: "image/share"
coordinate: "image/share · 4/weave · 4d5c1829"
contentUuid: "9ff0073e-9891-5710-97a0-c1ba4ccfeb35"
diamondUuid: "23a90540-e991-89ac-92b3-82d07e512d1f"
uuid: "4d5c1829-81d0-8c9f-9746-636a6c3af139"
horo: 4
typography:
  partition: image
  bondDegree: 108
standards:
  - "OGP open-graph-protocol-1.0 (og:image 1200×630)"
  - "SVG 1.1 / SMIL animation"
bindings: []
signatures:
  computationUuid: "cf711f48-0f60-8a4b-bddd-b5511d3f96e8"
  stages:
    - stage: path
      stageUuid: "5d878f33-bd51-84d0-bbb0-51ba33737773"
    - stage: trinity
      stageUuid: "130cfbd2-86bf-85a9-8ef3-4377eb528be1"
    - stage: boundary
      stageUuid: "6147c49f-a1af-8d93-939c-9bfb4595f5da"
    - stage: links
      stageUuid: "ae3f95d7-eac1-8c99-89d4-cff71b72689f"
    - stage: horo
      stageUuid: "abce04b1-ddbe-80c2-b8db-1e9280de14c8"
    - stage: seal
      stageUuid: "8328fd8e-6116-85ba-b45c-1dd5fca1f7f5"
    - stage: uuid
      stageUuid: "a45fec8b-7bdc-8c75-9b98-35e0e0defc1e"
version: 2
---
# image/share — the picture a page shares, and the picture a formula makes of itself

Every page that is shared shows an image. Until now that image was either a Media upload — a
document, an R2 object, a resize pipeline, a cost the tenant pays per page — or the template's
placeholder. `shareImage` replaces the placeholder with something that costs nothing and says
something: the page's **SEO-plugin title and description** (the meta the page already stores, so no
second query) over the **identity animation of its content-uuid** ([[image]]) — the same uuid always
draws the same picture, and two pages never share one. It is served by `/next/share` as a pure
function of its query string, cached immutably, and `generateMeta` points `og:image` at it whenever
the editor uploaded nothing.

## The formula's own picture

The second image is the one the user asked for by name: the **result of the formula, animated**.
`coilImage` takes the coiled rosetta ([[quantum]]/coil) and draws it turning. Every internal node is a
group with its own SMIL rotation — forward at even depth, backward at odd — so a trinity inside the
root turns against the turn that carries it. That nesting is the interaction: the inner coins trace
epicycles, which is what composing two rotations IS, and it is the picture of "one turn each way at
every level". Coins are laws on the seven-colour spectrum by rosetta position; crosses are the
level's measured edges — width by shared files, opacity by the forward face, dashed where the cross
holds at zero. `erpax.gate.coil` returns it as `svg`, so the tool's answer can be looked at.

**Honest boundary.** SMIL is honoured by browsers and by nothing that renders `og:image` previews —
a crawler takes the first frame, which is the still coil, and that is the correct picture for it.
The share image renders the ADDRESS of the page (its uuid) and the plugin's words, never a
photograph of its meaning; that is [[image]]'s own boundary restated. Titles are clipped to three
lines and descriptions to two, so a very long meta is cut, and escaped, so no title can write markup.

**Law — [[law]]: an image that can be computed from what the page already stores is never uploaded.
The share image is the page's uuid and its own words; the formula's image is the formula's result
turning — both pure, both free, both the same every time.**

## Standards

- **OGP open-graph-protocol-1.0** — `og:image` at 1200×630.
- **SVG 1.1 / SMIL** — declarative animation, no script.

Composes: [[image]] · [[quantum]]/coil · [[color]] · [[xml]]/escape · [[generate]]/meta · [[law]].
