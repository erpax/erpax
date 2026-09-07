---
name: drone
description: "Use when the society sends scouts to fly the content-uuid matrix in coordinated self-learning — reconnoitring sectors for gaps and entropy and feeding them to the agents to eat, warfare tactics applied to building."
atomPath: drone
coordinate: "drone · 1/base · 82006fa6"
contentUuid: "72b6419f-c3d7-5436-9fac-4ab998f38975"
diamondUuid: "63f2c521-2105-82fa-9cca-726e22b6d986"
uuid: "82006fa6-752f-8eda-b65c-02a33e00dc64"
horo: 1
typography:
  partition: drone
  bondDegree: 22
standards:
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)"
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "74f2cb6e-42ee-83fe-b499-d39a87cc50da"
  stages:
    - stage: path
      stageUuid: "756ed54f-14fb-86e9-8438-c165e3c14dc8"
    - stage: trinity
      stageUuid: "db67a31a-1f32-8cce-a994-823b0bcb14af"
    - stage: boundary
      stageUuid: "54279ba8-4f3d-81cf-b4cf-46d32c6f6d3c"
    - stage: links
      stageUuid: "12fb6759-11e0-8bd1-85d8-f7459bdf16f3"
    - stage: horo
      stageUuid: "6e096882-88d8-8407-8cdf-18456b6dad1e"
    - stage: seal
      stageUuid: "8f407fb9-467c-85d7-b812-9dc90614bc96"
    - stage: uuid
      stageUuid: "62f40160-6478-825c-a5dd-a68ec182fdd7"
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
