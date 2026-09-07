---
name: wire
description: "Use when a reader receives the erpax GitHub URL — wireFromRepoUrl validates github.com/erpax/erpax and returns the canonical skill entry paths (content-uuid sealed). All orientation surfaces point to .claude/skills/SKILL.md; paste or clone."
atomPath: "skill/wire"
coordinate: "skill/wire · 1/base · cfdeff5a"
contentUuid: "834f3079-2c89-5c71-9a80-a6459178e2ad"
diamondUuid: "f5628f6b-3d61-8a37-8f03-1cd80a54007d"
uuid: "cfdeff5a-6dd1-8745-bfb1-5ba17286919d"
horo: 1
typography:
  partition: skill
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "4973dcf2-9532-8d0a-86e4-b6f353d830c6"
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
      stageUuid: "144e611b-49bf-8cdc-a58d-971d867270b9"
    - stage: seal
      stageUuid: "eed5c946-7678-8720-a57f-f5cd00c6e351"
    - stage: uuid
      stageUuid: "f99c61da-6101-8dd0-9d93-e9a5fa667cf7"
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
