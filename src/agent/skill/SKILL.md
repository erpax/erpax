---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 2/share · b9196360"
contentUuid: "dcb1497c-6e22-5289-be9a-46d28b4c7980"
diamondUuid: "ab8913fa-9028-846a-8cb2-3cd4256e5911"
uuid: "b9196360-b9fb-8ad4-963f-11cfb73bf54c"
horo: 2
typography:
  partition: agent
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "ac64be81-89a9-8146-aabe-7c097f5a5b76"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "b1faa78b-bf1e-8049-9116-e9019e66cc72"
    - stage: links
      stageUuid: "f7819c72-5bf4-8519-bcd9-8c35947852ea"
    - stage: horo
      stageUuid: "13db8ba3-7c21-8b40-b46f-c1da4cf97507"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "5ea2c3e0-964a-8b95-8adb-9f2335088361"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
