---
name: service
description: "Use when an agent's identity is in question — an agent IS its content (name ⊗ skills ⊗ purpose), so its uuid is the content-address of that definition and an identical clone is the SAME agent, not a copy."
atomPath: agent/service
---
# agent/service — an agent is its content; cloning is content-addressing

Three consequences, each a law rather than a policy:

1. **An identical clone has the identical uuid.** It is not a copy — it is the same agent appearing in two places. Federation falls out of the address.
2. **To create a DISTINCT agent you must specialise it.** Add a skill, narrow the purpose — the content changes, so the uuid changes, and what you have is a child agent.
3. **A swarm of identical clones collapses to one uuid.** Replication is free and self-deduplicating; `distinctAgents` returns what is actually there.

So *"send the agents to clone themselves"* is governed rather than chaotic: a running agent clones by publishing its definition, an identical clone merges away, and a specialised one is a new content-addressed child that boots its skills from the record.

**Honest boundary.** The uuid proves two agents are DEFINED identically — never that they will behave identically. What an agent does depends on the matter it loads at run time, which no address can bind.

Composes: [[agent]] · [[integrity]] · [[merge]] · [[agent]]/team.
