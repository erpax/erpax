---
name: skill
description: "Use when an agent loads a capability — the agent's competence is the union of its loaded skills (a skill one agent loads, the team has); loading is idempotent."
atomPath: agent/skill
coordinate: agent/skill · 4/weave · 188e0a5b
contentUuid: "12682fb1-2324-5959-aafd-0a52bf6112e4"
diamondUuid: "fa1e7649-4913-8151-9c54-4ea70e1620b5"
uuid: "188e0a5b-9923-80b7-b2eb-bcf00ddcc1ed"
horo: 4
bonds:
  in:
    - agent
    - baked
    - holographic
    - law
    - merge
    - team
    - typography
  out:
    - agent
    - baked
    - holographic
    - law
    - merge
    - team
    - typography
typography:
  partition: agent
  bondDegree: 22
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
    - holographic
    - law
    - merge
    - team
    - typography
  backlinks:
    - agent
    - baked
    - holographic
    - law
    - merge
    - team
    - typography
signatures:
  computationUuid: "85b54b3b-4d3a-83ea-aff8-fe9b20eb4c0a"
  stages:
    - stage: path
      stageUuid: "a0a5cef4-9ccd-80d8-b657-cfa59b62e915"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "1781846e-44f3-86c6-9acd-7d88b564a6dc"
    - stage: links
      stageUuid: "bec6620e-ca66-844b-ba8c-b314a384142f"
    - stage: horo
      stageUuid: "aad90ca0-dd20-825b-9fb4-9fef507960da"
    - stage: seal
      stageUuid: "287db0da-1d77-8407-9349-f39626e2bc97"
    - stage: uuid
      stageUuid: "13c562da-9ea0-8075-b732-9539fe52bc0a"
version: 2
---
# agent/skill — an agent loads a capability

An agent loads a **skill** (a capability) by name/route: the agent's competence is the **union** of its loaded skills — [[team]] / [[holographic]] (a skill one agent loads, the team has). Loading is **idempotent** (set union), so re-loading is free and two agents converge on the same competence by [[merge]]. This is the `src/agent/[skill]` capability — the agent's loadout over the skill corpus.

Matter-twin: `src/agent/skill/index.ts` (`AgentSkills` · `agentSkills` · `load` · `has`). Composes [[agent]] · [[team]] · [[holographic]] · [[merge]].

**Law — [[law]]: an agent's competence is the UNION of its loaded skills (a skill one agent loads, the [[team]] has); loading is idempotent (set union), so re-loading is free and two agents converge on the same competence by [[merge]].**
