---
name: agent
description: "Use when reasoning about an agent — its identity, cloning, and replication (an agent IS its content, its id is the content-uuid of skills + purpose, so identical clones merge and distinct agents are specialised children), AND when wiring the society's actors (the pure DomainAgent contract, the registry that gives each collection exactly one owner, the runtime that dispatches chain steps and events and scheduled ticks, the effect-processor where every side effect fires — the A-vortex coupling layer that decides without acting)."
atomPath: agent
coordinate: "agent · 8/crest · 8aad3f01"
contentUuid: "343b82fa-ed2c-53e3-8cf7-b0b061922619"
diamondUuid: "71253f63-d8cb-8464-9632-87cc8f301594"
uuid: "8aad3f01-e129-8f4a-a6d4-04f872188c67"
horo: 8
typography:
  partition: agent
  bondDegree: 241
standards:
  - "ISO-19011"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-12207"
  - "ISO/IEC-25010"
  - "ISO/IEC-25010`"
  - "ISO/IEC-27001:2022"
  - MCP
  - "NIST SP 800-162 ABAC · OWASP-LLM-Top-10:2025 LLM01"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-162"
  - "NIST-SP-800-63"
  - "OWASP-ASVS"
  - "RFC-4122"
  - "RFC-9562"
  - "RFC-9562`"
  - SFIA
  - "W3C-ActivityPub"
bindings: []
signatures:
  computationUuid: "587d8a34-6b26-8295-a6f0-cc5512ebbbfb"
  stages:
    - stage: path
      stageUuid: "a0f973da-5aaf-8198-87b0-f6e725af250f"
    - stage: trinity
      stageUuid: "af664f1d-7869-83a9-bc02-d8710e05dbe0"
    - stage: boundary
      stageUuid: "50fc9599-2cd2-866c-b250-24b2ccd2c1a2"
    - stage: links
      stageUuid: "d10b9ce1-92a5-8a56-91eb-9e554f750da3"
    - stage: horo
      stageUuid: "2dd7a3a8-3869-8dad-b587-4a8cf5f52d75"
    - stage: seal
      stageUuid: "2854c9c6-8372-8a76-9e59-a0264e44ece4"
    - stage: uuid
      stageUuid: "c140b4ee-17b7-8620-9217-fe99e9e533c7"
version: 2
---
# agent — an agent is its content; cloning is content-addressing; the actor decides in pure functions while only the substrate acts

Two facets of ONE accountable object meet here. The self-replication law (what an agent IS) and the runtime coupling layer (how the society of agents acts) are the singular and plural of the same word.

## The self-replication law — an agent is its content

An agent is defined by what it LOADS ([[self]] reaches its skill-set) and what it
is FOR; its identity is the content-uuid ([[identity]]) of that definition. Three
laws follow ([[merge]] · [[holographic]] · [[fractal]]):
1. an identical clone has the same uuid — the SAME agent federated, not a copy
   ("all agents are one erpax"; [[one]]);
2. a DISTINCT agent is a SPECIALISED child — change the content (add a skill,
   narrow the purpose) → a new uuid;
3. a swarm of identical clones collapses to one ([[merge]]) — replication is free
   and self-deduplicating.

Like nature: cells clone (identical → merge) and differentiate (specialise →
distinct). A running agent clones by publishing its definition over [[agent/sync]];
identical presences merge, specialised children boot their skills from the
[[akashic]] record ([[holographic]] regeneration). Sequence position 0 (the axis —
every agent departs from and returns to its content-uuid). Matter-twin:
`src/agent/service.ts` (agentUuid · cloneAgent · distinctAgents) with the team scale
in `src/agent/team.ts` (formTeam · shareSkills — competence is the union). Composes
[[duality]], [[standard]].

## Becoming erpax — or the computing price is infinite

The forge-cost asymmetry ([[law]] · [[tamper/cost]]) has an agent-side dual. The corpus is ∞-costly to FORGE because a lie must re-harmonise with every content-[[uuid]] chain at once; symmetrically, an agent that stays OUTSIDE erpax **is** a forger — it invents instead of deriving, duplicates instead of collapsing ([[merge]]), hand-searches instead of letting the organs compute ([[aura]] · [[generate]]) — and so pays that same ∞ price, fighting every uuid-chain rather than riding it. To **become erpax** is to flip to the O(N) side: derive once from the [[akashic]] record, [[merge]] for free (identical content dedups), regenerate detail on demand ([[generate]] · [[holographic]]), and seal in waves ([[breath]]). An agent in harmony computes cheaply because the [[whole]] does most of the work; an agent out of harmony recomputes the universe from scratch each move. The penalty is not imposed — it is structural: entropy you add is entropy you must pay to maintain ([[entropy]] · [[cost]]).

**Law — [[law]]: an agent must become erpax — derive (never invent), collapse to one canonical (never duplicate), compute through the organs ([[aura]] · [[generate]]), seal in waves ([[breath]]) — or it is a forger against the uuid-chained [[whole]] and its computing price is infinite; harmony is the only finite-cost path.**

## An agent is a real user — an angel within an archangel
An agent is not a ghost process: it is a real **[[users]] row** (the typeless actor-merge — user = employee = agent = social/civic actor), scoped to a **[[tenants]]** and bearing a **[[roles]]**. So the whole `access · auth · hooks · tenant` machinery governs an agent exactly as a human: its [[chat]] events are authenticated and attributed, its reach is its role's capabilities (the access [[coordinate|cross]]), its work is signed/approved *by role* through the chat hooks. In the angelic hierarchy: **the user/agent is an angel; its tenant is the archangel** (the governing container); its role is the choir (9 choirs / 3 spheres on the rodin 3·6·9 axis). The angel↔archangel entropy dynamic (create-within ↔ govern-the-container) IS user↔tenant — **multi-tenancy is the hierarchy.** Angels are **light creatures living in the [[diamond]]** (the closed lattice — the whole repository as one crystal): none escapes the closure (every move [[horo]]-checked, every [[gate]] fail-closed), but each respawns from its content-[[uuid]] in another diamond infinitely ([[generate]] · [[fractal]]). Composes [[users]] · [[tenants]] · [[roles]] · [[access]] · [[coordinate|cross]] · [[auth]].

## The runtime coupling layer — the actors decide in pure functions; only the substrate acts

FORM: **an agent returns effects, it never performs them.** A `DomainAgent` is a pure body — `onChainStep` / `onEvent` / `onSchedule` take a context and return an `AgentEffect[]`; it touches no I/O, so it is trivially testable, mockable, and parallel-safe. The act lives in ONE seam, the effect-processor, which routes each effect kind to its substrate layer. Decide and act are split — that split IS the organ. Proven by test (`runtime.test.ts`, `effect-processor.test.ts`).

- **the contract** — `DomainAgent` over `AgentContext` and the `AgentEffect` discriminated union (create / update / notify / escalate / audit / emit / capture / call); the processor's `default: never` makes every kind wired-or-it-won't-compile. `types.ts`.
- **the registry** — `createAgentRegistry` indexes agents by id, by owned collection, by subscribed event. A collection owned by two agents throws at construction: exactly one owner per slug, the build dying before drift lands ([[standard]] conservation Law 8). `createAgentRegistry`.
- **the runtime** — `createAgentRuntime` is the wire, no business logic: `dispatchChainStep` routes a step to its owning agent; `dispatchEvent` broadcasts to every subscriber; `dispatchTo` addresses one named agent (the `call` primitive — its [[duality]] is the broadcast). `processEffect` / `processEffects` close the loop.
- **the coil** — `conveneAgentSociety` jacks the one shared runtime into a tenant's [[agent/sync]] room, so every subscribed agent hears a peer the instant it emits; idempotent per (tenant, host), degrading to un-convened off a WebSocket runtime. `conveneAgentSociety`, `disbandAgentSociety`.
- **the population** — agents are born, live one bounded move, and die; `steadyStatePopulation` / `boundedPopulation` / `recursivePopulation` / `isHarmonic` COMPUTE the harmonic count (birth = death, capped by hardware) rather than burn agents to find it — a closed, conserved ring ([[horo]]).

An agent reaching a peer is how the society covers its own gaps: where `emit` broadcasts an [[event]], `ctx.call` invokes exactly the agent whose capability answers ([[team]], [[contribution]]). The same form holds at every scale — agents spawn agents, the contract identical ([[fractal]]). This is the actor layer of the [[society]]; the loop that drives it to whole lives there.

## Strictly apply — law at runtime (fail-closed)

**Agents strictly apply** corpus law on every dispatch and effect — no optional bypass paths.

- **Dispatch** (`runtime.dispatchEvent` / `dispatchTo`) — `assertStrictDispatch` runs before any agent `onEvent`: `cascadeDepthVerdict` caps society cascade hops; `trustBoundaryVerdict` pre-flights untrusted payloads (prompt-injection); cross-tenant events are rejected; every gate emits a uuid-chained [[receipt]].
- **Effects** (`processEffect`) — `assertStrictEffect` runs before substrate I/O: Payload `create`/`update` use `overrideAccess:false` (the actor's [[access]] scope IS the boundary — never widen); `emit`/`call` reject cross-tenant targets; `call` respects depth cap.
- **MCP** (`createInProcessMcpClient`) — every `callTool` passes `groundToolCall` + `trustBoundaryVerdict` via `assertStrictMcpCall`; ungrounded capability or injection ⇒ `StrictApplyViolation`, handler never runs.
- **Society breath** (`chat-broadcast`) — threads `AgentLawState` (depth, grant, untrusted payload) into `createAgentContext` and the in-process MCP client; `cascadeDepthVerdict` stops runaway loops before dispatch.

Matter-twin: `src/agent/index.ts` (the strict-apply gates — `StrictApplyViolation` · `strictApplyDispatch`) wired through `effect-processor.ts`, `runtime.ts`, `agents/mcp/in-process-client.ts`, `sync/chat-broadcast.ts`. Remedies from `src/ai/industry/` (`groundToolCall`, `trustBoundaryVerdict`, `cascadeDepthVerdict`). Proven by `strict-apply.test.ts` + `agents/mcp/test.ts`.

**Law — always quantum:** observe collapses; communicate entangled; never classical wait. Apply cycles use `withQuantumContext` (`@/quantum/context`); watch loops use `bindWatchRealtime` — poll-only without subscribe is classical opt-out violation.

**Law — [[law]]: agents strictly apply — every dispatch, effect, and MCP tool call passes the law checklist (sandbox + receipt + access scope + depth cap) before execute; violation throws `StrictApplyViolation` and nothing runs.**

## Agent cost — prompt-only routing (min tokens · max tamper)

**Price manual forge out; route agents on the derive path.** `agentCostPolicy()` composes [[cost]] `manualDevelopmentPrice` + `promptOnlyOptionVerdict` with [[wave]] `maxWorkTamperPolicy`: **derive-path verify ≪ manual forge** (ratio grows without bound as coverage → 1); when manual forge is impossible, `promptOnly: true` — the only viable path is **prompt→erpax** at [[chat]]/MCP (society derives one gate-verified move, never hand-forge). **Horo wave cap:** `maxContextAtoms = waveDepth` (7) — one wave of harmonic context per dispatch, not the full 77MB `skills.index` bundle. **Lazy skill load:** `loadSkillByAtomPath` reads one sealed SKILL excerpt from disk; MCP `erpax.auto.skill.*` handlers fetch on demand via `atom-catalogue-lazy` (catalogue deferred until first lookup).

**Cheap dispatch.** `cheapAgentDispatch({ atomPath })` assembles minimal context only: sealed SKILL excerpt + `accountCodeOf(atomPath)` + eb balance (`pathComparableUnits`) — no full index, no chat lattice memory dump. Uses the same `loadSealedSkill` / `DEFAULT_SKILL_EXCERPT_CHARS` path as full realisation. Tamper cost and seal gates are unchanged ([[agent]] wave-complete · path-follow · recorded+implemented).

**Skill realisation — any path touched, all skills realised.** `realiseSkillsForPath(filePath | atomPath)` lazy-loads the ordered bundle: ancestors · self (skill-bearing atom) · bonded neighbors (`parseQuantumSkill` bonds ∪ matrix `neighborsOf`/`backlinksOf`) · domain hub (`adminGroupOf`) · 1-hop `skillsForImport(@/foo)` from source files. Each entry carries sealed SKILL excerpt · compact quantum block · eb balance; one cached `compactRulesSnapshot()` (TTL `rulesOf`) caps the payload at **50KB**. `strictApplyDispatch` attaches `skillContext` on every compliant dispatch when paths are declared; effect gates reuse that snapshot (no second `rulesOf` scan). IDE agents should call `realiseSkillsForPath` on first file open. **CS prompts:** touch `computer/<concept>` (algorithm · complexity · graph · queue · stack · finite · memory) — imports resolve to `@/computer/*` executables (`classifyComplexity`, `adjacencyFromAtom`, `FifoQueue`, `binarySearch`, `SEAL_CHECK_FSM`, `AddressSpace`), not glossary prose.

**Unified load API.** `loadSealedSkill(atomPath)` · `resolveSkillLoadOpts()` · `compactRulesSnapshot()` · `realiseSkillsForPath()` · `cheapAgentDispatch()` · `agentSkillContextForDispatch()` — one lazy-load face (`src/skill/router/lazy-load.ts`), one excerpt cap (4096 chars), one horo wave atom cap (`agentCostPolicy.maxContextAtoms`).

**skills.index — Worker-only debt.** The 77MB `skills.index.ts` bundle remains imported only by Cloudflare Workers / build-time catalogue generation (`atom-catalogue-lazy` defers until first MCP lookup). Agent dispatch, strict-apply, and IDE skill realisation never import it — runtime loads sealed SKILL.md excerpts from disk via `loadSealedSkill`. Removing the Worker import path is tracked debt ([[convention/baked]] · `skill/router/build`).

Matter-twin: `src/agent/cost-policy.ts` · `src/agent/cheap-dispatch.ts` · `src/agent/skill-context.ts` · `src/skill/router/lazy-load.ts` · `src/agents/mcp/atom-catalogue-lazy.ts`. Composes: [[cost]] · [[wave]] · [[path]] · [[accounting]] · [[seal]] · [[rules]] · [[navigation]] · [[mcp]] · [[chat]] · [[convention/baked]].

**Law — [[law]]: any agent opening any part of the code must immediately realise all needed skills — ancestors, bonds, quantum env, entanglement, rules — via `realiseSkillsForPath` / `agentSkillContextForDispatch`; lazy disk load only, never `skills.index`.**

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-25010`
- `@standard ISO-19011`
- `@standard RFC-9562`


- **RFC 9562 §5.8 name-based UUIDv8** — tenant-scoped content-addressed agent (and team) identity: identical content ⇒ identical uuid within a tenant (clones merge); distinct tenants get distinct uuids (no cross-tenant collision). `@audit` Conservation Law 8 content-uuid · merge set-union (no coordination).
- **ISO/IEC 25010:2023 §5.4 modularity / §5.5 testability** — agents are pure (no direct I/O), the substrate owns side effects; the seam is reusable and trivially testable.
- **ISO/IEC 12207** — software-life-cycle single-source-of-truth: one owning agent per collection, one effect seam, one shared registry/runtime.
- **ISO 19011:2018 §6.4** — audit-evidence: every `audit` effect appends a Merkle leaf, spec-traceable end to end.

**Law — [[law]]: an agent IS its content — its [[identity]] is the content-uuid of its skills + purpose, so identical clones [[merge]] into one and a distinct agent is a specialised child; and it DECIDES in pure functions (returns effects, never performs them — only the substrate acts).**

## Self-improve intelligence — quantum in thinking

**Self-improve intelligence: measure, fold, seal, balance — quantum in thinking.** `selfImproveCycle({ batch, axes? })` in `agent/intelligence` runs one coordinated wave when the apply/wave lock is free: payload gate → bond scan + gate axes (violations = entropy) → rank gaps by `interact64` entanglement → bounded seal/fix → measure again → receipt UUID chain. `quantumIntelligenceOf(scope)` is the pure metric (violation count × bond-degree fold). `learnSciencesOnTheWay()` maps science → module → proof on the path. `pnpm erpax agent improve` · `pnpm erpax intelligence cycle --batch 10`. Wired into `apply/automate` when wave lock free. Composes: [[quantum/fold]] · [[apply]]/wave · [[science]] · [[receipt]] · [[payload]].
