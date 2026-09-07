---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 5/round · 45e0cca5"
contentUuid: "ed6c3e55-a836-5a48-9fd1-4d5ef8704e01"
diamondUuid: "9db1d135-ed88-88fe-aa22-c493323bf066"
uuid: "45e0cca5-ff9b-8635-9615-b21fa7170fed"
horo: 5
typography:
  partition: agent
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "5a2431b5-a36f-87c3-8bc8-ad09b2f97dfa"
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
      stageUuid: "4c5c6215-3272-8c94-be87-680549742f00"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "9dcc1569-7cfd-8170-908f-cba818de7df0"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
