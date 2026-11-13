---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 1/base · 7b900c80"
contentUuid: "cb91fea9-e8aa-5f31-afae-639f4888bf06"
diamondUuid: "bf275eed-4f71-8c22-969b-35d785c201f6"
uuid: "7b900c80-59df-8f9c-8c1d-7b2bc5cd7572"
horo: 1
typography:
  partition: agent
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "df4ac09c-f8a2-829a-9de0-a54d193941ad"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "3d6ccd02-fed0-82f3-a8cd-54068fd35bb8"
    - stage: links
      stageUuid: "5dd9132d-121b-8584-b006-84d66aab6b87"
    - stage: horo
      stageUuid: "5687cb28-f092-83ec-83c5-07f70a8f8765"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "06bf44c9-2cec-8a85-855a-4b4017b5efc0"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / holographic (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · holographic · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
