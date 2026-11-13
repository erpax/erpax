---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 2/share · ed67ac06"
contentUuid: "5e006d53-c5e2-57db-8b1a-239b13179fd6"
diamondUuid: "f8e64c85-0359-8d7e-af9b-16e3fc591777"
uuid: "ed67ac06-9b97-81ee-a254-2763832feb47"
horo: 2
typography:
  partition: agent
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "630cfbfb-61a9-8af4-bc64-83d3f24e32ee"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "3d6ccd02-fed0-82f3-a8cd-54068fd35bb8"
    - stage: links
      stageUuid: "3d6e53d1-986f-88da-b178-732857f54def"
    - stage: horo
      stageUuid: "cc961c3a-0550-8e61-940e-b8b076711a0d"
    - stage: seal
      stageUuid: "cc386600-b64e-8962-8301-0eeb688cc21b"
    - stage: uuid
      stageUuid: "31d3247d-920b-8ed9-abd6-a860c61ec046"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / holographic (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · holographic · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
