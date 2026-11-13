---
name: team
description: "Use when agents must cover a gap together — a team's competence is the UNION of its members' skills, shared into every member, while each keeps its distinct purpose."
atomPath: "agent/team"
coordinate: "agent/team · 5/round · 9b6745eb"
contentUuid: "4f282e8e-47b3-5498-becf-093d8af81459"
diamondUuid: "d9294705-5e35-8188-a9c7-56d433cf683a"
uuid: "9b6745eb-1226-8a4b-a71b-e23cd5cbf5c7"
horo: 5
typography:
  partition: agent
  bondDegree: 91
standards:
  - "RFC 9562 §5.8 content-addressed identity (agent + team uuid)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "d5a84090-e208-86b6-8c60-9814460597fd"
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
      stageUuid: "98078fb9-b95d-8c07-9390-ec9c91c29ca4"
    - stage: seal
      stageUuid: "c20ea09e-e81c-8a5f-bae0-4201a53397eb"
    - stage: uuid
      stageUuid: "ebb82d36-c070-85b0-96f9-8d68d880a1ef"
version: 2
---
# agent/team — competence is the union, purpose stays many

The scale above [[agent]]/service. An agent is its content; a **team** is a set of agents that share their skills, and the team's competence is the **union** of the members' skill-sets. `shareSkills` loads that union into every member: afterwards any member can take any team task, while each keeps its own PURPOSE.

That is the holographic shape — many and specialised in purpose, one and whole in competence.

Teams are themselves content-addressed, so `mergeTeams` is set union with no coordination: two federation peers holding the identical team collapse to one. `teamCovers` answers the only question that matters when spawning — which required skills the team does NOT have.

**Honest boundary.** Coverage proves a skill is NAMED in the union, never that the member is good at it. Competence here is a set membership; whether a load was ever certified is [[train]]'s question.

Composes: [[agent]] · [[agent]]/service · [[merge]] · [[integrity]].
