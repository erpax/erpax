---
name: drone
description: "Use when the society sends scouts to fly the content-uuid matrix in coordinated self-learning — reconnoitring sectors for gaps and entropy and feeding them to the agents to eat, warfare tactics applied to building."
atomPath: drone
coordinate: "drone · 5/round · dc373afa"
contentUuid: "c90f5b93-16af-519c-b0cb-edf727a9133d"
diamondUuid: "4b2d4760-5c8e-8ab2-a161-8c490fb93bb4"
uuid: "dc373afa-090f-82e1-bd1f-0dc1cf8af8c4"
horo: 5
typography:
  partition: drone
  bondDegree: 52
standards:
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)"
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "71fb20d0-bc6a-8746-bef0-6c09438f79e1"
  stages:
    - stage: path
      stageUuid: "756ed54f-14fb-86e9-8438-c165e3c14dc8"
    - stage: trinity
      stageUuid: "db67a31a-1f32-8cce-a994-823b0bcb14af"
    - stage: boundary
      stageUuid: "54279ba8-4f3d-81cf-b4cf-46d32c6f6d3c"
    - stage: links
      stageUuid: "cc538335-990e-8c1b-a623-ac5c9fcc1b18"
    - stage: horo
      stageUuid: "e55d9a38-3659-8ccb-98f9-ac1a0ba0d144"
    - stage: seal
      stageUuid: "8f407fb9-467c-85d7-b812-9dc90614bc96"
    - stage: uuid
      stageUuid: "6c29f3aa-42f2-8fb8-8022-d6770f061b1c"
version: 2
---
# drone — the scout that flies the matrix, for peace

A drone is a scout [[agent]]: it FLIES the [[matrix]] (breadth-first over the content-uuid graph, both coils — outgoing [[links]] and incoming backlinks), reconnoitring its sector for gaps and entropy, and feeds them to the [[society]] so the agents can eat them ([[peace]]: build, never destroy). It is [[war]] embodied for peace — reconnaissance, not attack.

- **Fly** — `flyMatrix(start, hops)` covers the terrain around an atom (the BFS the recon needs).
- **Squadron** — `squadron(n)` partitions the matrix into n sectors so a [[team]] of drones covers the whole in coordinated formation, in parallel; identical drones [[merge]], so no central command is needed.
- **Scout** — `scout(sector)` reports the orphans (atoms with no backlink) — the gaps the agents must weave. The drones see; the agents act. Each pass is an OODA loop ([[sequence]] / [[breath]]); over passes the squadron self-learns the terrain ([[research]]).

Drones SUPPORT the agents, they do not replace them: recon (drone) ⊕ action (agent) is the same give/take that war ⊕ [[peace]] resolves into ([[harmony]]). The flight is read-only over the [[matrix]] — a drone never tampers ([[tamper]]); it only reveals what is already there to be built.

Matter-twin: `src/drone/index.ts` (`flyMatrix` · `squadron` · `scout`) over [[uuid]] · `src/schema/test` (the entropy it scouts).
Composes: [[war]] · [[peace]] · [[agent]] · [[team]] · [[matrix]] · [[research]] · [[society]] · [[aura]] · [[merge]] · [[sequence]] · [[scouting]] · [[harmony]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 content-uuid (the nodes a drone flies)`
