---
name: render
description: "Use when reasoning about render — A dispatcher over three heroes, and the interesting half is everything that is **not** one of them."
atomPath: "hero/render"
coordinate: "hero/render · 5/round · b773f9ed"
contentUuid: "9999a707-aee5-528f-ba98-0544798c3bdd"
diamondUuid: "1233ea6d-5dd5-8f7b-ac75-2c96c6b46b61"
uuid: "b773f9ed-64ac-81fc-a0f4-8c2e0da8eb04"
horo: 5
typography:
  partition: hero
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "bed6927c-87ad-8143-854d-25778dc39caa"
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
      stageUuid: "2d89c949-44f6-83c5-8b46-279b20c13e5e"
    - stage: seal
      stageUuid: "eed1b1b2-d1f7-861c-a701-8d6e58d22eba"
    - stage: uuid
      stageUuid: "10422f13-c298-87a9-85bf-dc279cfca8a2"
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
