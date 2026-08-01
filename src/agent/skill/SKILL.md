---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 5/round · e83276f4"
contentUuid: "dbbb2c0c-42d8-557e-9fa2-bede6842c3ac"
diamondUuid: "71253f63-d8cb-8464-9632-87cc8f301594"
uuid: "e83276f4-8948-8310-9e96-ac35c36b00a8"
horo: 5
typography:
  partition: agent
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "1a20e254-af60-88c8-9dba-31857b616078"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "50fc9599-2cd2-866c-b250-24b2ccd2c1a2"
    - stage: links
      stageUuid: "d10b9ce1-92a5-8a56-91eb-9e554f750da3"
    - stage: horo
      stageUuid: "2dd7a3a8-3869-8dad-b587-4a8cf5f52d75"
    - stage: seal
      stageUuid: "2854c9c6-8372-8a76-9e59-a0264e44ece4"
    - stage: uuid
      stageUuid: "c140b4ee-17b7-8620-9217-fe99e9e533c7"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
