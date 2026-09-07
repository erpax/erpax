---
name: service
description: "Use when an agent's identity is in question — an agent IS its content (name ⊗ skills ⊗ purpose), so its uuid is the content-address of that definition and an identical clone is the SAME agent, not a copy."
atomPath: "agent/service"
coordinate: "agent/service · 8/crest · 97ecf546"
contentUuid: "015b5a4f-c259-59d3-a6d2-b0bdd388c150"
diamondUuid: "be653ebc-6a6b-8910-8f75-d87952285f2c"
uuid: "97ecf546-a131-831b-9e07-cf55937c19ac"
horo: 8
typography:
  partition: agent
  bondDegree: 183
standards:
  - "RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "e6fbc91b-b25f-805e-8277-0ec6f23b7032"
  stages:
    - stage: path
      stageUuid: "867776f3-a362-8e19-a682-7219e264cc43"
    - stage: trinity
      stageUuid: "6a4c2e20-80fb-8f75-9c2c-f2e624ecafb4"
    - stage: boundary
      stageUuid: "bfb78bf9-08da-8a6d-90e5-ccc4d01d4ffc"
    - stage: links
      stageUuid: "ac6e451b-90ae-87de-b81c-6455f6546173"
    - stage: horo
      stageUuid: "70f2ef29-3d7b-83b4-b2ca-93ddf8039c1f"
    - stage: seal
      stageUuid: "34b9af1d-bbcb-8133-8dcd-77b95ffceaed"
    - stage: uuid
      stageUuid: "79ca65b7-c1d5-81fc-8b5e-017a77d5628b"
version: 2
---
# agent/service — an agent is its content; cloning is content-addressing

Three consequences, each a law rather than a policy:

1. **An identical clone has the identical uuid.** It is not a copy — it is the same agent appearing in two places. Federation falls out of the address.
2. **To create a DISTINCT agent you must specialise it.** Add a skill, narrow the purpose — the content changes, so the uuid changes, and what you have is a child agent.
3. **A swarm of identical clones collapses to one uuid.** Replication is free and self-deduplicating; `distinctAgents` returns what is actually there.

So *"send the agents to clone themselves"* is governed rather than chaotic: a running agent clones by publishing its definition, an identical clone merges away, and a specialised one is a new content-addressed child that boots its skills from the record.

**Honest boundary.** The uuid proves two agents are DEFINED identically — never that they will behave identically. What an agent does depends on the matter it loads at run time, which no address can bind.

Composes: [[agent]] · [[integrity]] · [[merge]] · [[agent]]/team.
