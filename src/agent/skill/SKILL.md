---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 5/round · c6778dfa"
contentUuid: "4db01999-a5af-52ed-bd6f-2a56757feb80"
diamondUuid: "c333482e-a9b3-845c-b572-3b97c3afa55a"
uuid: "c6778dfa-1f8f-82ac-b5df-1e90743dc2c8"
horo: 5
typography:
  partition: agent
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "8d171f19-72be-8991-8730-0c46a27f0b33"
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
      stageUuid: "a196f4ee-ff3a-8169-9a6c-ab1d4047377b"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "18409cd0-d0cd-8949-8a29-12013519aa18"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
