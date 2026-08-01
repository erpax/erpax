---
name: wire
description: "Use when a reader receives the erpax GitHub URL — wireFromRepoUrl validates github.com/erpax/erpax and returns the canonical skill entry paths (content-uuid sealed). All orientation surfaces point to .claude/skills/SKILL.md; paste or clone."
atomPath: "skill/wire"
coordinate: "skill/wire · 2/share · 5ae2355f"
contentUuid: "440fdc03-337f-5fb2-949c-ab09d3721f28"
diamondUuid: "c28d24d7-5fcc-860d-ab0f-0919f1391c8b"
uuid: "5ae2355f-3725-8e2c-bcf2-0e6593feece7"
horo: 2
typography:
  partition: skill
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "e8da8141-d9b8-87ac-8d54-496c2d8dfa04"
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
      stageUuid: "6a80fc2d-e633-8f19-a4f4-96ac8c1ad673"
    - stage: seal
      stageUuid: "6162a5b9-c511-827a-ad44-215b95cbf08d"
    - stage: uuid
      stageUuid: "5ba596d2-28bf-86e3-a453-29c6c3372303"
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
