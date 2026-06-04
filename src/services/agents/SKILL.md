---
name: agents
description: Use when wiring the society's actors — the pure DomainAgent contract, the registry that gives each collection exactly one owner, the runtime that dispatches chain steps and events and scheduled ticks, and the effect-processor where every side effect fires; the A-vortex coupling layer that decides without acting.
---

# agents — the society's actors decide in pure functions; only the substrate acts

FORM: **an agent returns effects, it never performs them.** A `DomainAgent` is a pure body — `onChainStep` / `onEvent` / `onSchedule` take a context and return an `AgentEffect[]`; it touches no I/O, so it is trivially testable, mockable, and parallel-safe. The act lives in ONE seam, the effect-processor, which routes each effect kind to its substrate layer. Decide and act are split — that split IS the organ. Proven by test (`runtime.test.ts`, `effect-processor.test.ts`).

- **the contract** — `DomainAgent` over `AgentContext` and the `AgentEffect` discriminated union (create / update / notify / escalate / audit / emit / capture / call); the processor's `default: never` makes every kind wired-or-it-won't-compile. `types.ts`.
- **the registry** — `createAgentRegistry` indexes agents by id, by owned collection, by subscribed event. A collection owned by two agents throws at construction: exactly one owner per slug, the build dying before drift lands ([[standard]] conservation Law 8). `createAgentRegistry`.
- **the runtime** — `createAgentRuntime` is the wire, no business logic: `dispatchChainStep` routes a step to its owning agent; `dispatchEvent` broadcasts to every subscriber; `dispatchTo` addresses one named agent (the `call` primitive — its [[duality]] is the broadcast). `processEffect` / `processEffects` close the loop.
- **the coil** — `conveneAgentSociety` jacks the one shared runtime into a tenant's [[agent-sync]] room, so every subscribed agent hears a peer the instant it emits; idempotent per (tenant, host), degrading to un-convened off a WebSocket runtime. `conveneAgentSociety`, `disbandAgentSociety`.
- **the population** — agents are born, live one bounded move, and die; `steadyStatePopulation` / `boundedPopulation` / `recursivePopulation` / `isHarmonic` COMPUTE the harmonic count (birth = death, capped by hardware) rather than burn agents to find it — a closed, conserved ring ([[horo]]).

An agent reaching a peer is how the society covers its own gaps: where `emit` broadcasts an [[event]], `ctx.call` invokes exactly the agent whose capability answers ([[team]], [[contribution]]). The same form holds at every scale — agents spawn agents, the contract identical ([[fractal]]). This is the actor layer of the [[society]]; the loop that drives it to whole lives there.

## Standards

- **ISO/IEC 25010:2023 §5.4 modularity / §5.5 testability** — agents are pure (no direct I/O), the substrate owns side effects; the seam is reusable and trivially testable.
- **ISO/IEC 12207** — software-life-cycle single-source-of-truth: one owning agent per collection, one effect seam, one shared registry/runtime.
- **ISO 19011:2018 §6.4** — audit-evidence: every `audit` effect appends a Merkle leaf, spec-traceable end to end.
