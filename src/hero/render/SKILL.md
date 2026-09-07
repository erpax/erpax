---
name: render
description: "Use when reasoning about render — A dispatcher over three heroes, and the interesting half is everything that is **not** one of them."
atomPath: "hero/render"
coordinate: "hero/render · 2/share · 5bf467a6"
contentUuid: "81070bb4-b2f0-565c-9f57-de66cc1f0c2e"
diamondUuid: "69a9de3c-1b42-8eb8-b246-6ad840314ec1"
uuid: "5bf467a6-9700-8960-b3c5-433a15a9c9b9"
horo: 2
typography:
  partition: hero
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "c7a0c96b-454d-89c7-a7af-6a01d09a12e4"
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
      stageUuid: "a91257bc-1a97-8e81-aa26-2a05e9cfd53b"
    - stage: seal
      stageUuid: "eed1b1b2-d1f7-861c-a701-8d6e58d22eba"
    - stage: uuid
      stageUuid: "370f063e-5d4c-802c-a680-e2a86eb4a723"
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
