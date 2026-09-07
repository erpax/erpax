---
name: wire
description: "Use when a reader receives the erpax GitHub URL — wireFromRepoUrl validates github.com/erpax/erpax and returns the canonical skill entry paths (content-uuid sealed). All orientation surfaces point to .claude/skills/SKILL.md; paste or clone."
atomPath: "skill/wire"
coordinate: "skill/wire · 7/descent · ba2e46d7"
contentUuid: "66e7e249-a1a0-5a97-bb99-ff5712532109"
diamondUuid: "41f30d7b-d40e-8b74-8c72-77ec5a46d35f"
uuid: "ba2e46d7-d101-8cc9-bcef-e1aeb9bacc31"
horo: 7
typography:
  partition: skill
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "f8bcbf5a-80d8-8bca-9b1d-9568dab01686"
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
      stageUuid: "e2e31454-7cd8-8226-8475-d643a8d5d5c8"
    - stage: seal
      stageUuid: "eed5c946-7678-8720-a57f-f5cd00c6e351"
    - stage: uuid
      stageUuid: "8e993194-3b44-81ba-a95f-f0500a239b73"
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
