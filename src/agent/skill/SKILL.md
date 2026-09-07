---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 1/base · 3eeec543"
contentUuid: "2e0895c2-8544-51e6-bee2-3d1bfd5ab577"
diamondUuid: "a9dd4d33-f35a-8ef6-a7dc-7cb91796c538"
uuid: "3eeec543-0a26-8d7d-940a-9f4865b186f7"
horo: 1
typography:
  partition: agent
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "d19dc7a8-19a7-8eff-a0cb-b8d95095552b"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "b1faa78b-bf1e-8049-9116-e9019e66cc72"
    - stage: links
      stageUuid: "45b702da-f85d-800a-a638-71b96aabe5f3"
    - stage: horo
      stageUuid: "4a62967f-05f4-80f8-b0a5-1a72848580cb"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "7c041a9a-b695-8d18-b626-e6a2f311c93e"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
