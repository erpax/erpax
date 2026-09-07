---
name: class
description: "Use when reasoning about class — merges Tailwind class lists so a later utility wins over an earlier one — for the conditional shapes, for the conflict resolution. Six modules use it."
atomPath: "ui/class"
coordinate: "ui/class · 1/base · 27cfbd39"
contentUuid: "393e975b-3f53-570e-9a9b-d0b7668681ce"
diamondUuid: "4f943c61-0825-80ae-bfbe-a0130208e1b5"
uuid: "27cfbd39-6a7d-823b-8aa7-0584483850d0"
horo: 1
typography:
  partition: ui
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "de8b00e1-2160-886b-9b57-cb151a6796e2"
  stages:
    - stage: path
      stageUuid: "375f7b83-a0a7-8592-bb3a-ee74fbd873ff"
    - stage: trinity
      stageUuid: "f1e547c2-f2ff-8d97-974d-6fe5f91d3ef6"
    - stage: boundary
      stageUuid: "49b163bb-6aff-8e88-8efc-70a19c7fc118"
    - stage: links
      stageUuid: "e6fc6a7c-64c0-8ce7-a0d8-2f7cb06a66b3"
    - stage: horo
      stageUuid: "0f1a4b1d-a627-86e8-b005-07a404c67914"
    - stage: seal
      stageUuid: "5f768016-b464-8126-8dcc-4343cca9d75a"
    - stage: uuid
      stageUuid: "5ed522cc-a08c-80c3-b8d8-31bc769d2a0a"
version: 2
---
# ui/class — one place merges class names, and it is not called `utils`

`cn(...)` merges Tailwind class lists so a later utility wins over an earlier one — `clsx` for the
conditional shapes, `tailwind-merge` for the conflict resolution. Six modules use it.

It lived at `ui/utils.ts`. A stem like `utils`, `helpers` or `common` is a **bucket**, and a bucket
has no law: nothing can be true or false about a file named for the absence of a subject, so nothing
gates it and anything may be added to it ([[rules]] `word-matter`). The path is the message
([[path]]), and this file's message is *class*.

**Honest boundary.** This atom asserts where the merge lives and that one function performs it. It
does not verify Tailwind's own precedence rules — `tailwind-merge` owns those, and re-testing a
dependency's semantics here would be [[rules]]/canonical's defect in reverse.

**Law — [[law]]: a file named for a bucket cannot be reasoned about. Name it for what it is, and the
name becomes checkable — `class` merges classes, and a second merger would now be visible.**

Composes: [[ui]] · [[path]] · [[rules]] · [[law]].
