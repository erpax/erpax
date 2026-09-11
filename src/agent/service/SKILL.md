---
name: service
description: "Use when an agent's identity is in question — an agent IS its content (name ⊗ skills ⊗ purpose), so its uuid is the content-address of that definition and an identical clone is the SAME agent, not a copy."
atomPath: "agent/service"
coordinate: "agent/service · 2/share · 35164b4e"
contentUuid: "c8836d47-51ef-5b9a-8e7b-2649e0271875"
diamondUuid: "b9d63940-1dd7-841f-964f-a8c01d511364"
uuid: "35164b4e-f5aa-8cac-a660-6bd21bc37eed"
horo: 2
typography:
  partition: agent
  bondDegree: 183
standards:
  - "RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "f30d33c2-aa5a-8fc0-82a8-571769272fdd"
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
      stageUuid: "b1d0b968-a837-802f-8b8f-9d6714375259"
    - stage: seal
      stageUuid: "34b9af1d-bbcb-8133-8dcd-77b95ffceaed"
    - stage: uuid
      stageUuid: "6250a79a-9011-8a69-bd12-0498202451ff"
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
