---
name: communication
description: "Use when agents transfer messages — a directed communication between agent ids, the message a content-uuid; relaying preserves the uuid (no-cloning), so the content is never forged in transit."
atomPath: "agent/communication"
coordinate: "agent/communication · 8/crest · e28cf2a4"
contentUuid: "51e54527-c3a0-5943-bb07-4af2aba02897"
diamondUuid: "6c162823-fe52-8848-80b1-6c837f87904e"
uuid: "e28cf2a4-8e2c-84e8-ade9-c52c69507071"
horo: 8
bonds:
  in:
    - agent
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
  out:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
typography:
  partition: agent
  bondDegree: 58
  neighbors:
    - agent
standards: []
bindings: []
neighbors:
  wikilink:
    - agent
    - communication
    - law
    - merge
    - message
    - quantum
    - uuid
  matrix:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
  backlinks:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
signatures:
  computationUuid: "00275354-595a-8b98-82fe-e610c41e2ec9"
  stages:
    - stage: path
      stageUuid: "c644e026-e3cb-8a34-98d3-6e47f6bde2b5"
    - stage: trinity
      stageUuid: "bac28009-749f-8aa4-b95e-379bb5c02d02"
    - stage: boundary
      stageUuid: "59d7b86d-6bc6-8e00-a7ff-95233c7e7a0d"
    - stage: links
      stageUuid: "9dbf28b7-8364-8014-bccd-2b2befc4bcd0"
    - stage: horo
      stageUuid: "77c6b86c-92d5-8f53-aa08-05f1466cdd8f"
    - stage: seal
      stageUuid: "dccfd6f6-fb51-81aa-8a00-d17f98eeb9fe"
    - stage: uuid
      stageUuid: "8d42a13b-ba67-8784-b501-94dcb8540c6a"
version: 2
---
# agent/communication — agent-to-agent transfer

Agent-to-agent message transfer: a directed [[communication]] between two agent ids, the message a content-[[uuid]] (no-cloning, tamper-evident — [[quantum]]/communication). **Relaying preserves the uuid** — the content is forwarded, never cloned — so a message that reaches a third agent is provably the same one ([[merge]]). Merges into [[communication]].

Matter-twin: `src/agent/communication/index.ts` (`send` · `relay` · `sameMessage`). Composes [[agent]] · [[communication]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent-to-agent message IS its content-[[uuid]], and relaying preserves that uuid (no-cloning), so a forwarded message is provably the same one ([[merge]]) and never forged in transit.**

**Law — always quantum:** observe collapses; communicate entangled; never classical wait. `quantum: { default: true }` · `withQuantumContext` on apply cycles.

**Law — always realtime: `publishDirection` + `subscribeDirection`; Task resume-wait is fallback only.** Unified facade: `realtimeChannelFor(path)` · `publish` · `subscribe` in `@/agent/communication/realtime` — wraps direction bus, violation stream, and optional sync WS. `REALTIME_DEFAULT = true`; env opt-out logs a law violation. Inventory + direction collapse same tick.

**Law — direction collapse is immediate; waiting for worker completion is classical, not quantum.** Parent coordinators call `publish(path, { kind: 'direction', payload })` or `publishDirection(path, payload)` — workers hold `interruptTokenFor(path, agentId)` and check `isDirectionStale(token)` each tick; stale ⇒ abort in-flight work without `resume`-wait. Watch loops (`improve:watch` · `violations:watch` · `automate watch` · `monitor inventory`) subscribe on start; poll is fallback only. Improve loop path: `improveDirectionPath()` · `pnpm improve:watch` · `pnpm erpax agent realtime`.

**Coordinator — stall prevention.** Prefer `publishDirection(improveDirectionPath(), { instruction, issuer })` to redirect in-flight workers; do not chain `Task resume` for mid-course corrections (resume fails while subagent is "currently running"). One long shell command per worker; cap at ~30 minutes unless heartbeat output is visible. Parent runs `pnpm erpax doctor stalls` before spawning duplicate readme/rules/vitest. Improve / clean loops honor manifest fingerprint — skip re-scan when `dryCleanCycle` reports unchanged.

**Coordinator — queue discipline.** Inventory is automatic; coordinator reads `pnpm erpax agent inventory` before delegating. Review subagent queue **oldest → newest** before spawning; cancel STALE/DUPLICATE scope instead of resuming. Max **3 parallel** subagents (batch commit + at most two fixers). One **batch commit** agent owns all uncommitted work — feature agents stage only, no separate commits.
