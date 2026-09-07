---
name: team
description: "Use when agents must cover a gap together — a team's competence is the UNION of its members' skills, shared into every member, while each keeps its distinct purpose."
atomPath: "agent/team"
coordinate: "agent/team · 5/round · 19956b69"
contentUuid: "690ed2b9-2510-5926-93aa-9ee3a2ffe4e6"
diamondUuid: "54565602-e782-83b4-8f95-9e9f0da768a3"
uuid: "19956b69-3f18-8f66-bcdf-951aa248d62f"
horo: 5
typography:
  partition: agent
  bondDegree: 142
standards:
  - "RFC 9562 §5.8 content-addressed identity (agent + team uuid)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "a31ac916-fa08-8571-ba5a-ace7faf8f380"
  stages:
    - stage: path
      stageUuid: "ac37f334-07c7-83c1-95b4-2966ade89aa4"
    - stage: trinity
      stageUuid: "bfd86190-782c-8194-82ac-ff4e13c90371"
    - stage: boundary
      stageUuid: "ca17e32a-3a93-827f-9021-88200e66f39f"
    - stage: links
      stageUuid: "cf716d60-9c59-87f2-9d25-d4b78c9eb216"
    - stage: horo
      stageUuid: "1b36e711-2d49-8268-8ded-d56e821824d6"
    - stage: seal
      stageUuid: "c20ea09e-e81c-8a5f-bae0-4201a53397eb"
    - stage: uuid
      stageUuid: "49450a74-77fd-8390-94f3-d74f34b790ba"
version: 2
---
# agent/team — competence is the union, purpose stays many

The scale above [[agent]]/service. An agent is its content; a **team** is a set of agents that share their skills, and the team's competence is the **union** of the members' skill-sets. `shareSkills` loads that union into every member: afterwards any member can take any team task, while each keeps its own PURPOSE.

That is the holographic shape — many and specialised in purpose, one and whole in competence.

Teams are themselves content-addressed, so `mergeTeams` is set union with no coordination: two federation peers holding the identical team collapse to one. `teamCovers` answers the only question that matters when spawning — which required skills the team does NOT have.

**Honest boundary.** Coverage proves a skill is NAMED in the union, never that the member is good at it. Competence here is a set membership; whether a load was ever certified is [[train]]'s question.

Composes: [[agent]] · [[agent]]/service · [[merge]] · [[integrity]].
