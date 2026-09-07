---
name: service
description: "Use when an agent's identity is in question — an agent IS its content (name ⊗ skills ⊗ purpose), so its uuid is the content-address of that definition and an identical clone is the SAME agent, not a copy."
atomPath: "agent/service"
coordinate: "agent/service · 1/base · 86e19a6b"
contentUuid: "827390d4-0f61-5b51-9893-c807d41e0b27"
diamondUuid: "2afac01f-e71b-8b21-af28-fbf93add2fe5"
uuid: "86e19a6b-4a67-846c-ad46-de247691d691"
horo: 1
typography:
  partition: agent
  bondDegree: 183
standards:
  - "RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "02eddfba-f5bd-8388-8f6c-400d96b216ae"
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
      stageUuid: "d3cdbe16-29bd-8bf4-89b2-171d3d847656"
    - stage: seal
      stageUuid: "34b9af1d-bbcb-8133-8dcd-77b95ffceaed"
    - stage: uuid
      stageUuid: "5f21d76b-9a86-87b2-9570-5d1ec72816db"
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
