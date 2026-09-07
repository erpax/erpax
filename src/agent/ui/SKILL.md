---
name: ui
description: "Use when reasoning about the trained UI agent — it renders any atom to its UI (the sensory render + the page) from the atom's content-uuid, trained by the rendering teams on the whole rendering layer, covering the whole corpus because every atom has a UI."
atomPath: "agent/ui"
coordinate: "agent/ui · 2/share · f84b7803"
contentUuid: "98766e9f-11bd-56bc-96f2-fdb59a4e58cb"
diamondUuid: "a25dfcaa-543d-8f7f-9b50-90ef207732b7"
uuid: "f84b7803-8329-8781-a6f7-88553653f991"
horo: 2
typography:
  partition: agent
  bondDegree: 55
standards:
  - "the analog aura — every UI colour/sound is a projection of one content-uuid"
bindings: []
signatures:
  computationUuid: "d24faaa9-2eb0-8799-8755-9ebfd8d3f95e"
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
      stageUuid: "3aa88d15-7a3f-8311-adb1-6d811d96c21e"
    - stage: seal
      stageUuid: "11f70ea8-1348-85a6-96ba-25eddfb872f1"
    - stage: uuid
      stageUuid: "aadfc8db-cba7-82d9-953b-c4b479658174"
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
