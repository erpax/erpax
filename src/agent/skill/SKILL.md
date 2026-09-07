---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 2/share · c7d0716d"
contentUuid: "12aee2c8-3a21-5811-a7e4-ecbd4c9e5768"
diamondUuid: "27f60ea5-46c8-8ab7-ad91-83e19092bd41"
uuid: "c7d0716d-ec7d-8ec8-9ea1-cbe048f62b82"
horo: 2
typography:
  partition: agent
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "16f70465-6bd2-8ee0-be9d-c0620bb86188"
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
      stageUuid: "3e9c2c4a-f4b4-88e6-8cf5-9d76c43a5a14"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "ca00139f-017d-802a-96c1-8c10f612ad09"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
