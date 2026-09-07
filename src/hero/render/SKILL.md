---
name: render
description: "Use when reasoning about render — A dispatcher over three heroes, and the interesting half is everything that is **not** one of them."
atomPath: "hero/render"
coordinate: "hero/render · 7/descent · 6eaf7eb1"
contentUuid: "4a1da570-e6ee-57f4-bf08-94ac1ff04636"
diamondUuid: "e58e1123-186e-8b85-b883-1f29eca5cf02"
uuid: "6eaf7eb1-1201-8b26-aa06-dd1d2207bff8"
horo: 7
typography:
  partition: hero
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "69a8ee47-27ea-894d-ae5b-e45016184515"
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
      stageUuid: "e712af08-335d-8b8a-8395-a318b9a83881"
    - stage: seal
      stageUuid: "eed1b1b2-d1f7-861c-a701-8d6e58d22eba"
    - stage: uuid
      stageUuid: "441e0e82-3ce1-8076-b6f3-54c79e4dae40"
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
