---
name: skill
description: "Use when reasoning about skill — Use for the SKILL.md frontmatter gate — scans every SKILL.md, refuses unquoted colon-space descriptions, names that disagree with their folder, and new hyphenated atom folders. The atom face exposes the gate only; the 77MB router index is reached by its own path, never through this barrel."
atomPath: skill
coordinate: "skill · 8/crest · dc9ea97b"
contentUuid: "7a271507-cbd2-5903-bfb8-72183a9ba173"
diamondUuid: "1c2a867e-b225-89b1-b773-d4f694d537e1"
uuid: "dc9ea97b-0f76-8ae8-be9f-c5d5ca747518"
horo: 8
typography:
  partition: skill
  bondDegree: 37
standards:
  - ESCO
  - SFIA
bindings: []
signatures:
  computationUuid: "30696a6c-2815-877f-9583-c90cbe5f3da9"
  stages:
    - stage: path
      stageUuid: "5e247c75-db64-8db4-8e65-1dd06c983552"
    - stage: trinity
      stageUuid: "59a5dcc1-3329-8f37-a05b-44695455de3b"
    - stage: boundary
      stageUuid: "fc814826-196c-87e6-aa33-ce76c5d65969"
    - stage: links
      stageUuid: "33937247-e76a-8de3-a17b-0990f8c5a917"
    - stage: horo
      stageUuid: "c8ca51a2-a1f5-8c3a-883e-cb4bcbb29b1b"
    - stage: seal
      stageUuid: "29c61e06-70a3-8bd7-9f18-a5e4d6db8e1a"
    - stage: uuid
      stageUuid: "124327c6-acfc-8b9b-a09c-efe17eec64ec"
version: 2
---
# skill

The gate that keeps every `SKILL.md` machine-readable.

`frontmatter` scans all SKILL.md files and refuses three things: an unquoted
`": "` in a description (which breaks js-yaml), a `name:` that disagrees with its
folder, and a new hyphenated atom folder. The grandfather set is now **empty** — the
six vocabulary atoms it once held were nested, so the rule admits no exceptions.

**The barrel is deliberately narrow.** It exposes `frontmatter` only. `skill/router`
carries a ~77MB generated index, so a barrel that re-exported it would drag the whole
corpus into every importer — reach the router by its own path. A face that costs
77MB to touch is not a face.

Composes: [[law]].
