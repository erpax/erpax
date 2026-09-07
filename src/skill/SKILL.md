---
name: skill
description: "Use when reasoning about skill — Use for the SKILL.md frontmatter gate — scans every SKILL.md, refuses unquoted colon-space descriptions, names that disagree with their folder, and new hyphenated atom folders. The atom face exposes the gate only; the 77MB router index is reached by its own path, never through this barrel."
atomPath: skill
coordinate: "skill · 8/crest · 60ea7a72"
contentUuid: "d083406d-4371-5225-8fb5-ba9645f7cfc6"
diamondUuid: "33d6164e-e3f2-8977-af45-96104efb1f2c"
uuid: "60ea7a72-edb4-8204-b3e5-08c23f62d0d9"
horo: 8
typography:
  partition: skill
  bondDegree: 39
standards:
  - ESCO
  - SFIA
bindings: []
signatures:
  computationUuid: "6881670a-7bed-8a98-a3bb-888149b43153"
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
      stageUuid: "26e44abd-96c4-8b58-8554-5e0e88fe7f15"
    - stage: seal
      stageUuid: "29c61e06-70a3-8bd7-9f18-a5e4d6db8e1a"
    - stage: uuid
      stageUuid: "29300830-8792-8f28-9c20-bd4a9a39ed37"
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
