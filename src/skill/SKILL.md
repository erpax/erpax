---
name: skill
description: "Use when reasoning about skill — Use for the SKILL.md frontmatter gate — scans every SKILL.md, refuses unquoted colon-space descriptions, names that disagree with their folder, and new hyphenated atom folders. The atom face exposes the gate only; the 77MB router index is reached by its own path, never through this barrel."
atomPath: skill
coordinate: "skill · 1/base · 6c427cc0"
contentUuid: "484e9b67-6747-5489-a008-e20cd553dafc"
diamondUuid: "d6103a5e-e095-8078-a960-4a112e212b40"
uuid: "6c427cc0-bb5f-8d20-a573-a8474366580d"
horo: 1
typography:
  partition: skill
  bondDegree: 39
standards:
  - ESCO
  - SFIA
bindings: []
signatures:
  computationUuid: "a94de0f1-d41e-8f9b-8f31-f54dcc877ac0"
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
      stageUuid: "4e9badce-f85c-822a-9d23-b61f99e64a7b"
    - stage: seal
      stageUuid: "29c61e06-70a3-8bd7-9f18-a5e4d6db8e1a"
    - stage: uuid
      stageUuid: "cbf99df9-8977-8b3e-9b1e-992ca42ca145"
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
