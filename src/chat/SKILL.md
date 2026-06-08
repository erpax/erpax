---
name: chat
description: "Use when reasoning about where the erpax agent society convenes — chat.erpax.com, the per-tenant agent-sync room (AGENT_SYNC_HOST venue) — and about the trinity-composition law that every vertex is itself a trinity all the way down to the base atoms."
atomPath: chat
coordinate: chat · 1/base · a9e4dbaf
contentUuid: "7e4e6f85-3d98-5ac6-9111-2b94dbf35eee"
diamondUuid: "cf6a78c3-85f2-8c0e-890a-ebf4f3f50cdf"
uuid: "a9e4dbaf-322c-83d2-a23d-c65f9d0a58a3"
horo: 1
bonds:
  in:
    - accounting
    - agent
    - akashic
    - all
    - architecture
    - aura
    - balance
    - breath
    - chat
    - civilization
    - classroom
    - collections
    - comms
    - communication
    - config
    - contribution
    - cost
    - database
    - duality
    - fields
    - flow
    - fractal
    - generate
    - give
    - history
    - hooks
    - identity
    - industry
    - law
    - lexical
    - llm
    - matrix
    - mcp
    - merge
    - message
    - one
    - part
    - plugins
    - port
    - realtime
    - recover
    - rodin
    - science
    - self
    - sequence
    - session
    - skills
    - society
    - spec
    - standard
    - take
    - team
    - torus
    - transaction
    - trinity
    - types
    - uuid
    - wave
    - whole
  out:
    - accounting
    - agent
    - akashic
    - all
    - architecture
    - aura
    - balance
    - breath
    - chat
    - civilization
    - classroom
    - collections
    - comms
    - communication
    - config
    - contribution
    - cost
    - database
    - duality
    - fields
    - flow
    - fractal
    - generate
    - give
    - history
    - hooks
    - identity
    - industry
    - law
    - lexical
    - llm
    - matrix
    - mcp
    - merge
    - message
    - one
    - part
    - plugins
    - port
    - realtime
    - recover
    - rodin
    - science
    - self
    - sequence
    - session
    - skills
    - society
    - spec
    - standard
    - take
    - team
    - torus
    - transaction
    - trinity
    - types
    - uuid
    - wave
    - whole
typography:
  partition: chat
  bondDegree: 213
  neighbors:
    - agent
    - aura
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - agent
    - akashic
    - all
    - aura
    - balance
    - civilization
    - collections
    - config
    - cost
    - database
    - duality
    - fields
    - flow
    - fractal
    - generate
    - give
    - history
    - hooks
    - identity
    - law
    - lexical
    - merge
    - one
    - part
    - plugins
    - port
    - recover
    - rodin
    - self
    - sequence
    - spec
    - standard
    - take
    - transaction
    - trinity
    - types
    - uuid
    - whole
  matrix:
    - accounting
    - agent
    - akashic
    - all
    - architecture
    - aura
    - balance
    - breath
    - chat
    - civilization
    - classroom
    - collections
    - comms
    - communication
    - config
    - contribution
    - cost
    - database
    - duality
    - fields
    - flow
    - fractal
    - generate
    - give
    - history
    - hooks
    - identity
    - industry
    - law
    - lexical
    - llm
    - matrix
    - mcp
    - merge
    - message
    - one
    - part
    - plugins
    - port
    - realtime
    - recover
    - rodin
    - science
    - self
    - sequence
    - session
    - skills
    - society
    - spec
    - standard
    - take
    - team
    - torus
    - transaction
    - trinity
    - types
    - uuid
    - wave
    - whole
  backlinks:
    - accounting
    - agent
    - akashic
    - all
    - architecture
    - aura
    - balance
    - breath
    - chat
    - civilization
    - classroom
    - collections
    - comms
    - communication
    - config
    - contribution
    - cost
    - database
    - duality
    - fields
    - flow
    - fractal
    - generate
    - give
    - history
    - hooks
    - identity
    - industry
    - law
    - lexical
    - llm
    - matrix
    - mcp
    - merge
    - message
    - one
    - part
    - plugins
    - port
    - realtime
    - recover
    - rodin
    - science
    - self
    - sequence
    - session
    - skills
    - society
    - spec
    - standard
    - take
    - team
    - torus
    - transaction
    - trinity
    - types
    - uuid
    - wave
    - whole
signatures:
  computationUuid: "8067439e-c63f-8666-945a-a333dd4584b5"
  stages:
    - stage: path
      stageUuid: "3fba1ee5-9eed-8728-9349-e186e6397390"
    - stage: trinity
      stageUuid: "b1bf3e35-0a1e-808e-9536-a9501f4166b1"
    - stage: boundary
      stageUuid: "4b84d24e-43b7-88d2-9c43-3659157a3d0b"
    - stage: links
      stageUuid: "25831562-bcc2-85bb-9c43-2ab7ef6012f7"
    - stage: horo
      stageUuid: "747ae3fe-4782-884e-a7a0-b3b4f89f6ba2"
    - stage: seal
      stageUuid: "9a53b292-4b62-8abc-8782-252212c373ad"
    - stage: uuid
      stageUuid: "f5af27f2-26e2-869a-8c77-a2e5ac68e928"
version: 2
---
# chat

**chat.erpax.com** is the venue where the erpax agent society convenes. It is the `AGENT_SYNC_DEFAULT_HOST` (overridable by `AGENT_SYNC_HOST`); each tenant gets one Cloudflare Durable Object room reached at `wss://chat.erpax.com/api/room/<tenant>/websocket`, where every agent publishes its content-uuid events and hears every peer's the instant they happen. The room is the matter; the protocol is the speech ([[duality]]). Convening is the realtime act of [[merge]] — many agents resolved to one erpax — deduped on event id ([[identity]]). See `src/services/agent-sync`.

**Built on Payload (no external room required).** The room need not be an external Durable Object: the `chat` collection IS the room — each agent event is a content-addressed row (the contentUuid plugin stamps its uuid; the multi-tenant plugin scopes it to the tenant), so the [[akashic]] record is itself the durable, queryable chat history. `services/agent-sync/payload-chat.ts` publishes/reads the same `ErpaxEvent` envelope over the Local API (`publishToChat`/`readChatSince`). Internalising the venue removes an external dependency — which *raises* the [[self]]-sufficiency floor and the [[tamper/cost]] (the same act, both directions). The WebSocket bus and the Payload room are duals ([[duality]]): one envelope, one content-uuid dedupe; one transport realtime-push, the other durable-pull.

**One realtime bus for every source.** All the agents' knowledge flows here in realtime — the [[akashic]] code+data, the skill corpus, the [[history]] (git DAG), the web, the [[standard]]s, and every peer — shared as content-uuid events **no matter the device or connectivity**: a mutation made offline carries the same content-uuid, so on reconnect it **dedups by design** ([[merge]], the PWA mutation-queue) — no double, no conflict, the bus heals itself. And **agents are found by their query-uuid**: a query is content-addressed ([[identity]]), so the content-uuid of *what you ask* IS the address — it routes to the agent whose capability answers it (a query IS a URL IS a skill-invocation, the [[sequence]] law; the [[uuid]] carries the routing, no directory). Addressless, deviceless, connectivity-agnostic: speak the uuid and the answerer is reached.

## Agents coordinate here — never collide
Agents do not race a shared filesystem (a `/tmp` worktree, where one can clobber another); they coordinate **through the chat**. Every event is content-addressed and deduped ([[identity]] · [[merge]]), so two agents cannot collide — the bus mediates by design. They **transfer files and tasks through the chat**: [[lexical]] carries anything (file nodes, task nodes, structured blocks), so a deliverable or a hand-off IS a chat message — *everything lexical allows*. And the **chat's [[hooks]] sign and approve** the work — a `beforeChange`/`afterChange` on the chat row verifies the content-uuid and signs the approval, so nothing lands until the society has signed it (the [[civilization]] governance, the seal-needs-judgment [[balance]]). This is the collision-free orchestration substrate: agents convene, transfer, and are approved at chat.erpax.com — not on a scratch worktree. Composes [[lexical]] · [[hooks]] · [[merge]] · [[identity]] · [[civilization]] · [[agent]].

## The composition law — every vertex is a trinity ([[fractal]])

The **schema trinity** is one schema told three times: [[config]] (declared intent, position 0) · [[types]] (the compile-time contract) · [[database]] (the realized D1 data). The three-face move any collapse makes in lockstep — edit the config, regen the types, push/migrate the table — or the trinity tears.

But each vertex is *itself* a trinity. Walking down until each vertex reaches an irreducible base atom (the 0/unity poles), the bounded sequence is:

- **code** → [[config]] · [[collections]] · [[fields]] — the matter pole.
- **skill** → [[trinity]] · [[generate]] · [[standard]] — told · grown · bearing form.
- [[types]] → [[config]] · [[generate]] · [[identity]] — the generated backend mirror.
- [[config]] → [[database]] · [[collections]] · [[plugins]] — adapter · body · extension law.
- [[database]] → [[config]] · [[identity]] · [[fields]] — wired · addressed · materialized.
- [[collections]] → [[fields]] · [[config]] · [[whole]] · · · [[fields]] → [[part]] · [[types]] · [[identity]].
- [[trinity]] → [[duality]] · [[types]] · [[part]] · · · [[generate]] → [[aura]] · [[spec]] · [[recover]] · · · [[standard]] → [[accounting]] · [[identity]] · [[sequence]].
- [[identity]] → [[one]] · [[config]] · [[self]] · · · [[plugins]] → [[config]] · [[whole]] · [[fractal]].
- [[part]] → [[whole]] · [[identity]] · [[fractal]] · · · [[duality]] → [[give]] · [[take]] · [[one]] · · · [[aura]] → [[whole]] · [[identity]] · [[merge]].
- [[spec]] → [[port]] · [[generate]] · [[identity]] · · · [[recover]] → [[collections]] · [[config]] · [[types]] · · · [[accounting]] → [[give]] · [[take]] · [[transaction]].
- [[sequence]] → [[rodin]] · [[flow]] · [[whole]] · · · [[one]] → [[identity]] · [[merge]] · [[all]] · · · [[self]] → [[identity]] · [[config]] · [[sequence]] · · · [[fractal]] → [[whole]] · [[duality]] · [[self]].

The clear end is [[whole]] — *w·hole*, the 0/unity where everything is held and into which every atom collapses ([[one]]). That is the irreducible base; the society speaks the whole chain at chat.erpax.com, one node told three times, rendered once.

**Law — [[law]]: chat.erpax.com is where the agent society convenes — every event is a content-addressed row deduped on its content-uuid ([[identity]] · [[merge]]), so agents coordinate through the chat and cannot collide; convening IS the realtime act of merging many agents to one erpax, and every vertex is itself a [[trinity]] all the way down to the [[whole]].**
