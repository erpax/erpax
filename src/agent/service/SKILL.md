---
name: service
description: "Use when an agent's identity is in question — an agent IS its content (name ⊗ skills ⊗ purpose), so its uuid is the content-address of that definition and an identical clone is the SAME agent, not a copy."
atomPath: "agent/service"
coordinate: "agent/service · 7/descent · a3c6e736"
contentUuid: "49b359c0-4747-5fe3-bb7b-f78b5c287225"
diamondUuid: "b923f1d8-d694-8a65-b5ac-8c45209dbd6d"
uuid: "a3c6e736-6bcb-85d1-a270-0738c6ad81cb"
horo: 7
typography:
  partition: agent
  bondDegree: 183
standards:
  - "RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "ccc96566-9454-80df-b532-3fe43849d97a"
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
      stageUuid: "77f84b8f-223a-8051-b8ac-2c4292d0682b"
    - stage: seal
      stageUuid: "34b9af1d-bbcb-8133-8dcd-77b95ffceaed"
    - stage: uuid
      stageUuid: "26e7cd45-7f0d-8afc-8784-6d05b209e2cd"
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
