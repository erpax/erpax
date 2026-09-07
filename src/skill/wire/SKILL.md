---
name: wire
description: "Use when a reader receives the erpax GitHub URL — wireFromRepoUrl validates github.com/erpax/erpax and returns the canonical skill entry paths (content-uuid sealed). All orientation surfaces point to .claude/skills/SKILL.md; paste or clone."
atomPath: "skill/wire"
coordinate: "skill/wire · 7/descent · bd2943d2"
contentUuid: "78c9c98d-e99e-5c62-bdda-860f0fc3b397"
diamondUuid: "ca6ea990-b775-8b63-b2e9-d097068aab3d"
uuid: "bd2943d2-ff99-88a4-b5e8-e0d205b9000e"
horo: 7
typography:
  partition: skill
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "8a8a7e24-e4bc-8eee-8ee8-7f7b533e6a73"
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
      stageUuid: "9c19ce3b-44d0-8674-8e0f-ef2fc2245550"
    - stage: seal
      stageUuid: "eed5c946-7678-8720-a57f-f5cd00c6e351"
    - stage: uuid
      stageUuid: "739d39b2-460b-8de6-a281-52f169240998"
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
