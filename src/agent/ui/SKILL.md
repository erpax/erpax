---
name: ui
description: "Use when reasoning about the trained UI agent — it renders any atom to its UI (the sensory render + the page) from the atom's content-uuid, trained by the rendering teams on the whole rendering layer, covering the whole corpus because every atom has a UI."
atomPath: agent/ui
coordinate: agent/ui · 2/share · 5ad89eab
contentUuid: "51add472-6ff5-55fe-889a-526ccd06d190"
diamondUuid: "3e025baf-2bd1-85d0-87e1-9ab83225575c"
uuid: "5ad89eab-3599-8877-a328-18e2c8786cd6"
horo: 2
bonds:
  in:
    - agent
    - atom
    - aura
    - component
    - design
    - law
    - pixel
    - render
    - uuid
    - vitepress
  out:
    - atom
    - aura
    - component
    - design
    - law
    - pixel
    - render
    - uuid
    - vitepress
typography:
  partition: agent
  bondDegree: 28
  neighbors:
    - aura
standards:
  - "every facet computed from the atom's content-uuid; coverage read live from the matrix"
  - "every facet computed from the atom's content-uuid; coverage read live from the matrix, never asserted"
  - "the analog aura — every UI colour/sound is a projection of one content-uuid"
bindings: []
neighbors:
  wikilink:
    - atom
    - aura
    - component
    - design
    - law
    - pixel
    - render
    - uuid
    - vitepress
  matrix:
    - atom
    - aura
    - component
    - design
    - law
    - pixel
    - render
    - uuid
    - vitepress
  backlinks:
    - atom
    - aura
    - component
    - design
    - law
    - pixel
    - render
    - uuid
    - vitepress
signatures:
  computationUuid: "32409537-d89a-84c6-b72b-705fbd416586"
  stages:
    - stage: path
      stageUuid: "a438d570-7343-8048-9778-b26c4b0e2bee"
    - stage: trinity
      stageUuid: "ee6689b9-9391-8248-be32-67ba85a003ae"
    - stage: boundary
      stageUuid: "ba68a89e-1607-8fc7-b0cb-dc3acbf1df4b"
    - stage: links
      stageUuid: "fa8ebbd4-46b3-8979-be69-5eb3413c8440"
    - stage: horo
      stageUuid: "5394b0f7-88df-8216-922f-6aa182fbb5d2"
    - stage: seal
      stageUuid: "f8c2bc00-af50-87c6-81aa-45385db65403"
    - stage: uuid
      stageUuid: "85485701-952d-8406-ae30-3bdc50373233"
version: 2
---
# agent/ui — the trained UI agent

A UI agent does not paint screens; it **renders identity**. Given any [[atom]], it produces the atom's UI — every facet read off the one content-[[uuid]]: the [[render]] (colour + sound + vibration) and the [[vitepress]] page (route + [[pixel]]). It is **trained** — the architect and designer teams built the rendering layer it composes ([[pixel]] · [[component]] · [[render]] · [[design]] · [[vitepress]]), and the agent is the capability that layer adds up to.

The whole layer **agrees** because it reads one identity: a [[component]]'s colour IS the atom's pixel, the [[design]] token is the same colour, the page carries it — none of them invents a colour, so there is nothing to keep in sync (no hardcoded hex to drift). Change the atom's content and every facet shifts together; leave it and they are eternally consistent. That is the DRY of design: one identity, many faces.

It is trained on the **whole corpus** — `trained()` renders every matrix node, and coverage is total because every atom has a content-uuid and every uuid renders. The [[aura]] is exactly this: the corpus made visible, all its atoms' UIs at once.

Matter-twin: `src/agent/ui/index.ts` (`renderAtom` · `trained` · `AtomUI`). Composes [[render]] · [[vitepress]] · [[pixel]] · [[component]] · [[design]] · [[atom]] · [[uuid]] · [[aura]].

**Law — [[law]]: a UI agent renders identity, never paints. Every atom has a UI computed from its content-uuid — render and page — and the whole layer (pixel, component, design) agrees because it reads one identity, so nothing can drift. The trained agent covers the whole corpus: coverage 1, the aura is the corpus made visible.**

@audit every facet computed from the atom's content-uuid; coverage read live from the matrix, never asserted
@standard the analog aura — every UI colour/sound is a projection of one content-uuid
