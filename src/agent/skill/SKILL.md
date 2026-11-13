---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 1/base · 7b900c80"
contentUuid: "dce81973-6925-5c4a-ad2e-63a089ea4017"
diamondUuid: "440263be-4536-8ac6-89ed-20ade5be1724"
uuid: "7b900c80-59df-8f9c-8c1d-7b2bc5cd7572"
horo: 1
typography:
  partition: agent
  bondDegree: 38
standards: []
bindings: []
signatures:
  computationUuid: "6adcaab3-87d5-8c3a-bfa9-91ab771d3dc7"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "3d6ccd02-fed0-82f3-a8cd-54068fd35bb8"
    - stage: links
      stageUuid: "34988d2a-855a-8abd-9819-93cd4ec61a34"
    - stage: horo
      stageUuid: "056456aa-9da0-8026-bc7c-bc3bf79ea432"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "203c82f1-3624-8ebf-b684-0f2cb9f1dd9a"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / holographic (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · holographic · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
