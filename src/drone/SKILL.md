---
name: drone
description: "Use when the society sends scouts to fly the content-uuid matrix in coordinated self-learning — reconnoitring sectors for gaps and entropy and feeding them to the agents to eat, warfare tactics applied to building."
atomPath: drone
coordinate: "drone · 1/base · ad44041f"
contentUuid: "5bb675d3-f237-53d3-ba57-ae456b111eaa"
diamondUuid: "4d0f9a37-6c3a-8568-b07e-f1b1c49ed100"
uuid: "ad44041f-90c5-8bc3-89cb-cdd796a8538a"
horo: 1
bonds:
  in:
    - agent
    - aura
    - breath
    - harmony
    - links
    - matrix
    - merge
    - peace
    - research
    - scouting
    - sequence
    - society
    - tamper
    - team
    - uuid
    - war
  out:
    - agent
    - aura
    - breath
    - harmony
    - links
    - matrix
    - merge
    - peace
    - research
    - scouting
    - sequence
    - society
    - tamper
    - team
    - uuid
    - war
typography:
  partition: drone
  bondDegree: 52
  neighbors:
    - agent
    - aura
standards:
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)"
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - agent
    - aura
    - breath
    - harmony
    - links
    - matrix
    - merge
    - peace
    - research
    - scouting
    - sequence
    - society
    - tamper
    - team
    - uuid
    - war
  matrix:
    - agent
    - aura
    - breath
    - harmony
    - links
    - matrix
    - merge
    - peace
    - research
    - scouting
    - sequence
    - society
    - tamper
    - team
    - uuid
    - war
  backlinks:
    - agent
    - aura
    - breath
    - harmony
    - links
    - matrix
    - merge
    - peace
    - research
    - scouting
    - sequence
    - society
    - tamper
    - team
    - uuid
    - war
signatures:
  computationUuid: "3b2a52a2-31fd-8426-9112-72f717fc7431"
  stages:
    - stage: path
      stageUuid: "756ed54f-14fb-86e9-8438-c165e3c14dc8"
    - stage: trinity
      stageUuid: "db67a31a-1f32-8cce-a994-823b0bcb14af"
    - stage: boundary
      stageUuid: "0640a14d-244c-888d-9150-080dc984d997"
    - stage: links
      stageUuid: "cc538335-990e-8c1b-a623-ac5c9fcc1b18"
    - stage: horo
      stageUuid: "a4a00c7a-fc4d-8a24-8468-5484ee314c97"
    - stage: seal
      stageUuid: "8f407fb9-467c-85d7-b812-9dc90614bc96"
    - stage: uuid
      stageUuid: "3c381efa-be26-8a9b-93da-95260fb20a19"
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
