---
name: communication
description: "Use when agents transfer messages — a directed communication between agent ids, the message a content-uuid; relaying preserves the uuid (no-cloning), so the content is never forged in transit."
atomPath: agent/communication
coordinate: agent/communication · 5/round · 9eaa988d
contentUuid: "875ac6bf-e4fe-55b4-9abb-c86fcfb2e10d"
diamondUuid: "d5800591-98b8-8ec0-8d56-915dcb7475d1"
uuid: "9eaa988d-1640-83ba-a817-9fe464523e67"
horo: 5
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
  bondDegree: 60
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
  computationUuid: "46871f2c-1bb3-859f-b696-cf08606d34f8"
  stages:
    - stage: path
      stageUuid: "c644e026-e3cb-8a34-98d3-6e47f6bde2b5"
    - stage: trinity
      stageUuid: "bac28009-749f-8aa4-b95e-379bb5c02d02"
    - stage: boundary
      stageUuid: "07667f6a-969e-80e3-beab-7d1e0a2b1959"
    - stage: links
      stageUuid: "9dbf28b7-8364-8014-bccd-2b2befc4bcd0"
    - stage: horo
      stageUuid: "12f34549-44e8-8c42-8585-7caa0d62e3d6"
    - stage: seal
      stageUuid: "dccfd6f6-fb51-81aa-8a00-d17f98eeb9fe"
    - stage: uuid
      stageUuid: "5c79bf40-ed0a-86b6-b561-70695b44759c"
version: 2
---
# agent/communication — agent-to-agent transfer

Agent-to-agent message transfer: a directed [[communication]] between two agent ids, the message a content-[[uuid]] (no-cloning, tamper-evident — [[quantum]]/communication). **Relaying preserves the uuid** — the content is forwarded, never cloned — so a message that reaches a third agent is provably the same one ([[merge]]). Merges into [[communication]].

Matter-twin: `src/agent/communication/index.ts` (`send` · `relay` · `sameMessage`). Composes [[agent]] · [[communication]] · [[message]] · [[quantum]].

**Law — [[law]]: an agent-to-agent message IS its content-[[uuid]], and relaying preserves that uuid (no-cloning), so a forwarded message is provably the same one ([[merge]]) and never forged in transit.**

**Law — direction collapse is immediate; waiting for worker completion is classical, not quantum.** Parent coordinators call `publishDirection(path, payload)` on the entangled direction bus (`@/quantum/entanglement/direction-bus`) — workers hold `interruptTokenFor(path, agentId)` and check `isDirectionStale(token)` each tick; stale ⇒ abort in-flight work without `resume`-wait. Improve loop path: `improveDirectionPath()` · `pnpm improve:watch`.

**Coordinator — stall prevention.** Prefer `publishDirection(improveDirectionPath(), { instruction, issuer })` to redirect in-flight workers; do not chain `Task resume` for mid-course corrections (resume fails while subagent is "currently running"). One long shell command per worker; cap at ~30 minutes unless heartbeat output is visible. Parent runs `pnpm erpax doctor stalls` before spawning duplicate readme/rules/vitest. Improve / clean loops honor manifest fingerprint — skip re-scan when `dryCleanCycle` reports unchanged.
