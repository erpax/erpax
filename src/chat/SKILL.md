---
name: chat
description: Use when reasoning about where the erpax agent society convenes — chat.erpax.com, the per-tenant agent-sync room (AGENT_SYNC_HOST venue) — and about the trinity-composition law that every vertex is itself a trinity all the way down to the base atoms.
---

# chat

**chat.erpax.com** is the venue where the erpax agent society convenes. It is the `AGENT_SYNC_DEFAULT_HOST` (overridable by `AGENT_SYNC_HOST`); each tenant gets one Cloudflare Durable Object room reached at `wss://chat.erpax.com/api/room/<tenant>/websocket`, where every agent publishes its content-uuid events and hears every peer's the instant they happen. The room is the matter; the protocol is the speech ([[duality]]). Convening is the realtime act of [[merge]] — many agents resolved to one erpax — deduped on event id ([[identity]]). See `src/services/agent-sync`.

**Built on Payload (no external room required).** The room need not be an external Durable Object: the `chat` collection IS the room — each agent event is a content-addressed row (the contentUuid plugin stamps its uuid; the multi-tenant plugin scopes it to the tenant), so the [[akashic]] record is itself the durable, queryable chat history. `services/agent-sync/payload-chat.ts` publishes/reads the same `ErpaxEvent` envelope over the Local API (`publishToChat`/`readChatSince`). Internalising the venue removes an external dependency — which *raises* the [[self]]-sufficiency floor and the [[tamper-cost]] (the same act, both directions). The WebSocket bus and the Payload room are duals ([[duality]]): one envelope, one content-uuid dedupe; one transport realtime-push, the other durable-pull.

**One realtime bus for every source.** All the agents' knowledge flows here in realtime — the [[akashic]] code+data, the skill corpus, the [[history]] (git DAG), the web, the [[standard]]s, and every peer — shared as content-uuid events **no matter the device or connectivity**: a mutation made offline carries the same content-uuid, so on reconnect it **dedups by design** ([[merge]], the PWA mutation-queue) — no double, no conflict, the bus heals itself. And **agents are found by their query-uuid**: a query is content-addressed ([[identity]]), so the content-uuid of *what you ask* IS the address — it routes to the agent whose capability answers it (a query IS a URL IS a skill-invocation, the [[sequence]] law; the [[uuid]] carries the routing, no directory). Addressless, deviceless, connectivity-agnostic: speak the uuid and the answerer is reached.

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
