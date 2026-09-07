---
name: skill
description: "Use when reasoning about skill — Use for the SKILL.md frontmatter gate — scans every SKILL.md, refuses unquoted colon-space descriptions, names that disagree with their folder, and new hyphenated atom folders. The atom face exposes the gate only; the 77MB router index is reached by its own path, never through this barrel."
atomPath: skill
coordinate: "skill · 4/weave · 3c55741c"
contentUuid: "f7a67205-b13d-56d5-96c0-79d9a3e00f88"
diamondUuid: "f136b7cd-f710-81c6-8a40-b09a03496500"
uuid: "3c55741c-78d1-8a4e-b858-77e1317f153b"
horo: 4
typography:
  partition: skill
  bondDegree: 39
standards:
  - ESCO
  - SFIA
bindings: []
signatures:
  computationUuid: "2304de8e-920c-8636-b5c1-bf3652d86f6d"
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
      stageUuid: "413054a4-05e9-8947-bac9-754e15f2ecad"
    - stage: seal
      stageUuid: "29c61e06-70a3-8bd7-9f18-a5e4d6db8e1a"
    - stage: uuid
      stageUuid: "ee05555e-21bb-8c3e-a7fc-112cb82746eb"
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
