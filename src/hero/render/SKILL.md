---
name: render
description: "Use when reasoning about render — A dispatcher over three heroes, and the interesting half is everything that is **not** one of them."
atomPath: "hero/render"
coordinate: "hero/render · 7/descent · 681affa0"
contentUuid: "81491e8f-d80c-57a3-9dfd-5176cf4d10f2"
diamondUuid: "c19d2210-1576-8379-b906-86fdb392f73c"
uuid: "681affa0-59de-80d7-9a89-1b0816e9f975"
horo: 7
typography:
  partition: hero
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "4f425d42-2594-8aac-a8af-23a90ca11fe1"
  stages:
    - stage: path
      stageUuid: "15474d4a-163d-8595-8a18-d31548b35b5a"
    - stage: trinity
      stageUuid: "af6da239-4856-8930-b7e4-8158472420c6"
    - stage: boundary
      stageUuid: "e68bb0aa-4163-8906-9845-906fbdf0cbc9"
    - stage: links
      stageUuid: "aca1a405-7c16-8a51-a171-c888b7a03dfc"
    - stage: horo
      stageUuid: "40d45e69-491a-82ea-a127-4b8d588b27d7"
    - stage: seal
      stageUuid: "eed1b1b2-d1f7-861c-a701-8d6e58d22eba"
    - stage: uuid
      stageUuid: "047dc104-eae3-8319-bfb6-0109c760406d"
version: 2
---
# hero/render — an unknown hero renders nothing, never a crash

A dispatcher over three heroes, and the interesting half is everything that is **not** one of them.
`hero.type` arrives from the CMS, so it can be absent on a draft, `'none'` by an editor's choice, or
a value this build has never heard of after a rename. All three must produce `null`.

The failure this forbids is the ordinary one: `heroes[type]` returning `undefined` and React being
handed it as a component, which throws at render and takes the whole page with it. A page losing its
hero is a content problem; a page throwing is an outage — and the difference is one guard.

**Honest boundary.** This proves the dispatch is total: every input yields either the right hero or
nothing. It says nothing about what the heroes themselves render — each owns its own proof.

**Law — [[law]]: a lookup on data from outside the build is partial, so the miss is handled. An
unrecognised type must render nothing; handing `undefined` to React turns a stale content value into
a broken page.**

Composes: [[hero]] · `heros` · [[law]].
