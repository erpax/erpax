---
name: drone
description: "Use when the society sends scouts to fly the content-uuid matrix in coordinated self-learning — reconnoitring sectors for gaps and entropy and feeding them to the agents to eat, warfare tactics applied to building."
atomPath: drone
coordinate: drone · 1/base · 644d4c4f
contentUuid: "d031e64e-0374-5b65-881e-cbbf9197c2f4"
diamondUuid: "343ed84e-5a30-8b38-bf0a-ca14b91daa95"
uuid: "644d4c4f-b703-8870-a6a6-427ca751ae84"
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
  - "ISO 19011:2018 §6.4 reconnaissance is read-only evidence-gathering"
  - "RFC 9562 §5.8 content-uuid (the nodes a drone flies)"
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
  computationUuid: "c8360971-d8ea-80aa-a98f-52dfa9200144"
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
      stageUuid: "f406302a-2a43-8129-8c6a-fb04dc64b725"
    - stage: seal
      stageUuid: "b94fddbd-d195-8eb8-a612-7267648c00df"
    - stage: uuid
      stageUuid: "a3f392f5-f48c-83ce-a88a-849c09a9260f"
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
