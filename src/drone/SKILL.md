---
name: drone
description: "Use when the society sends scouts to fly the content-uuid matrix in coordinated self-learning — reconnoitring sectors for gaps and entropy and feeding them to the agents to eat, warfare tactics applied to building."
atomPath: drone
coordinate: "drone · 5/round · 07ab1fda"
contentUuid: "f372cb06-59b8-590d-a64e-ccf50cc62d89"
diamondUuid: "55f1327a-8d6e-87f2-aec3-ed6a45ad09b0"
uuid: "07ab1fda-d3fa-8f18-bb69-7a81bda4d345"
horo: 5
typography:
  partition: drone
  bondDegree: 22
standards:
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)"
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2bf0df0f-a1b3-857a-bdc2-27f6f4bdd9b1"
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
      stageUuid: "0aea1eee-dfbb-8233-8c7c-be3de67391e5"
    - stage: seal
      stageUuid: "8f407fb9-467c-85d7-b812-9dc90614bc96"
    - stage: uuid
      stageUuid: "084e3f77-fc77-8772-b2fe-bb57aece640c"
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
