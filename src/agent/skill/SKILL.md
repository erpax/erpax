---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: "agent/skill"
coordinate: "agent/skill · 2/share · f5048d69"
contentUuid: "9f65b818-92a3-56fe-8524-2e5c306e9127"
diamondUuid: "67640e67-a27a-87fc-8a33-68fc946b13a3"
uuid: "f5048d69-00b9-8540-98c6-0dc80e51fb09"
horo: 2
bonds:
  in:
    - agent
    - baked
    - capacity
    - holographic
    - law
    - merge
    - team
    - typography
  out:
    - agent
    - baked
    - capacity
    - holographic
    - law
    - merge
    - team
    - typography
typography:
  partition: agent
  bondDegree: 25
  neighbors:
    - agent
standards: []
bindings: []
neighbors:
  wikilink:
    - agent
    - holographic
    - law
    - merge
    - team
  matrix:
    - agent
    - baked
    - capacity
    - holographic
    - law
    - merge
    - team
    - typography
  backlinks:
    - agent
    - baked
    - capacity
    - holographic
    - law
    - merge
    - team
    - typography
signatures:
  computationUuid: "79f910f3-31ff-8bfc-bb6f-8b7155e9559c"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "50fc9599-2cd2-866c-b250-24b2ccd2c1a2"
    - stage: links
      stageUuid: "40ed0d1e-8d92-8b1a-b6a0-e463355eed21"
    - stage: horo
      stageUuid: "390836d1-0071-85f1-8036-e717e321cf0b"
    - stage: seal
      stageUuid: "314f0044-b646-87e0-ba60-77309e790bcf"
    - stage: uuid
      stageUuid: "23a4acc8-bded-827b-8832-2f4c4bd5cd1f"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
