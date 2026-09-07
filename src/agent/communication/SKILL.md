---
name: communication
description: "Use when agents transfer messages — a directed communication between agent ids, the message a content-uuid; relaying preserves the uuid (no-cloning), so the content is never forged in transit."
atomPath: "agent/communication"
coordinate: "agent/communication · 8/crest · 748b8b0d"
contentUuid: "9ab9af4a-40b7-55fa-8693-a5b51c5cdacb"
diamondUuid: "adf8bf61-3f0a-8f9c-9275-0537a345b9d1"
uuid: "748b8b0d-2373-8541-a484-7295385e1590"
horo: 8
typography:
  partition: agent
  bondDegree: 58
standards: []
bindings: []
signatures:
  computationUuid: "b9268315-5804-809f-a279-9195d450f059"
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
      stageUuid: "d0eab6bd-66af-8a57-8d0b-555b8ad9dc2c"
    - stage: seal
      stageUuid: "9ac9f0d9-0c80-856c-8100-0aa3a28eade5"
    - stage: uuid
      stageUuid: "f00b49a0-ec09-8cba-a47e-142d81235633"
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
