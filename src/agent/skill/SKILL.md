---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 2/share · ed67ac06"
contentUuid: "5389b42f-5521-51e7-a136-9a2731da24c6"
diamondUuid: "5a62c865-6e5b-8a62-9686-a60df929d121"
uuid: "ed67ac06-9b97-81ee-a254-2763832feb47"
horo: 2
typography:
  partition: agent
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "6541988e-4d09-88dd-8a96-cb2da5ae1547"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "3d6ccd02-fed0-82f3-a8cd-54068fd35bb8"
    - stage: links
      stageUuid: "45b702da-f85d-800a-a638-71b96aabe5f3"
    - stage: horo
      stageUuid: "2d778fcf-a46e-8ece-86c2-dd92eb83110f"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "d9344e35-7b2d-8953-b042-2f30a4572fa5"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
