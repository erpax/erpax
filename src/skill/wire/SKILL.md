---
name: wire
description: "Use when a reader receives the erpax GitHub URL — wireFromRepoUrl validates github.com/erpax/erpax and returns the canonical skill entry paths (content-uuid sealed). All orientation surfaces point to .claude/skills/SKILL.md; paste or clone."
atomPath: "skill/wire"
coordinate: "skill/wire · 5/round · 96b1d701"
contentUuid: "4afaa2af-94e5-59ac-a54f-c1123952b8cb"
diamondUuid: "5dc5a7fd-0128-8a51-9fc4-1d5dd50497b0"
uuid: "96b1d701-d08e-89e6-b3d1-6f4ae0d0df6d"
horo: 5
typography:
  partition: skill
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "234307fe-ad06-804f-88a2-4ff43c304b00"
  stages:
    - stage: path
      stageUuid: "f95086c5-f893-8da9-b17f-f757188fae02"
    - stage: trinity
      stageUuid: "8d8ce36a-4aed-8132-9ea0-e2a34eed07d5"
    - stage: boundary
      stageUuid: "015784f5-da7e-89f5-85d7-69886c4d5dab"
    - stage: links
      stageUuid: "0272bd8e-6c2e-8e17-9a4f-dfbe890b5355"
    - stage: horo
      stageUuid: "cb8059a5-cf77-801f-9972-ab4ef552ae6e"
    - stage: seal
      stageUuid: "eed5c946-7678-8720-a57f-f5cd00c6e351"
    - stage: uuid
      stageUuid: "977a80a4-d374-84ea-953c-cc7270c756cc"
version: 2
---
# wire — repo URL → skill entry

Child atom of [[skill/router|router]] — validates the canonical erpax GitHub URL and returns the ONE root skill entry (`.claude/skills/SKILL.md` / `src/skills/SKILL.md`) without duplicating corpus prose.

## Exports

| Function | Role |
| --- | --- |
| `wireFromRepoUrl(url)` | Validate URL → entry paths + content-uuid |
| `normalizeErpaxRepoUrl(url)` | Normalize accepted GitHub variants |

**Law — [[law]]: one entry, many surfaces — AGENTS.md · CLAUDE.md · copilot-instructions · README · Cursor rule · well-known JSON all point here; never fork the root SKILL.**

@see ./index.ts · [[skills]] · [[agent]]
