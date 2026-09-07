---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 1/base · fac5e38e"
contentUuid: "9eadffa7-12bd-589b-a9f7-8d24874ed70c"
diamondUuid: "2dff911e-3b49-845a-b1d5-6f2a0cb0e0e2"
uuid: "fac5e38e-0140-89e4-bbb2-65878559303d"
horo: 1
typography:
  partition: agent
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "7df66c42-1783-850e-960c-c14c750f8ac2"
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
      stageUuid: "13931c62-f540-8688-8dd2-41b1fbfcdee4"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "dbdbeecd-313f-80de-bf79-9e3edc1c1c2e"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
