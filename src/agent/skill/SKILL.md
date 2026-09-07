---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 5/round · adc72813"
contentUuid: "fea9a592-3051-5770-8a92-c5b6dad2248a"
diamondUuid: "26ac6319-8c0f-8bb4-a5fd-15c5e55e7004"
uuid: "adc72813-69e3-82e7-b2ac-9a658e2743b6"
horo: 5
typography:
  partition: agent
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "90f3997f-0b16-8894-bf86-cc3129541442"
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
      stageUuid: "12e54724-dcea-8ead-8298-9f633cb8a8f8"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "06bf648e-501c-8cf4-9644-0702130a5933"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
